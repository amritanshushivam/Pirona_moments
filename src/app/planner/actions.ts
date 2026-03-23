'use server';

import {
  buildWeddingPackage,
  WeddingPackageInput,
  WeddingPackageOutput,
} from '@/ai/flows/ai-package-builder';
import { z } from 'zod';

export interface BuildPackageState {
  result: WeddingPackageOutput | null;
  error: string | null;
}

const schema = z.object({
  weddingStyle: z.string().min(1, { message: 'Wedding style is required.' }),
  budget: z.coerce.number().min(1, { message: 'Budget is required.' }),
  venueType: z.string().min(1, { message: 'Venue type is required.' }),
  guestCount: z.coerce.number().min(1, { message: 'Guest count is required.' }),
  location: z.string().min(1, { message: 'Location is required.' }),
  additionalPreferences: z.string().optional(),
});

export async function runPackageBuilder(
  prevState: BuildPackageState,
  formData: FormData
): Promise<BuildPackageState> {
  const validatedFields = schema.safeParse({
    weddingStyle: formData.get('weddingStyle'),
    budget: formData.get('budget'),
    venueType: formData.get('venueType'),
    guestCount: formData.get('guestCount'),
    location: formData.get('location'),
    additionalPreferences: formData.get('additionalPreferences'),
  });

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    const firstError = Object.values(fieldErrors)[0]?.[0] || 'Invalid input.';
    return {
      result: null,
      error: firstError,
    };
  }

  const input: WeddingPackageInput = validatedFields.data;

  try {
    const result = await buildWeddingPackage(input);
    return { result, error: null };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return {
      result: null,
      error: `Failed to build package: ${errorMessage}`,
    };
  }
}
