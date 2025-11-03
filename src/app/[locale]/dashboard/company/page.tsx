'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PlusCircle, MapPin } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DashboardHeader } from "@/components/dashboard-header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCollection, useFirestore, useUser } from "@/firebase";
import type { Employee } from "@/lib/types";
import { addDoc, collection } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { EmployeeForm, type EmployeeFormValues } from "./employee-form";

export default function CompanyPage() {
  const user = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // TODO: Replace with dynamic company ID
  const companyId = "cpn_RND";
  const employeesPath = user ? `companies/${companyId}/employees` : undefined;
  const { data: employees, loading, error } = useCollection<Employee>(employeesPath);

  const locations = [
    { name: "Main Street Cafe", address: "123 Main St, Anytown, USA" },
    { name: "Downtown Brew", address: "456 Oak Ave, Anytown, USA" },
  ];

  const handleAddEmployee = async (values: EmployeeFormValues) => {
    if (!firestore || !user) return;

    try {
      const employeesCollection = collection(firestore, `companies/${companyId}/employees`);
      await addDoc(employeesCollection, {
        ...values,
        // Add a placeholder avatar for now
        avatarUrl: `https://picsum.photos/seed/${Math.random()}/100/100`
      });
      toast({
        title: "Employee Added",
        description: `${values.name} has been added to your company.`,
      });
      setIsDialogOpen(false);
    } catch (e) {
      console.error("Error adding document: ", e);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not add employee. Please try again.",
      });
    }
  };


  return (
    <>
      <DashboardHeader
        title="Company Management"
        description="Manage your employees, locations, and settings."
      />
      <Tabs defaultValue="employees">
        <div className="flex items-center">
            <TabsList>
                <TabsTrigger value="employees">Employees</TabsTrigger>
                <TabsTrigger value="locations">Locations</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Add Employee
                    </span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Employee</DialogTitle>
                    <DialogDescription>
                      Fill in the details below to add a new team member.
                    </DialogDescription>
                  </DialogHeader>
                  <EmployeeForm onSubmit={handleAddEmployee} />
                </DialogContent>
              </Dialog>
            </div>
        </div>
        <TabsContent value="employees">
          <Card>
            <CardHeader>
              <CardTitle>Employees</CardTitle>
              <CardDescription>
                A list of all employees in your company.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading && <p>Loading employees...</p>}
              {error && <p className="text-destructive">Error loading employees: {error.message}</p>}
              {!loading && !error && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">Avatar</span>
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Email
                      </TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employees?.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="hidden sm:table-cell">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={employee.avatarUrl} alt={employee.name} />
                            <AvatarFallback>{employee.name ? employee.name.charAt(0) : '?'}</AvatarFallback>
                          </Avatar>
                        </TableCell>
                        <TableCell className="font-medium">{employee.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{employee.role}</Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {employee.email}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
         <TabsContent value="locations">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                 {locations.map((location) => (
                    <Card key={location.name}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-base font-medium">{location.name}</CardTitle>
                             <MapPin className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm text-muted-foreground">{location.address}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </TabsContent>
        <TabsContent value="settings">
            <Card>
                <CardHeader>
                    <CardTitle>Company Settings</CardTitle>
                    <CardDescription>Update your company's information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="company-name">Company Name</Label>
                        <Input id="company-name" defaultValue="The Corner Cafe" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Input id="timezone" defaultValue="Pacific Standard Time (PST)" />
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
