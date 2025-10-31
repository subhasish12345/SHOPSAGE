'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting campaign optimizations to the marketing team.
 *
 * The flow uses AI to analyze campaign performance and suggest improvements, such as optimal discounts.
 *
 * @interface SuggestCampaignOptimizationsInput - Defines the input schema for the campaign optimization flow.
 * @interface SuggestCampaignOptimizationsOutput - Defines the output schema for the campaign optimization flow.
 * @function suggestCampaignOptimizations - The main function to trigger the campaign optimization flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestCampaignOptimizationsInputSchema = z.object({
  campaignPerformanceData: z
    .string()
    .describe('Campaign performance data including metrics like views, clicks, and conversions.'),
  currentDiscounts: z
    .string()
    .describe('A description of the discounts currently used in the campaign.'),
});
export type SuggestCampaignOptimizationsInput = z.infer<typeof SuggestCampaignOptimizationsInputSchema>;

const SuggestCampaignOptimizationsOutputSchema = z.object({
  suggestedDiscounts: z
    .string()
    .describe('AI-suggested discounts to optimize campaign performance.'),
  rationale: z
    .string()
    .describe('Explanation of why the suggested discounts are expected to improve performance.'),
});
export type SuggestCampaignOptimizationsOutput = z.infer<typeof SuggestCampaignOptimizationsOutputSchema>;

export async function suggestCampaignOptimizations(
  input: SuggestCampaignOptimizationsInput
): Promise<SuggestCampaignOptimizationsOutput> {
  return suggestCampaignOptimizationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestCampaignOptimizationsPrompt',
  input: {schema: SuggestCampaignOptimizationsInputSchema},
  output: {schema: SuggestCampaignOptimizationsOutputSchema},
  prompt: `You are an AI marketing expert tasked with optimizing e-commerce campaigns.

  Analyze the provided campaign performance data and current discounts, then suggest improved discounts.
  Explain the rationale behind your suggestions.

  Campaign Performance Data: {{{campaignPerformanceData}}}
  Current Discounts: {{{currentDiscounts}}}

  Provide the output in the following format:
  {
    "suggestedDiscounts": "...",
    "rationale": "..."
  }`,
});

const suggestCampaignOptimizationsFlow = ai.defineFlow(
  {
    name: 'suggestCampaignOptimizationsFlow',
    inputSchema: SuggestCampaignOptimizationsInputSchema,
    outputSchema: SuggestCampaignOptimizationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

