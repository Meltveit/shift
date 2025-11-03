
import type { Employee, Shift, TimeOffRequest, SwapRequest } from './types';

// This file is now being phased out. Data is being migrated to Firebase Firestore.
// You can remove data from here as it's replaced by live data in the components.

// Note: `shifts` array has been removed as it is now fetched from Firestore.
export const shifts: Shift[] = [];

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
