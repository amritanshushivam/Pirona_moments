'use server';

import { detectFraud, FraudDetectionInput, FraudDetectionOutput } from '@/ai/flows/ai-fraud-detection';
import { z } from 'zod';

export interface FraudCheckState {
  result: FraudDetectionOutput | null;
  error: string | null;
}

const schema = z.object({
  vendorProfile: z.string().min(1, { message: 'Vendor profile is required.' }),
  pastBehavior: z.string().min(1, { message: 'Past behavior is required.' }),
});

export async function runFraudCheck(
  prevState: FraudCheckState,
  formData: FormData
): Promise<FraudCheckState> {
  const validatedFields = schema.safeParse({
    vendorProfile: formData.get('vendorProfile'),
    pastBehavior: formData.get('pastBehavior'),
  });

  if (!validatedFields.success) {
    return {
      result: null,
      error: validatedFields.error.flatten().fieldErrors.vendorProfile?.[0] || 'Invalid input.',
    };
  }

  const input: FraudDetectionInput = {
    vendorProfile: validatedFields.data.vendorProfile,
    pastBehavior: validatedFields.data.pastBehavior,
  };

  try {
    const result = await detectFraud(input);
    return { result, error: null };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return {
      result: null,
      error: `Failed to run fraud detection: ${errorMessage}`,
    };
  }
}
