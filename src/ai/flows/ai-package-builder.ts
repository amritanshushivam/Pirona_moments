'use server';
/**
 * @fileOverview This file contains the AI-Powered Wedding Package Builder flow.
 *
 * The flow takes user preferences for their wedding (style, budget, venue, guest count) and suggests suitable vendors and services.
 *
 * @module ai-package-builder
 * @exports buildWeddingPackage - The main function to trigger the flow.
 * @exports WeddingPackageInput - The input type for the buildWeddingPackage function.
 * @exports WeddingPackageOutput - The output type for the buildWeddingPackage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';


const WeddingPackageInputSchema = z.object({
  weddingStyle: z.string().describe('The desired style of the wedding (e.g., modern, traditional, rustic).'),
  budget: z.number().describe('The budget for the wedding in USD.'),
  venueType: z.string().describe('The desired type of venue (e.g., ballroom, garden, beach).'),
  guestCount: z.number().describe('The estimated number of guests.'),
  location: z.string().describe('The location of the wedding.'),
  additionalPreferences: z.string().optional().describe('Any additional preferences or specific requests.'),
});
export type WeddingPackageInput = z.infer<typeof WeddingPackageInputSchema>;

const VendorSchema = z.object({
  name: z.string().describe('The name of the vendor.'),
  service: z.string().describe('The service provided by the vendor (e.g., catering, photography, venue).'),
  priceRange: z.string().describe('The price range for the vendor service.'),
  rating: z.number().describe('The average rating of the vendor based on customer reviews.'),
  contactInfo: z.string().describe('The contact information of the vendor, including phone number and email address.'),
});

const WeddingPackageOutputSchema = z.object({
  suggestedVendors: z.array(VendorSchema).describe('A list of vendors suggested for the wedding package.'),
  totalEstimatedCost: z.number().describe('The total estimated cost of the wedding package.'),
  packageDescription: z.string().describe('A description of the created package.'),
});
export type WeddingPackageOutput = z.infer<typeof WeddingPackageOutputSchema>;

export async function buildWeddingPackage(input: WeddingPackageInput): Promise<WeddingPackageOutput> {
  return buildWeddingPackageFlow(input);
}

const buildWeddingPackagePrompt = ai.definePrompt({
  name: 'buildWeddingPackagePrompt',
  input: {schema: WeddingPackageInputSchema},
  output: {schema: WeddingPackageOutputSchema},
  prompt: `You are an AI wedding planner that is helping a user plan their wedding.

  Based on the user's preferences, suggest a list of vendors and services that match their requirements. Provide a total estimated cost and a description of the created package.
  Make sure the suggested vendors are near {{{location}}}.

  Wedding Style: {{{weddingStyle}}}
  Budget: {{{budget}}} USD
  Venue Type: {{{venueType}}}
  Guest Count: {{{guestCount}}}
  Additional Preferences: {{{additionalPreferences}}}

  Here is the output schema you must adhere to:
  ${JSON.stringify(WeddingPackageOutputSchema.shape)}`,
});

const buildWeddingPackageFlow = ai.defineFlow(
  {
    name: 'buildWeddingPackageFlow',
    inputSchema: WeddingPackageInputSchema,
    outputSchema: WeddingPackageOutputSchema,
  },
  async input => {
    const {output} = await buildWeddingPackagePrompt(input);
    return output!;
  }
);
