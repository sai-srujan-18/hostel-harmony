import { User } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, Hash, Building, BookOpen } from 'lucide-react';

const StudentDetailsCard = ({ user }: { user: User }) => (
  <div className="max-w-2xl">
    <h1 className="text-2xl font-heading font-bold text-foreground mb-6">My Details</h1>
    <Card className="shadow-card">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center text-2xl font-bold text-primary-foreground">
            {user.name.charAt(0)}
          </div>
          <div>
            <CardTitle className="text-xl">{user.name}</CardTitle>
            <Badge variant="secondary" className="mt-1">{user.rollNumber}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          <InfoRow icon={Phone} label="Mobile" value={user.phone} />
          <InfoRow icon={Hash} label="Roll Number" value={user.rollNumber} />
          <InfoRow icon={Building} label="Hostel" value={user.hostelNumber || '—'} />
          <InfoRow icon={BookOpen} label="Semester" value={user.semester ? `Semester ${user.semester}` : '—'} />
        </div>
      </CardContent>
    </Card>
  </div>
);

const InfoRow = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
    <Icon className="w-4 h-4 text-muted-foreground" />
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  </div>
);

export default StudentDetailsCard;
