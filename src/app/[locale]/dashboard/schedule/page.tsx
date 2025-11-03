import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  FilePlus,
  Users,
} from "lucide-react";
import { getEmployeeById, shifts } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { DashboardHeader } from "@/components/dashboard-header";
import AiSuggestions from "./AiSuggestions";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const timeSlots = Array.from({ length: 15 }, (_, i) => `${String(i + 7).padStart(2, '0')}:00`);

export default function SchedulePage() {
  return (
    <>
      <DashboardHeader
        title="Weekly Schedule"
        description="Drag-and-drop to create and manage shifts."
      >
        <Button>
          <FilePlus className="mr-2" />
          Create Shift
        </Button>
      </DashboardHeader>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="icon">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <h3 className="text-lg font-semibold">August 12 - 18, 2024</h3>
                  <Button variant="outline" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="outline">Today</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative overflow-auto">
                <Table className="min-w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-24">Time</TableHead>
                      {days.map((day) => (
                        <TableHead key={day}>{day}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {timeSlots.map((time) => (
                      <TableRow key={time}>
                        <TableCell className="font-medium">{time}</TableCell>
                        {days.map((day) => {
                          const shift = shifts.find(
                            (s) => s.day === day && s.startTime === time
                          );
                          if (shift) {
                            const employee = getEmployeeById(shift.employeeId);
                            const duration =
                              (parseInt(shift.endTime.split(":")[0]) -
                                parseInt(shift.startTime.split(":")[0]));
                            return (
                              <TableCell
                                key={`${day}-${time}`}
                                className="p-1 align-top"
                                colSpan={1}
                              >
                                <div
                                  className={`p-2 rounded-md text-slate-800 ${shift.color}`}
                                  style={{
                                    height: `${duration * 4}rem`, // 4rem per hour
                                  }}
                                >
                                  <p className="font-bold text-sm">{employee?.name}</p>
                                  <p className="text-xs">{shift.role}</p>
                                </div>
                              </TableCell>
                            );
                          }
                          const isCovered = shifts.some(s => s.day === day && time > s.startTime && time < s.endTime);
                          return isCovered ? null : <TableCell key={`${day}-${time}`} className="border-l"></TableCell>;
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1 space-y-8">
           <AiSuggestions />
           <Card>
            <CardHeader>
              <CardTitle>Team View</CardTitle>
               <CardDescription>Hours scheduled per employee.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-2"><Users /> Team</span>
                <span className="text-muted-foreground">Hours</span>
              </div>
               <div className="flex items-center justify-between">
                <span>Sarah Miller</span>
                <Badge variant="secondary">8h</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>David Chen</span>
                <Badge variant="secondary">16h</Badge>
              </div>
               <div className="flex items-center justify-between">
                <span>Maria Garcia</span>
                <Badge variant="secondary">16h</Badge>
              </div>
               <div className="flex items-center justify-between">
                <span>Kevin Smith</span>
                <Badge variant="secondary">16h</Badge>
              </div>
               <div className="flex items-center justify-between">
                <span>Emily Johnson</span>
                <Badge variant="secondary">16h</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
