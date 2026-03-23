import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function VendorServicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-headline">My Services & Packages</h1>
        <Button>Add New Package</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>DJ Packages</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Manage your service packages here... coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
