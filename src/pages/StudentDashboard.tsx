import { useState } from 'react';
import { useAuth, mockAttendance, mockBills, mockNotifications } from '@/lib/store';
import { Navigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import StudentDetailsCard from '@/components/student/StudentDetailsCard';
import StudentMessBill from '@/components/student/StudentMessBill';
import StudentAttendance from '@/components/student/StudentAttendance';
import StudentRules from '@/components/student/StudentRules';
import StudentNotifications from '@/components/student/StudentNotifications';
import { User, Receipt, CalendarDays, BookOpen, Bell } from 'lucide-react';

const tabs = [
  { id: 'details', label: 'My Details', icon: User },
  { id: 'bill', label: 'Mess Bill', icon: Receipt },
  { id: 'attendance', label: 'Attendance', icon: CalendarDays },
  { id: 'rules', label: 'Rules', icon: BookOpen },
  { id: 'notifications', label: 'Notifications', icon: Bell },
];

const StudentDashboard = () => {
  const user = useAuth(s => s.user);
  const [activeTab, setActiveTab] = useState('details');

  if (!user || user.role !== 'student') return <Navigate to="/" replace />;

  return (
    <DashboardLayout tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="animate-fade-in">
        {activeTab === 'details' && <StudentDetailsCard user={user} />}
        {activeTab === 'bill' && <StudentMessBill bills={mockBills} />}
        {activeTab === 'attendance' && <StudentAttendance attendance={mockAttendance} bills={mockBills} />}
        {activeTab === 'rules' && <StudentRules />}
        {activeTab === 'notifications' && <StudentNotifications notifications={mockNotifications} />}
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
