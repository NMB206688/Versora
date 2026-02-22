'use server';
/**
 * @fileOverview An AI-powered research hub that allows students to search for academic sources using natural language queries and automatically generate citations.
 *
 * - aiResearchAndCitationGenerator - A function that handles the academic source search and citation generation process.
 * - AiResearchAndCitationGeneratorInput - The input type for the aiResearchAndCitationGenerator function.
 * - AiResearchAndCitationGeneratorOutput - The return type for the aiResearchAndCitationGenerator function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiResearchAndCitationGeneratorInputSchema = z.object({
  query: z.string().describe('The natural language query for academic sources.'),
});
export type AiResearchAndCitationGeneratorInput = z.infer<typeof AiResearchAndCitationGeneratorInputSchema>;

const SourceSchema = z.object({
  title: z.string().describe('The title of the academic paper or book.'),
  authors: z.array(z.string()).describe('A list of authors for the source.'),
  publication: z.string().describe('The journal, conference, or book publisher.'),
  year: z.number().describe('The publication year of the source.'),
  citation: z.string().describe('The full citation of the source in APA 7th edition format.'),
});

const AiResearchAndCitationGeneratorOutputSchema = z.object({
  sources: z.array(SourceSchema).describe('A list of suggested academic sources with their APA 7th edition citations.'),
});
export type AiResearchAndCitationGeneratorOutput = z.infer<typeof AiResearchAndCitationGeneratorOutputSchema>;

export async function aiResearchAndCitationGenerator(
  input: AiResearchAndCitationGeneratorInput
): Promise<AiResearchAndCitationGeneratorOutput> {
  return aiResearchAndCitationGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiResearchAndCitationGeneratorPrompt',
  input: {schema: AiResearchAndCitationGeneratorInputSchema},
  output: {schema: AiResearchAndCitationGeneratorOutputSchema},
  prompt: `You are an expert academic researcher and librarian. Your task is to respond to a student's natural language query by suggesting relevant academic sources and providing their full citation in APA 7th edition format.

For each suggested source, include:
- The title of the academic paper or book.
- The authors.
- The publication (journal, conference, or book publisher).
- The publication year.
- The full citation of the source in APA 7th edition format.

If you cannot find highly relevant academic sources, state that clearly in the response or provide a relevant message within the structure.

Student Query: {{{query}}}`,
});

const aiResearchAndCitationGeneratorFlow = ai.defineFlow(
  {
    name: 'aiResearchAndCitationGeneratorFlow',
    inputSchema: AiResearchAndCitationGeneratorInputSchema,
    outputSchema: AiResearchAndCitationGeneratorOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
