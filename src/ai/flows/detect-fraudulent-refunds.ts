// src/ai/flows/detect-fraudulent-refunds.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for detecting fraudulent refund requests.
 *
 * It exports:
 * - `detectFraudulentRefund` - An asynchronous function that takes `DetectFraudulentRefundInput` and returns a `DetectFraudulentRefundOutput`.
 * - `DetectFraudulentRefundInput` - The input type for the `detectFraudulentRefund` function.
 * - `DetectFraudulentRefundOutput` - The output type for the `detectFraudulentRefund` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectFraudulentRefundInputSchema = z.object({
  orderValue: z.number().describe('The total value of the order.'),
  frequencyOfReturns: z
    .number()
    .describe(
      'The number of returns the user has made in the past, as a proxy for abuse of the return system.'
    ),
  ipGeoMismatch: z
    .boolean()
    .describe(
      'Whether the IP address of the refund request matches the geo-location of the shipping address.'
    ),
  rapidAddressChanges: z
    .boolean()
    .describe(
      'Whether the user has made multiple address changes in a short period, which could be a sign of fraud.'
    ),
  deviceFingerprinting: z
    .string()
    .describe(
      'A string representing the device fingerprint of the user, which can be used to identify suspicious devices. This should include as many details as possible to be useful.'
    ),
});

export type DetectFraudulentRefundInput = z.infer<typeof DetectFraudulentRefundInputSchema>;

const DetectFraudulentRefundOutputSchema = z.object({
  isFraudulent: z
    .boolean()
    .describe(
      'A boolean indicating whether the refund request is likely to be fraudulent.  True if fraudulent, false otherwise.'
    ),
  fraudExplanation: z
    .string()
    .describe(
      'A detailed explanation of why the refund request is considered fraudulent, describing each factor contributing to the determination.'
    ),
});

export type DetectFraudulentRefundOutput = z.infer<typeof DetectFraudulentRefundOutputSchema>;

export async function detectFraudulentRefund(
  input: DetectFraudulentRefundInput
): Promise<DetectFraudulentRefundOutput> {
  return detectFraudulentRefundFlow(input);
}

const detectFraudulentRefundPrompt = ai.definePrompt({
  name: 'detectFraudulentRefundPrompt',
  input: {schema: DetectFraudulentRefundInputSchema},
  output: {schema: DetectFraudulentRefundOutputSchema},
  prompt: `You are a fraud detection expert specializing in identifying fraudulent refund requests for an e-commerce platform.

  Based on the information provided about the refund request, determine if it is likely to be fraudulent. Provide a detailed explanation supporting your determination, describing each factor contributing to the determination.

  Order Value: {{orderValue}}
  Return Frequency: {{frequencyOfReturns}}
  IP/Geo Mismatch: {{ipGeoMismatch}}
  Rapid Address Changes: {{rapidAddressChanges}}
  Device Fingerprint: {{deviceFingerprinting}}

  Consider these factors when determining if the refund is fraudulent:
  - High order value combined with frequent returns
  - Mismatch between IP address and shipping address
  - Rapid changes to the shipping address
  - Suspicious device fingerprints, such as spoofed or emulated devices
  - Any combination of the above factors
  - Overall likelihood of fraud based on the provided information
  - Any other relevant information
  `,
});

const detectFraudulentRefundFlow = ai.defineFlow(
  {
    name: 'detectFraudulentRefundFlow',
    inputSchema: DetectFraudulentRefundInputSchema,
    outputSchema: DetectFraudulentRefundOutputSchema,
  },
  async input => {
    const {output} = await detectFraudulentRefundPrompt(input);
    return output!;
  }
);
