import { useState } from 'react';
import { getAllStudents } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { TreePalm } from 'lucide-react';

const AdminLeave = () => {
  const students = getAllStudents();
  const [selectedStudent, setSelectedStudent] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const handleSave = () => {
    if (!selectedStudent || !fromDate || !toDate) {
      toast.error('Please fill all fields');
      return;
    }
    toast.success('Leave assigned successfully!');
    setSelectedStudent('');
    setFromDate('');
    setToDate('');
  };

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-heading font-bold text-foreground mb-6">Leave Management</h1>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2"><TreePalm className="w-5 h-5" /> Assign Leave</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Select Student</Label>
            <Select value={selectedStudent} onValueChange={setSelectedStudent}>
              <SelectTrigger><SelectValue placeholder="Choose student" /></SelectTrigger>
              <SelectContent>
                {students.map(s => (
                  <SelectItem key={s.id} value={s.id}>{s.name} ({s.rollNumber})</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>From Date</Label>
            <Input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>To Date</Label>
            <Input type="date" value={toDate} onChange={e => setToDate(e.target.value)} />
          </div>
          <Button onClick={handleSave} className="w-full gradient-primary text-primary-foreground">Save Leave</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLeave;
