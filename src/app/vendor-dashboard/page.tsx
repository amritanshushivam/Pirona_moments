import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export default function VendorProfilePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-headline">My Profile</h1>
      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input id="businessName" defaultValue="DJ Sunny" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="service">Service Category</Label>
              <Input id="service" defaultValue="DJ & Music" disabled />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" defaultValue="Mumbai" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profileDescription">Profile Description</Label>
            <Textarea
              id="profileDescription"
              defaultValue="DJ Sunny is one of Mumbai's top wedding DJs, known for his electrifying mixes and ability to read the crowd. He ensures a packed dance floor."
              rows={4}
            />
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Verification Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Badge>Verified</Badge>
            <p className="text-sm text-muted-foreground">Your profile is verified and trusted by users.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
