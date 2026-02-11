import { GoogleGenAI } from "@google/genai";

// NOTE: In a real production app, this call would go to a backend.
// Here we initialize the client with the env key.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const evaluateSpeaking = async (topic: string, transcript: string): Promise<{ score: number; feedback: string }> => {
  if (!process.env.API_KEY) {
    return {
      score: 85,
      feedback: "API Key missing. Simulated feedback: Good job! Your pronunciation seems clear, but try to expand your vocabulary slightly."
    };
  }

  try {
    const prompt = `
      You are an English teacher for Grade 9 students.
      Topic: "${topic}"
      Student Transcript: "${transcript}"
      
      Please evaluate this response.
      1. Give a score out of 100 based on relevance, grammar, and vocabulary appropriate for A2/B1 level.
      2. Provide short, encouraging feedback in English (max 2 sentences).
      
      Format response as JSON: { "score": number, "feedback": "string" }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-latest', // Using the fast model for feedback
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    const result = JSON.parse(text);
    return result;

  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      score: 0,
      feedback: "Could not evaluate at this time. Please try again."
    };
  }
};
