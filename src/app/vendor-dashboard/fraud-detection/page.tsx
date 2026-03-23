'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { runFraudCheck, type FraudCheckState } from './actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { vendors } from '@/lib/data';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, Shield, ShieldAlert, ShieldCheck, Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const initialState: FraudCheckState = {
  result: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        <>
          <ShieldAlert className="mr-2 h-4 w-4" />
          Run Fraud Analysis
        </>
      )}
    </Button>
  );
}

export default function FraudDetectionPage() {
  const [state, formAction] = useFormState(runFraudCheck, initialState);
  
  // Using two different vendors to show different results
  const trustedVendor = vendors.find(v => v.id === '2');
  const suspiciousVendor = vendors.find(v => v.id === '3');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-headline">AI Fraud Detection</h1>
      <p className="text-muted-foreground">
        Our AI analyzes your profile data to identify potential signs of fraudulent activity. This helps you understand how your profile appears to our system and maintain a trustworthy presence on Pirona.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Vendor Profile Analysis</CardTitle>
          <CardDescription>
            Select a sample vendor profile and run the analysis to see the AI in action.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="vendorProfile">Vendor Profile</Label>
                    <Textarea
                    id="vendorProfile"
                    name="vendorProfile"
                    rows={8}
                    defaultValue={trustedVendor?.profileDescription}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="pastBehavior">Past Behavior</Label>
                    <Textarea
                    id="pastBehavior"
                    name="pastBehavior"
                    rows={8}
                    defaultValue={trustedVendor?.pastBehavior}
                    />
                </div>
             </div>
             <p className="text-sm text-muted-foreground pt-2">
                Want to see a different result? Try this suspicious profile: <br />
                <strong>Profile:</strong> {suspiciousVendor?.profileDescription} <br/>
                <strong>Behavior:</strong> {suspiciousVendor?.pastBehavior}
             </p>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
      
      {state.result && (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Shield className="h-6 w-6" /> Analysis Result
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Alert variant={state.result.isFraudulent ? 'destructive' : 'default'}>
                    {state.result.isFraudulent ? <ShieldAlert className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
                    <AlertTitle>
                        {state.result.isFraudulent ? 'Potential Fraud Detected' : 'Profile Looks Good'}
                    </AlertTitle>
                    <AlertDescription>
                        {state.result.reason}
                    </AlertDescription>
                </Alert>
                <div>
                    <Label>Fraud Score</Label>
                    <div className="flex items-center gap-4 mt-2">
                        <Progress value={state.result.fraudScore * 100} className="w-full" />
                        <span className="font-bold text-lg">{(state.result.fraudScore * 100).toFixed(0)}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">A score of 0% indicates lowest risk, 100% indicates highest risk.</p>
                </div>
            </CardContent>
        </Card>
      )}

      {state.error && (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>An Error Occurred</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
