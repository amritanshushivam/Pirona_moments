'use server';

/**
 * @fileOverview This file implements the AI fraud detection flow.
 * It analyzes vendor data to detect potentially fraudulent listings and alerts users.
 *
 * @exports {
 *   detectFraud,
 *   FraudDetectionInput,
 *   FraudDetectionOutput,
 * }
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FraudDetectionInputSchema = z.object({
  vendorProfile: z
    .string()
    .describe("The vendor's profile information, including services offered, pricing, and reviews."),
  pastBehavior: z
    .string()
    .describe("A description of the vendor's past behavior, including booking history and customer feedback."),
});

export type FraudDetectionInput = z.infer<typeof FraudDetectionInputSchema>;

const FraudDetectionOutputSchema = z.object({
  isFraudulent: z.boolean().describe('Whether the vendor is potentially fraudulent.'),
  fraudScore: z.number().describe('A score indicating the likelihood of fraud (0-1).'),
  reason: z.string().describe('The reason for the fraud detection.'),
});

export type FraudDetectionOutput = z.infer<typeof FraudDetectionOutputSchema>;

export async function detectFraud(input: FraudDetectionInput): Promise<FraudDetectionOutput> {
  return detectFraudFlow(input);
}

const fraudDetectionPrompt = ai.definePrompt({
  name: 'fraudDetectionPrompt',
  input: {schema: FraudDetectionInputSchema},
  output: {schema: FraudDetectionOutputSchema},
  prompt: `You are an AI expert in detecting fraudulent vendors on a wedding planning platform.

  Analyze the following vendor profile and past behavior to determine if the vendor is potentially fraudulent.
  Provide a fraud score between 0 and 1, where 1 indicates a high likelihood of fraud.
  Explain the reason for your determination.

  Vendor Profile: {{{vendorProfile}}}
  Past Behavior: {{{pastBehavior}}}
  \nDetermine the isFraudulent boolean value to true of false.
  Response: {
    "isFraudulent": "boolean",
    "fraudScore": "number (0-1)",
    "reason": "string"
  }`,
});

const detectFraudFlow = ai.defineFlow(
  {
    name: 'detectFraudFlow',
    inputSchema: FraudDetectionInputSchema,
    outputSchema: FraudDetectionOutputSchema,
  },
  async input => {
    const {output} = await fraudDetectionPrompt(input);
    return output!;
  }
);
