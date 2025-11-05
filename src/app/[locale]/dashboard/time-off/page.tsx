

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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { timeOffRequests } from "@/lib/data";
import { PlusCircle } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard-header";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Employee } from "@/lib/types";

export default function TimeOffPage() {
  const balances = [
    { type: "Vacation", used: 5, total: 20 },
    { type: "Sick Leave", used: 2, total: 10 },
    { type: "Personal", used: 1, total: 5 },
  ];
    // Note: This page still uses mock data. It will be updated to use Firestore soon.
    // This needs to be replaced by a Firestore query
    const mockEmployees: Employee[] = [];
    
    // This needs to be replaced by a Firestore query
    const getEmployeeById = (employees: Employee[], id: string) => employees.find(e => e.id === id);


  return (
    <>
      <DashboardHeader
        title="Time Off"
        description="Manage your leave requests and view balances."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {balances.map((balance) => (
          <Card key={balance.type}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {balance.type}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{balance.total - balance.used} days</div>
              <p className="text-xs text-muted-foreground">
                {balance.used} of {balance.total} days used
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-8 md:grid-cols-5 mt-8">
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Request History</CardTitle>
              <CardDescription>
                A log of all your time off requests.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {timeOffRequests.map((request) => {
                    const employee = getEmployeeById(mockEmployees, request.employeeId);
                    if (!employee) return null;
                    return (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.type}</TableCell>
                        <TableCell>
                          {request.startDate.toLocaleDateString()} -{" "}
                          {request.endDate.toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant={
                              request.status === "Pending"
                                ? "secondary"
                                : request.status === "Approved"
                                ? "default"
                                : "destructive"
                            }
                            className="capitalize"
                          >
                            {request.status.toLowerCase()}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Request Time Off</CardTitle>
              <CardDescription>Select the dates for your leave.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Leave Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vacation">Vacation</SelectItem>
                    <SelectItem value="sick">Sick Leave</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Dates</Label>
                <Calendar
                  mode="range"
                  className="rounded-md border"
                />
              </div>
              <Button className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" />
                Submit Request
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
