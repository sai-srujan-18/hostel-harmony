import { useState } from 'react';
import { getAllStudents } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { TreePalm, IndianRupee } from 'lucide-react';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const AdminLeave = () => {
  const students = getAllStudents();
  const [rollNumber, setRollNumber] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  // Monthly cost per day configuration
  const [monthlyCosts, setMonthlyCosts] = useState<Record<number, string>>(
    Object.fromEntries(months.map((_, i) => [i + 1, '120']))
  );

  const matchedStudent = students.find(
    s => s.rollNumber.toLowerCase() === rollNumber.toLowerCase()
  );

  const handleSave = () => {
    if (!matchedStudent || !fromDate || !toDate) {
      toast.error('Please enter a valid roll number and fill all fields');
      return;
    }
    toast.success(`Leave assigned to ${matchedStudent.name} successfully!`);
    setRollNumber('');
    setFromDate('');
    setToDate('');
  };

  const handleCostChange = (month: number, value: string) => {
    setMonthlyCosts(prev => ({ ...prev, [month]: value }));
  };

  const handleSaveCosts = () => {
    toast.success('Monthly cost per day updated successfully!');
  };

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-heading font-bold text-foreground">Leave Management</h1>

      {/* Assign Leave */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2"><TreePalm className="w-5 h-5" /> Assign Leave</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Student Roll Number</Label>
            <Input
              placeholder="Enter roll number e.g. 2021CS001"
              value={rollNumber}
              onChange={e => setRollNumber(e.target.value)}
            />
            {rollNumber && matchedStudent && (
              <p className="text-xs text-success">Found: {matchedStudent.name}</p>
            )}
            {rollNumber && !matchedStudent && (
              <p className="text-xs text-destructive">No student found with this roll number</p>
            )}
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

      {/* Monthly Cost Per Day */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2"><IndianRupee className="w-5 h-5" /> Monthly Cost Per Day</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {months.map((m, i) => (
              <div key={i} className="space-y-1">
                <Label className="text-xs">{m}</Label>
                <Input
                  type="number"
                  min={0}
                  value={monthlyCosts[i + 1]}
                  onChange={e => handleCostChange(i + 1, e.target.value)}
                  className="h-9"
                />
              </div>
            ))}
          </div>
          <Button onClick={handleSaveCosts} className="w-full gradient-primary text-primary-foreground mt-2">Save Costs</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLeave;
