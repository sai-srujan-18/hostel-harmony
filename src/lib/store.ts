import { create } from 'zustand';

export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  rollNumber: string;
  role: UserRole;
  phone: string;
  email?: string;
  hostelNumber?: string;
  semester?: number;
}

export interface AttendanceRecord {
  date: string;
  status: 'present' | 'absent' | 'leave';
}

export interface MessBill {
  month: number;
  year: number;
  totalDaysPresent: number;
  costPerDay: number;
  totalAmount: number;
  paidAmount: number;
  balance: number;
}

export interface Notification {
  id: string;
  message: string;
  sentBy: string;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (rollNumber: string, password: string, role: UserRole) => boolean;
  logout: () => void;
}

const mockStudents: User[] = [
  { id: '1', name: 'Rahul Sharma', rollNumber: '2021CS001', role: 'student', phone: '9876543210', hostelNumber: 'H1', semester: 6 },
  { id: '2', name: 'Priya Patel', rollNumber: '2021CS002', role: 'student', phone: '9876543211', hostelNumber: 'H2', semester: 6 },
  { id: '3', name: 'Amit Kumar', rollNumber: '2021EC003', role: 'student', phone: '9876543212', hostelNumber: 'H1', semester: 4 },
  { id: '4', name: 'Sneha Gupta', rollNumber: '2021ME004', role: 'student', phone: '9876543213', hostelNumber: 'H3', semester: 6 },
  { id: '5', name: 'Vikram Singh', rollNumber: '2021CE005', role: 'student', phone: '9876543214', hostelNumber: 'H2', semester: 4 },
];

const mockAdmins: User[] = [
  { id: 'a1', name: 'Dr. Rajesh Verma', rollNumber: 'ADMIN001', role: 'admin', phone: '9800000001', email: 'admin@hostel.edu' },
];

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (rollNumber, _password, role) => {
    const users = role === 'admin' ? mockAdmins : mockStudents;
    const found = users.find(u => u.rollNumber.toLowerCase() === rollNumber.toLowerCase());
    if (found && found.role === role) {
      set({ user: found, isAuthenticated: true });
      return true;
    }
    return false;
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}));

// Mock data helpers
export const mockAttendance: Record<string, AttendanceRecord[]> = {
  '2025-01': Array.from({ length: 31 }, (_, i) => ({
    date: `2025-01-${String(i + 1).padStart(2, '0')}`,
    status: i % 7 === 0 ? 'absent' as const : i % 10 === 0 ? 'leave' as const : 'present' as const,
  })),
  '2025-02': Array.from({ length: 28 }, (_, i) => ({
    date: `2025-02-${String(i + 1).padStart(2, '0')}`,
    status: i % 6 === 0 ? 'absent' as const : i % 12 === 0 ? 'leave' as const : 'present' as const,
  })),
};

export const mockBills: MessBill[] = [
  { month: 1, year: 2025, totalDaysPresent: 26, costPerDay: 120, totalAmount: 3120, paidAmount: 3120, balance: 0 },
  { month: 2, year: 2025, totalDaysPresent: 24, costPerDay: 120, totalAmount: 2880, paidAmount: 2000, balance: 880 },
];

export const mockNotifications: Notification[] = [
  { id: '1', message: 'Mess timings changed: Dinner will be served from 7:00 PM to 9:00 PM starting next week.', sentBy: 'ADMIN001', createdAt: '2025-02-25T10:00:00Z' },
  { id: '2', message: 'Mess bills for January have been generated. Please check your dashboard.', sentBy: 'ADMIN001', createdAt: '2025-02-01T09:00:00Z' },
  { id: '3', message: 'Special menu for Republic Day celebration on 26th January.', sentBy: 'ADMIN001', createdAt: '2025-01-24T14:00:00Z' },
];

export const getAllStudents = () => mockStudents;
export const getAllUsers = () => [...mockStudents, ...mockAdmins];
