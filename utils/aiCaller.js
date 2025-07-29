

// utils/callAI.js
import dotenv from 'dotenv';
dotenv.config();

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function callAI(userPrompt) {
  try {
    
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // ✅ Step 1: Updated prompt format as per your instructions
    const finalPrompt = `
You are a helpful UI component generator.

The user asked: "${userPrompt}"

Your response must strictly follow this JSON format:

{
  "content": "Explain or introduce the component.",
  "component": {
    "componentName": "YourComponentName",
    "jsx": "<JSX code here>",
    "css": "CSS code here or empty string"
  }
}

Rules:
- Return only JSON. No extra text.
- Ensure the JSX is valid.
- If CSS is not needed, keep it as an empty string.

- Generate a complete React component. Use only Tailwind CSS and basic React. Include:

- import React from "react";

- A const or function component definition

- A default export: export default LoginForm;
- Do not use require, exports, or any external packages.
- strictly use vanil CSS do not use any library or framework


`;

    // ✅ Step 2: Call Gemini
    const result = await model.generateContent(finalPrompt);
    const response = await result.response;
    const text = response.text();

    // ✅ Step 3: Extract JSON safely
    let parsed;
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response.");
      }
    } catch (err) {
      console.warn('Failed to parse AI response as JSON:', err);
      parsed = {
        content: text,
        component: null,
      };
    }

    return parsed;

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Failed to get AI response');
  }
}
