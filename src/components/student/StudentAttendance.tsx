import { useState } from 'react';
import { AttendanceRecord, MessBill } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const months = ['January', 'February'];
const monthKeys = ['2025-01', '2025-02'];
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const StudentAttendance = ({ attendance, bills }: { attendance: Record<string, AttendanceRecord[]>; bills: MessBill[] }) => {
  const [selectedMonth, setSelectedMonth] = useState('0');
  const idx = parseInt(selectedMonth);
  const records = attendance[monthKeys[idx]] || [];
  const bill = bills.find(b => b.month === idx + 1);

  const presentCount = records.filter(r => r.status === 'present').length;
  const absentCount = records.filter(r => r.status === 'absent').length;
  const leaveCount = records.filter(r => r.status === 'leave').length;

  // Build calendar grid
  const firstDay = new Date(2025, idx, 1).getDay();
  const daysInMonth = records.length;

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-heading font-bold text-foreground mb-6">Attendance</h1>

      <div className="mb-6">
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {months.map((m, i) => (
              <SelectItem key={i} value={String(i)}>{m} 2025</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <StatCard label="Present" count={presentCount} className="bg-success/10 text-success" />
        <StatCard label="Absent" count={absentCount} className="bg-destructive/10 text-destructive" />
        <StatCard label="Leave" count={leaveCount} className="bg-leave/10 text-leave" />
      </div>

      {/* Calendar */}
      <Card className="shadow-card mb-6">
        <CardHeader>
          <CardTitle className="text-lg">{months[idx]} 2025</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map(d => (
              <div key={d} className="text-center text-xs font-medium text-muted-foreground py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {records.map((r, i) => (
              <div
                key={i}
                className={`aspect-square flex items-center justify-center rounded-md text-xs font-medium ${
                  r.status === 'present' ? 'bg-success/15 text-success' :
                  r.status === 'absent' ? 'bg-destructive/15 text-destructive' :
                  'bg-leave/15 text-leave'
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex gap-4 mt-4 pt-4 border-t border-border">
            <Legend color="bg-success" label="Present" />
            <Legend color="bg-destructive" label="Absent" />
            <Legend color="bg-leave" label="Leave" />
          </div>
        </CardContent>
      </Card>

      {/* Cost Info */}
      {bill && (
        <Card className="shadow-card">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Cost per day</span>
              <span className="font-medium">₹{bill.costPerDay}</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-muted-foreground">Monthly Bill</span>
              <span className="font-bold text-lg">₹{bill.totalAmount}</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const StatCard = ({ label, count, className }: { label: string; count: number; className: string }) => (
  <div className={`rounded-lg p-3 text-center ${className}`}>
    <p className="text-2xl font-bold">{count}</p>
    <p className="text-xs font-medium">{label}</p>
  </div>
);

const Legend = ({ color, label }: { color: string; label: string }) => (
  <div className="flex items-center gap-1.5">
    <div className={`w-3 h-3 rounded-sm ${color}`} />
    <span className="text-xs text-muted-foreground">{label}</span>
  </div>
);

export default StudentAttendance;
