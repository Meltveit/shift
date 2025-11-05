
'use client'

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Clock, Check, LogOut, Coffee } from "lucide-react";
import { DashboardHeader } from '@/components/dashboard-header';
import type { Employee, TimeOffRequest } from '@/lib/types';
import { useUser, useFirestore, useCollection } from '@/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';


export default function DashboardPage() {
  const user = useUser();
  const firestore = useFirestore();
  const [time, setTime] = useState(new Date());
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState<Date | null>(null);
  const [companyId, setCompanyId] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const findCompany = async () => {
      if (user && firestore) {
        const companiesCollection = collection(firestore, 'companies');
        const q = query(companiesCollection, where('ownerUid', '==', user.uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setCompanyId(querySnapshot.docs[0].id);
        }
      }
    };
    findCompany();
  }, [user, firestore]);
  
  const employeesPath = companyId ? `companies/${companyId}/employees` : undefined;
  const { data: employees, loading: loadingEmployees } = useCollection<Employee>(employeesPath);

  const timeOffPath = companyId ? `companies/${companyId}/timeOffRequests` : undefined;
  const { data: timeOffRequests, loading: loadingTimeOff } = useCollection<TimeOffRequest>(timeOffPath);

  const handleClockInOut = () => {
    if (isClockedIn) {
      setIsClockedIn(false);
    } else {
      setIsClockedIn(true);
      setClockInTime(new Date());
    }
  };

  const upcomingShifts = [
    { time: 'Tomorrow, 9:00 AM - 5:00 PM', role: 'Barista', location: 'Main Street Cafe' },
    { time: 'Friday, 12:00 PM - 8:00 PM', role: 'Barista', location: 'Downtown Brew' },
  ];

  const getEmployeeById = (id: string): Employee | undefined => {
    if (!employees) return undefined;
    return employees.find(e => e.id === id);
  }

  const welcomeName = user?.displayName?.split(' ')[0] || 'there';

  return (
    <>
      <DashboardHeader
        title={`Welcome, ${welcomeName}!`}
        description={`Today is ${time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.`}
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Time Clock</CardTitle>
            <CardDescription>Clock in and out for your shifts.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col items-center justify-center gap-4">
            <div className="text-5xl font-bold font-mono tracking-tighter">
              {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </div>
            <p className="text-muted-foreground">
              {isClockedIn && clockInTime ? `Clocked in at ${clockInTime.toLocaleTimeString()}` : 'You are currently clocked out.'}
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" size="lg" onClick={handleClockInOut}>
              {isClockedIn ? <><LogOut className="mr-2" /> Clock Out</> : <><Check className="mr-2" /> Clock In</>}
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Shifts</CardTitle>
            <CardDescription>Your next scheduled shifts.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {upcomingShifts.map((shift, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="bg-secondary p-3 rounded-md">
                  <Coffee className="text-secondary-foreground" />
                </div>
                <div>
                  <p className="font-medium">{shift.time}</p>
                  <p className="text-sm text-muted-foreground">{shift.role} at {shift.location}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending Time Off</CardTitle>
            <CardDescription>Requests needing review.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {loadingTimeOff && <p>Loading requests...</p>}
            {timeOffRequests && timeOffRequests.filter(req => req.status === 'Pending').map(request => {
              const employee = getEmployeeById(request.employeeId);
              // Firestore Timestamps need to be converted to JS Dates
              const startDate = request.startDate.toDate ? request.startDate.toDate() : new Date(request.startDate);
              const endDate = request.endDate.toDate ? request.endDate.toDate() : new Date(request.endDate);
              return (
                <div key={request.id} className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={employee?.avatarUrl} alt={employee?.name} />
                    <AvatarFallback>{employee?.name ? employee.name.charAt(0) : '?'}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{employee?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {request.type}: {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant="secondary" className="ml-auto">Pending</Badge>
                </div>
              );
            })}
             {!loadingTimeOff && timeOffRequests && timeOffRequests.filter(req => req.status === 'Pending').length === 0 && (
                <p className="text-sm text-muted-foreground">No pending requests.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
