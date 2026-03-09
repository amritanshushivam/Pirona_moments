'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PironaLogo } from "@/components/icons/PironaLogo";
import { handleAdminLogin } from "./actions";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader className="text-center">
            <Link href="/" className="inline-block mb-4">
                <PironaLogo className="h-12 w-12 mx-auto text-primary" />
            </Link>
          <CardTitle className="text-2xl font-headline">Admin & Vendor Login</CardTitle>
          <CardDescription>
            Select your role and enter your credentials.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleAdminLogin}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Select name="role" required>
                      <SelectTrigger id="role">
                          <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="vendor">Vendor</SelectItem>
                      </SelectContent>
                  </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="id">User ID / Email</Label>
                <Input
                  id="id"
                  name="id"
                  type="text"
                  placeholder="Enter your ID or email"
                  required
                />
              </div>
              <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Are you a customer?{" "}
            <Link href="/auth/login" className="underline">
              Login here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
