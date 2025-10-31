// Provide smart product recommendations based on user history.

'use server';

/**
 * @fileOverview An AI agent for providing smart product recommendations based on user history.
 *
 * - provideSmartProductRecommendations - A function that provides product recommendations.
 * - SmartProductRecommendationsInput - The input type for the provideSmartProductRecommendations function.
 * - SmartProductRecommendationsOutput - The return type for the provideSmartProductRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartProductRecommendationsInputSchema = z.object({
  userId: z.string().describe('The ID of the user for whom to provide recommendations.'),
  browsingHistory: z.array(z.string()).optional().describe('The user history of browsed product IDs.'),
  purchaseHistory: z.array(z.string()).optional().describe('The user history of purchased product IDs.'),
});
export type SmartProductRecommendationsInput = z.infer<typeof SmartProductRecommendationsInputSchema>;

const SmartProductRecommendationsOutputSchema = z.object({
  recommendedProductIds: z.array(z.string()).describe('The list of recommended product IDs.'),
});
export type SmartProductRecommendationsOutput = z.infer<typeof SmartProductRecommendationsOutputSchema>;

export async function provideSmartProductRecommendations(
  input: SmartProductRecommendationsInput
): Promise<SmartProductRecommendationsOutput> {
  return provideSmartProductRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartProductRecommendationsPrompt',
  input: {schema: SmartProductRecommendationsInputSchema},
  output: {schema: SmartProductRecommendationsOutputSchema},
  prompt: `You are an e-commerce recommendation expert.
  Based on the user's browsing history: {{{browsingHistory}}} and purchase history: {{{purchaseHistory}}},
  recommend a list of product IDs that the user might be interested in.  The user ID is: {{{userId}}}.
  Return only a JSON array of product IDs.  Do not include any other text.  Use the schema descriptions to inform your output.
  `,
});

const provideSmartProductRecommendationsFlow = ai.defineFlow(
  {
    name: 'provideSmartProductRecommendationsFlow',
    inputSchema: SmartProductRecommendationsInputSchema,
    outputSchema: SmartProductRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
