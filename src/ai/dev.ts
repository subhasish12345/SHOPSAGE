import { config } from 'dotenv';
config();

import '@/ai/flows/detect-fraudulent-refunds.ts';
import '@/ai/flows/provide-smart-product-recommendations.ts';
import '@/ai/flows/suggest-campaign-optimizations.ts';
import '@/ai/flows/generate-product-descriptions.ts';
import '@/ai/flows/predict-delivery-delays.ts';