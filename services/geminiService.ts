import { GoogleGenAI } from "@google/genai";
import { VerificationCase } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateRiskAssessment = async (caseData: VerificationCase): Promise<string> => {
  try {
    const prompt = `
      Act as an expert KYC/AML compliance officer for WhisperrID.
      Analyze the following identity verification case data and provide a concise risk assessment report.
      
      User: ${caseData.user.firstName} ${caseData.user.lastName} (${caseData.user.email})
      Country: ${caseData.country}
      Document: ${caseData.documentType} (${caseData.documentNumber})
      Risk Score (0-100, 100 is safe): ${caseData.riskScore}
      Current Status: ${caseData.status}

      Please provide:
      1. A summary of potential red flags (if any).
      2. A recommendation (Approve, Reject, or Request More Info).
      3. A brief explanation of the decision logic based on common compliance patterns.
      
      Keep the tone professional and the output formatted as a clean Markdown list or paragraphs.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // Speed over deep thought for this UI interaction
      }
    });

    return response.text || "Unable to generate assessment at this time.";
  } catch (error) {
    console.error("AI Service Error:", error);
    return "AI Risk Assessment service is currently unavailable. Please review manually.";
  }
};

export const chatWithSupport = async (message: string, context: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `System Context: You are "WhisperrBot", an AI assistant for the WhisperrID dashboard. 
            User Context: ${context}
            
            User Message: ${message}
            
            Respond helpfully and briefly.`,
        });
        return response.text || "I didn't catch that.";
    } catch (e) {
        return "I'm having trouble connecting right now.";
    }
}
