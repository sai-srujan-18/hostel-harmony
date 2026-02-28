import { User } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, Hash, ShieldCheck } from 'lucide-react';

const AdminProfile = ({ user }: { user: User }) => (
  <div className="max-w-2xl">
    <h1 className="text-2xl font-heading font-bold text-foreground mb-6">Admin Profile</h1>
    <Card className="shadow-card">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center text-2xl font-bold text-accent-foreground">
            {user.name.charAt(0)}
          </div>
          <div>
            <CardTitle className="text-xl">{user.name}</CardTitle>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Administrator
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          <InfoRow icon={Hash} label="Admin ID" value={user.rollNumber} />
          <InfoRow icon={Phone} label="Mobile" value={user.phone} />
          <InfoRow icon={Mail} label="Email" value={user.email || '—'} />
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

export default AdminProfile;
