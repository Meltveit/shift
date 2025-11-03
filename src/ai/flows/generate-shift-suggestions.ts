'use server';

/**
 * @fileOverview Generates shift plan suggestions based on employee availability, demand, and labor costs.
 *
 * - generateShiftSuggestions - A function that generates shift plan suggestions.
 * - GenerateShiftSuggestionsInput - The input type for the generateShiftSuggestions function.
 * - GenerateShiftSuggestionsOutput - The return type for the generateShiftSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateShiftSuggestionsInputSchema = z.object({
  employeeAvailability: z
    .string()
    .describe('Employee availability information as a JSON string.'),
  demandForecast: z.string().describe('Demand forecast data as a JSON string.'),
  laborCosts: z.string().describe('Labor costs data as a JSON string.'),
  optimizationPreferences: z
    .string()
    .optional()
    .describe('Optional optimization preferences as a JSON string.'),
});
export type GenerateShiftSuggestionsInput = z.infer<
  typeof GenerateShiftSuggestionsInputSchema
>;

const GenerateShiftSuggestionsOutputSchema = z.object({
  shiftSuggestions: z
    .string()
    .describe('Generated shift plan suggestions as a JSON string.'),
});
export type GenerateShiftSuggestionsOutput = z.infer<
  typeof GenerateShiftSuggestionsOutputSchema
>;

export async function generateShiftSuggestions(
  input: GenerateShiftSuggestionsInput
): Promise<GenerateShiftSuggestionsOutput> {
  return generateShiftSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateShiftSuggestionsPrompt',
  input: {schema: GenerateShiftSuggestionsInputSchema},
  output: {schema: GenerateShiftSuggestionsOutputSchema},
  prompt: `You are an AI assistant designed to generate shift plan suggestions based on employee availability, demand, and labor costs.

  Employee Availability: {{{employeeAvailability}}}
  Demand Forecast: {{{demandForecast}}}
  Labor Costs: {{{laborCosts}}}
  Optimization Preferences: {{{optimizationPreferences}}}

  Generate a shift plan suggestion in JSON format.
  Ensure that the shift plan meets the demand forecast, respects employee availability, and minimizes labor costs.
  Return only valid JSON.`,
});

const generateShiftSuggestionsFlow = ai.defineFlow(
  {
    name: 'generateShiftSuggestionsFlow',
    inputSchema: GenerateShiftSuggestionsInputSchema,
    outputSchema: GenerateShiftSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
