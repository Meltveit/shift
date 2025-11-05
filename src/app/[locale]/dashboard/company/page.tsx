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
import type { Employee, Location } from "@/lib/types";
import { addDoc, collection, doc, updateDoc, deleteDoc, getDocs, query, where } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { EmployeeForm, type EmployeeFormValues } from "./employee-form";
import { LocationForm, type LocationFormValues } from "./location-form";

type DialogState = {
  isOpen: boolean;
  type: 'addEmployee' | 'editEmployee' | 'deleteEmployee' | 'addLocation' | 'editLocation' | 'deleteLocation' | null;
  data?: any;
};


export default function CompanyPage() {
  const user = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [dialogState, setDialogState] = useState<DialogState>({ isOpen: false, type: null });

  useEffect(() => {
    const findCompany = async () => {
      if (user && firestore) {
        const companiesCollection = collection(firestore, 'companies');
        const q = query(companiesCollection, where('ownerUid', '==', user.uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setCompanyId(querySnapshot.docs[0].id);
        } else {
          console.log("No company found for this user.");
        }
      }
    };
    findCompany();
  }, [user, firestore]);

  const employeesPath = companyId ? `companies/${companyId}/employees` : undefined;
  const { data: employees, loading: loadingEmployees, error: errorEmployees } = useCollection<Employee>(employeesPath);

  const locationsPath = companyId ? `companies/${companyId}/locations` : undefined;
  const { data: locations, loading: loadingLocations, error: errorLocations } = useCollection<Location>(locationsPath);
  
  const handleDialogChange = (isOpen: boolean) => {
    if (!isOpen) {
      setDialogState({ isOpen: false, type: null, data: null });
    }
  };

  // --- Employee Handlers ---
  const handleAddEmployee = async (values: EmployeeFormValues) => {
    if (!firestore || !companyId) return;
    try {
      const employeesCollection = collection(firestore, `companies/${companyId}/employees`);
      await addDoc(employeesCollection, {
        ...values,
        avatarUrl: `https://picsum.photos/seed/${Math.random()}/100/100`
      });
      toast({ title: "Employee Added", description: `${values.name} has been added.` });
      handleDialogChange(false);
    } catch (e) {
      toast({ variant: "destructive", title: "Error", description: "Could not add employee." });
    }
  };

  const handleEditEmployee = async (values: EmployeeFormValues) => {
    if (!firestore || !companyId || !dialogState.data) return;
    try {
      const employeeDoc = doc(firestore, `companies/${companyId}/employees`, dialogState.data.id);
      await updateDoc(employeeDoc, values);
      toast({ title: "Employee Updated", description: `${values.name}'s info updated.` });
      handleDialogChange(false);
    } catch (e) {
      toast({ variant: "destructive", title: "Error", description: "Could not update employee." });
    }
  };

  const handleDeleteEmployee = async () => {
    if (!firestore || !companyId || !dialogState.data) return;
    try {
      const employeeDoc = doc(firestore, `companies/${companyId}/employees`, dialogState.data.id);
      await deleteDoc(employeeDoc);
      toast({ title: "Employee Deleted", description: `${dialogState.data.name} has been removed.` });
      handleDialogChange(false);
    } catch (e) {
      toast({ variant: "destructive", title: "Error", description: "Could not delete employee." });
    }
  };

  // --- Location Handlers ---
  const handleAddLocation = async (values: LocationFormValues) => {
    if (!firestore || !companyId) return;
    try {
      const locationsCollection = collection(firestore, `companies/${companyId}/locations`);
      await addDoc(locationsCollection, values);
      toast({ title: "Location Added", description: `${values.name} has been added.` });
      handleDialogChange(false);
    } catch (e) {
      toast({ variant: "destructive", title: "Error", description: "Could not add location." });
    }
  };
  
  const handleEditLocation = async (values: LocationFormValues) => {
    if (!firestore || !companyId || !dialogState.data) return;
    try {
      const locationDoc = doc(firestore, `companies/${companyId}/locations`, dialogState.data.id);
      await updateDoc(locationDoc, values);
      toast({ title: "Location Updated", description: `${values.name}'s info updated.` });
      handleDialogChange(false);
    } catch (e) {
      toast({ variant: "destructive", title: "Error", description: "Could not update location." });
    }
  };
  
  const handleDeleteLocation = async () => {
    if (!firestore || !companyId || !dialogState.data) return;
    try {
      const locationDoc = doc(firestore, `companies/${companyId}/locations`, dialogState.data.id);
      await deleteDoc(locationDoc);
      toast({ title: "Location Deleted", description: `${dialogState.data.name} has been removed.` });
      handleDialogChange(false);
    } catch (e) {
      toast({ variant: "destructive", title: "Error", description: "Could not delete location." });
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" className="h-8 gap-1" disabled={!companyId}>
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Add New
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setDialogState({ isOpen: true, type: 'addEmployee' })}>
                    Add Employee
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setDialogState({ isOpen: true, type: 'addLocation' })}>
                    Add Location
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
              {loadingEmployees && <p>Loading employees...</p>}
              {errorEmployees && <p className="text-destructive">Error loading employees: {errorEmployees.message}</p>}
              {!loadingEmployees && !errorEmployees && !employees && <p>No company found. Please ensure you have created a company.</p>}
              {!loadingEmployees && !errorEmployees && employees && (
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
                              <DropdownMenuItem onClick={() => setDialogState({isOpen: true, type: 'editEmployee', data: employee})}>Edit</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive" onClick={() => setDialogState({isOpen: true, type: 'deleteEmployee', data: employee})}>Delete</DropdownMenuItem>
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
            <Card>
                <CardHeader>
                    <CardTitle>Locations</CardTitle>
                    <CardDescription>A list of all your business locations.</CardDescription>
                </CardHeader>
                <CardContent>
                    {loadingLocations && <p>Loading locations...</p>}
                    {errorLocations && <p className="text-destructive">Error: {errorLocations.message}</p>}
                    {!loadingLocations && !errorLocations && locations && (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Address</TableHead>
                                    <TableHead><span className="sr-only">Actions</span></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {locations.map(location => (
                                    <TableRow key={location.id}>
                                        <TableCell className="font-medium">{location.name}</TableCell>
                                        <TableCell>{location.address}</TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Toggle menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem onClick={() => setDialogState({isOpen: true, type: 'editLocation', data: location})}>Edit</DropdownMenuItem>
                                                    <DropdownMenuItem className="text-destructive" onClick={() => setDialogState({isOpen: true, type: 'deleteLocation', data: location})}>Delete</DropdownMenuItem>
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
      
      {/* --- Dialogs --- */}
      <Dialog open={dialogState.isOpen && ['addEmployee', 'editEmployee', 'addLocation', 'editLocation'].includes(dialogState.type!)} onOpenChange={handleDialogChange}>
          <DialogContent>
            {dialogState.type === 'addEmployee' && (
              <>
                <DialogHeader><DialogTitle>Add New Employee</DialogTitle><DialogDescription>Fill in the details to add a new team member.</DialogDescription></DialogHeader>
                <EmployeeForm onSubmit={handleAddEmployee} />
              </>
            )}
            {dialogState.type === 'editEmployee' && (
              <>
                <DialogHeader><DialogTitle>Edit Employee</DialogTitle><DialogDescription>Update the details for {dialogState.data?.name}.</DialogDescription></DialogHeader>
                <EmployeeForm onSubmit={handleEditEmployee} defaultValues={dialogState.data} />
              </>
            )}
            {dialogState.type === 'addLocation' && (
              <>
                <DialogHeader><DialogTitle>Add New Location</DialogTitle><DialogDescription>Fill in the details to add a new location.</DialogDescription></DialogHeader>
                <LocationForm onSubmit={handleAddLocation} />
              </>
            )}
            {dialogState.type === 'editLocation' && (
              <>
                <DialogHeader><DialogTitle>Edit Location</DialogTitle><DialogDescription>Update the details for {dialogState.data?.name}.</DialogDescription></DialogHeader>
                <LocationForm onSubmit={handleEditLocation} defaultValues={dialogState.data} />
              </>
            )}
          </DialogContent>
      </Dialog>

      {/* --- Alert Dialogs for Deletion --- */}
       <AlertDialog open={dialogState.isOpen && ['deleteEmployee', 'deleteLocation'].includes(dialogState.type!)} onOpenChange={handleDialogChange}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              {dialogState.type === 'deleteEmployee' && <AlertDialogDescription>This action cannot be undone. This will permanently delete the employee record for {dialogState.data?.name}.</AlertDialogDescription>}
              {dialogState.type === 'deleteLocation' && <AlertDialogDescription>This action cannot be undone. This will permanently delete the location {dialogState.data?.name}.</AlertDialogDescription>}
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => handleDialogChange(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={dialogState.type === 'deleteEmployee' ? handleDeleteEmployee : handleDeleteLocation} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
