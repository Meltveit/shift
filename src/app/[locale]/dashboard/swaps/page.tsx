

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getShiftById, swapRequests } from "@/lib/data";
import { PlusCircle, ArrowRight } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard-header";
import type { Employee } from "@/lib/types";

export default function SwapsPage() {
    // Note: This page still uses mock data. It will be updated to use Firestore soon.
    const incomingRequests = swapRequests.filter(req => req.toEmployeeId === '1'); // Assuming current user is admin/manager '1'
    const myRequests = swapRequests.filter(req => req.fromEmployeeId === '1');
    
    // This needs to be replaced by a Firestore query
    const mockEmployees: Employee[] = [];
    
    // This needs to be replaced by a Firestore query
    const getEmployeeById = (employees: Employee[], id: string) => employees.find(e => e.id === id);


  return (
    <>
      <DashboardHeader
        title="Shift Swaps"
        description="Manage your shift swap requests."
      >
        <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Request Swap
            </span>
        </Button>
      </DashboardHeader>
      <Tabs defaultValue="incoming">
        <TabsList>
          <TabsTrigger value="incoming">Incoming Requests</TabsTrigger>
          <TabsTrigger value="my-requests">My Requests</TabsTrigger>
        </TabsList>
        <TabsContent value="incoming">
          <Card>
            <CardHeader>
              <CardTitle>Incoming Requests</CardTitle>
              <CardDescription>
                Review shift swap requests from other employees.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {incomingRequests.map(req => {
                    const fromEmployee = getEmployeeById(mockEmployees, req.fromEmployeeId);
                    const toEmployee = getEmployeeById(mockEmployees, req.toEmployeeId);
                    const shift = getShiftById(req.shiftId);
                    return (
                         <Card key={req.id}>
                            <CardContent className="p-4 flex flex-col md:flex-row items-start md:items-center gap-4">
                               <div className="flex items-center gap-4 flex-grow">
                                    <Avatar>
                                        <AvatarImage src={fromEmployee?.avatarUrl} />
                                        <AvatarFallback>{fromEmployee?.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="text-sm">
                                        <span className="font-semibold">{fromEmployee?.name}</span> wants to swap with you.
                                    </div>
                                </div>
                                <div className="text-sm text-muted-foreground shrink-0">
                                   {shift?.day}, {shift?.startTime} - {shift?.endTime}
                                </div>
                                <Badge variant={req.status === 'Pending' ? 'secondary' : req.status === 'Approved' ? 'default' : 'destructive'} className="capitalize">
                                    {req.status.toLowerCase()}
                                </Badge>
                                {req.status === 'Pending' && (
                                    <div className="flex gap-2 ml-auto">
                                        <Button size="sm" variant="outline">Deny</Button>
                                        <Button size="sm">Approve</Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )
                })}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="my-requests">
          <Card>
            <CardHeader>
              <CardTitle>My Requests</CardTitle>
              <CardDescription>
                Track the status of your swap requests.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {myRequests.map(req => {
                    const fromEmployee = getEmployeeById(mockEmployees, req.fromEmployeeId);
                    const toEmployee = getEmployeeById(mockEmployees, req.toEmployeeId);
                    const shift = getShiftById(req.shiftId);
                    return (
                        <Card key={req.id}>
                            <CardContent className="p-4 flex flex-col md:flex-row items-start md:items-center gap-4">
                                <div className="flex items-center gap-4 flex-grow">
                                     <div className="flex items-center gap-2">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={fromEmployee?.avatarUrl} />
                                            <AvatarFallback>{fromEmployee?.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <ArrowRight className="h-4 w-4 text-muted-foreground"/>
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={toEmployee?.avatarUrl} />
                                            <AvatarFallback>{toEmployee?.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                     </div>
                                     <div className="text-sm">
                                        Requested swap with <span className="font-semibold">{toEmployee?.name}</span>
                                    </div>
                                </div>
                                <div className="text-sm text-muted-foreground shrink-0">
                                    {shift?.day}, {shift?.startTime} - {shift?.endTime}
                                </div>
                                <Badge variant={req.status === 'Pending' ? 'secondary' : req.status === 'Approved' ? 'default' : 'destructive'} className="capitalize">
                                    {req.status.toLowerCase()}
                                </Badge>
                                {req.status === 'Pending' && (
                                    <div className="flex gap-2 ml-auto">
                                        <Button size="sm" variant="ghost">Cancel</Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )
                })}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
