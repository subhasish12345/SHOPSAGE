// src/ai/flows/predict-delivery-delays.ts
'use server';

/**
 * @fileOverview Predicts delivery delays based on shipment data and suggests optimized routes.
 *
 * - predictDeliveryDelays - A function that handles the prediction of delivery delays.
 * - PredictDeliveryDelaysInput - The input type for the predictDeliveryDelays function.
 * - PredictDeliveryDelaysOutput - The return type for the predictDeliveryDelays function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictDeliveryDelaysInputSchema = z.object({
  shipmentData: z.object({
    orderId: z.string().describe('The ID of the order.'),
    assignedAgent: z.string().describe('The ID of the assigned delivery agent.'),
    currentStatus: z.string().describe('The current status of the shipment (e.g., out for delivery, in transit).'),
    location: z.object({
      latitude: z.number().describe('The latitude of the current location.'),
      longitude: z.number().describe('The longitude of the current location.'),
    }).describe('The current location of the shipment.'),
    deliveryAddress: z.string().describe('The full delivery address.'),
    estimatedDeliveryTime: z.string().describe('The estimated delivery time in ISO format.'),
  }).describe('Shipment data including order ID, agent ID, status, location, delivery address and estimated delivery time.'),
  historicalWeatherData: z.string().describe('Historical weather data for the delivery area.'),
  trafficConditions: z.string().describe('Current traffic conditions in the delivery area.'),
});
export type PredictDeliveryDelaysInput = z.infer<typeof PredictDeliveryDelaysInputSchema>;

const PredictDeliveryDelaysOutputSchema = z.object({
  isDelayed: z.boolean().describe('Whether the delivery is predicted to be delayed.'),
  delayReason: z.string().describe('The reason for the predicted delay.'),
  optimizedRoute: z.string().describe('A description of the optimized route to avoid the delay.'),
  newEstimatedDeliveryTime: z.string().describe('The new estimated delivery time if the optimized route is taken.'),
});
export type PredictDeliveryDelaysOutput = z.infer<typeof PredictDeliveryDelaysOutputSchema>;

export async function predictDeliveryDelays(input: PredictDeliveryDelaysInput): Promise<PredictDeliveryDelaysOutput> {
  return predictDeliveryDelaysFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictDeliveryDelaysPrompt',
  input: {schema: PredictDeliveryDelaysInputSchema},
  output: {schema: PredictDeliveryDelaysOutputSchema},
  prompt: `You are an expert logistics analyst specializing in predicting delivery delays and optimizing routes.

You will use the provided shipment data, historical weather data, and current traffic conditions to predict if a delivery will be delayed.

If a delay is predicted, you will provide a reason for the delay and an optimized route to avoid the delay, along with a new estimated delivery time.

Shipment Data:
{{json shipmentData}}

Historical Weather Data:
{{historicalWeatherData}}

Current Traffic Conditions:
{{trafficConditions}}

Consider the following factors when predicting delays:
- Distance to the delivery location
- Weather conditions (rain, snow, fog, etc.)
- Traffic congestion
- Road closures

Respond with JSON that contains the fields isDelayed, delayReason, optimizedRoute, and newEstimatedDeliveryTime.
`,
});

const predictDeliveryDelaysFlow = ai.defineFlow(
  {
    name: 'predictDeliveryDelaysFlow',
    inputSchema: PredictDeliveryDelaysInputSchema,
    outputSchema: PredictDeliveryDelaysOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
