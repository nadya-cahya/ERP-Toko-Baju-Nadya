import { GoogleGenAI, Type } from "@google/genai";
import { SalesMetric, InventoryItem } from "../types";

// Initialize Gemini
// Note: In a real environment, ensure process.env.API_KEY is set.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateExecutiveBrief = async (
  salesData: SalesMetric[],
  inventoryWarnings: InventoryItem[]
): Promise<{ summary: string; recommendation: string }> => {
  if (!process.env.API_KEY) {
    console.warn("API Key missing for Gemini Service");
    return {
        summary: "AI service unavailable. Please configure API Key.",
        recommendation: "Manual review required."
    };
  }

  const model = "gemini-2.5-flash";
  
  // Prepare context data
  const salesContext = JSON.stringify(salesData.slice(-7)); // Last 7 records
  const stockContext = JSON.stringify(inventoryWarnings.map(i => ({ sku: i.sku, name: i.styleName, stock: i.stockLevel })));

  const prompt = `
    Act as a Chief Financial Officer and Retail Supply Chain Expert for a luxury sports apparel brand.
    Analyze the following recent sales data and low-stock inventory alerts.
    
    Sales Context (Last 7 entries): ${salesContext}
    Low Stock Alerts: ${stockContext}

    Provide a response in JSON format with two fields:
    1. "summary": A concise executive summary of performance (max 2 sentences).
    2. "recommendation": A specific strategic action regarding restocking or promotions (max 2 sentences).
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                summary: { type: Type.STRING },
                recommendation: { type: Type.STRING }
            }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    return {
      summary: "Unable to generate real-time analysis due to service interruption.",
      recommendation: "Proceed with standard restocking protocols based on historical averages."
    };
  }
};

export const suggestGLCode = async (productName: string, category: string, cost: number): Promise<string> => {
    if (!process.env.API_KEY) return "5000-GENERIC";

    const prompt = `
      You are an automated accounting assistant for a retail ERP.
      Suggest a General Ledger (GL) code for the following item purchase:
      Item: ${productName}
      Category: ${category}
      Cost: $${cost}

      Standard Codes:
      - 5001: COGS - Apparel
      - 5002: COGS - Footwear
      - 5003: COGS - Accessories
      - 6000: Operational Expense

      Return ONLY the 4-digit code.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        return response.text?.trim() || "5000";
    } catch (e) {
        return "5000";
    }
}
