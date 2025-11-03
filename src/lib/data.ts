import type { Employee, Shift, TimeOffRequest, SwapRequest } from './types';

// This file is now being phased out. Data is being migrated to Firebase Firestore.
// You can remove data from here as it's replaced by live data in the components.

export const shifts: Shift[] = [
  { id: 's1', employeeId: '2', day: 'Mon', startTime: '08:00', endTime: '16:00', role: 'Barista', color: 'bg-emerald-200' },
  { id: 's2', employeeId: '3', day: 'Mon', startTime: '09:00', endTime: '17:00', role: 'Cashier', color: 'bg-sky-200' },
  { id: 's3', employeeId: '4', day: 'Mon', startTime: '11:00', endTime: '19:00', role: 'Chef', color: 'bg-rose-200' },
  { id: 's4', employeeId: '5', day: 'Tue', startTime: '08:00', endTime: '16:00', role: 'Barista', color: 'bg-emerald-200' },
  { id: 's5', employeeId: '2', day: 'Wed', startTime: '09:00', endTime: '17:00', role: 'Barista', color: 'bg-emerald-200' },
  { id: 's6', employeeId: '3', day: 'Wed', startTime: '12:00', endTime: '20:00', role: 'Cashier', color: 'bg-sky-200' },
  { id: 's7', employeeId: '4', day: 'Thu', startTime: '09:00', endTime: '17:00', role: 'Chef', color: 'bg-rose-200' },
  { id: 's8', employeeId: '5', day: 'Fri', startTime: '10:00', endTime: '18:00', role: 'Barista', color: 'bg-emerald-200' },
  { id: 's9', employeeId: '1', day: 'Fri', startTime: '09:00', endTime: '17:00', role: 'Manager', color: 'bg-amber-200' },
];

export const timeOffRequests: TimeOffRequest[] = [
  { id: 'to1', employeeId: '2', startDate: new Date('2024-08-05'), endDate: new Date('2024-08-07'), type: 'Vacation', status: 'Approved' },
  { id: 'to2', employeeId: '4', startDate: new Date('2024-08-10'), endDate: new Date('2024-08-10'), type: 'Sick Leave', status: 'Pending' },
  { id: 'to3', employeeId: '3', startDate: new Date('2024-09-01'), endDate: new Date('2024-09-05'), type: 'Vacation', status: 'Pending' },
];

export const swapRequests: SwapRequest[] = [
  { id: 'sw1', fromEmployeeId: '2', toEmployeeId: '5', shiftId: 's5', status: 'Pending' },
  { id: 'sw2', fromEmployeeId: '3', toEmployeeId: '2', shiftId: 's6', status: 'Approved' },
];


// Note: `employees` array has been removed as it is now fetched from Firestore.
export const getEmployeeById = (employees: Employee[], id: string) => employees.find(e => e.id === id);

export const getShiftById = (id: string) => shifts.find(s => s.id === id);
