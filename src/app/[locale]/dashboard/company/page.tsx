'use client';

import { useState, useEffect } from 'react';
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { DashboardHeader } from "@/components/dashboard-header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCollection, useFirestore, useUser } from "@/firebase";
import type { Employee } from "@/lib/types";
import { addDoc, collection, doc, updateDoc, deleteDoc, getDocs, query, where } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { EmployeeForm, type EmployeeFormValues } from "./employee-form";

export default function CompanyPage() {
  const user = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    const findCompany = async () => {
      if (user && firestore) {
        const companiesCollection = collection(firestore, 'companies');
        const q = query(companiesCollection, where('ownerUid', '==', user.uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          // Assuming one user belongs to one company for now
          setCompanyId(querySnapshot.docs[0].id);
        } else {
          // Handle case where no company is found for the user
          console.log("No company found for this user.");
        }
      }
    };
    findCompany();
  }, [user, firestore]);

  const employeesPath = companyId ? `companies/${companyId}/employees` : undefined;
  const { data: employees, loading, error } = useCollection<Employee>(employeesPath);

  const locations = [
    { name: "Main Street Cafe", address: "123 Main St, Anytown, USA" },
    { name: "Downtown Brew", address: "456 Oak Ave, Anytown, USA" },
  ];

  const handleAddEmployee = async (values: EmployeeFormValues) => {
    if (!firestore || !companyId) return;

    try {
      const employeesCollection = collection(firestore, `companies/${companyId}/employees`);
      await addDoc(employeesCollection, {
        ...values,
        avatarUrl: `https://picsum.photos/seed/${Math.random()}/100/100`
      });
      toast({
        title: "Employee Added",
        description: `${values.name} has been added to your company.`,
      });
      setIsAddDialogOpen(false);
    } catch (e) {
      console.error("Error adding document: ", e);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not add employee. Please try again.",
      });
    }
  };

  const handleEditEmployee = async (values: EmployeeFormValues) => {
    if (!firestore || !companyId || !selectedEmployee) return;

    try {
        const employeeDoc = doc(firestore, `companies/${companyId}/employees`, selectedEmployee.id);
        await updateDoc(employeeDoc, values);
        toast({
            title: "Employee Updated",
            description: `${values.name}'s information has been updated.`,
        });
        setIsEditDialogOpen(false);
        setSelectedEmployee(null);
    } catch (e) {
        console.error("Error updating document: ", e);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Could not update employee. Please try again.",
        });
    }
  };

  const handleDeleteEmployee = async () => {
    if (!firestore || !companyId || !selectedEmployee) return;

    try {
        const employeeDoc = doc(firestore, `companies/${companyId}/employees`, selectedEmployee.id);
        await deleteDoc(employeeDoc);
        toast({
            title: "Employee Deleted",
            description: `${selectedEmployee.name} has been removed from your company.`,
        });
        setIsDeleteDialogOpen(false);
        setSelectedEmployee(null);
    } catch (e) {
        console.error("Error deleting document: ", e);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Could not delete employee. Please try again.",
        });
    }
  };

  const openEditDialog = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsEditDialogOpen(true);
  }

  const openDeleteDialog = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDeleteDialogOpen(true);
  }

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
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="h-8 gap-1" disabled={!companyId}>
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
              {!loading && !error && !employees && <p>No company found. Please ensure you have created a company.</p>}
              {!loading && !error && employees && (
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
                              <DropdownMenuItem onClick={() => openEditDialog(employee)}>Edit</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive" onClick={() => openDeleteDialog(employee)}>Delete</DropdownMenuItem>
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
      
      {/* Edit Employee Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
              <DialogHeader>
                  <DialogTitle>Edit Employee</DialogTitle>
                  <DialogDescription>
                      Update the details for {selectedEmployee?.name}.
                  </DialogDescription>
              </DialogHeader>
              <EmployeeForm onSubmit={handleEditEmployee} defaultValues={selectedEmployee || undefined} />
          </DialogContent>
      </Dialog>

      {/* Delete Employee Alert Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
              <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the employee record for {selectedEmployee?.name}.
                  </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteEmployee} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
              </AlertDialogFooter>
          </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
