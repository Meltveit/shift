export type Employee = {
  id: string;
  name: string;
  email: string;
  role: 'Manager' | 'Cashier' | 'Barista' | 'Chef';
  avatarUrl: string;
};

export type Shift = {
  id: string;
  employeeId: string;
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
  startTime: string; // e.g., "09:00"
  endTime: string; // e.g., "17:00"
  role: Employee['role'];
  color: string;
};

export type TimeOffRequest = {
  id: string;
  employeeId: string;
  startDate: any; // Using `any` to avoid timestamp issues for now
  endDate: any;
  type: 'Vacation' | 'Sick Leave' | 'Personal';
  status: 'Pending' | 'Approved' | 'Denied';
};

export type SwapRequest = {
  id: string;
  fromEmployeeId: string;
  toEmployeeId: string;
  shiftId: string;
  status: 'Pending' | 'Approved' | 'Denied';
};

export type Location = {
    id: string;
    name: string;
    address: string;
};
