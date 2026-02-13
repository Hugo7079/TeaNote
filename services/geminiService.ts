import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize only if key is present to avoid immediate errors, though usage will be guarded.
const ai = new GoogleGenAI({ apiKey });

export async function searchDrinkMenu(brandName: string, query?: string): Promise<string[]> {
  if (!apiKey) {
    console.warn("No API Key provided for Gemini.");
    return ["請設定 API Key 以使用 AI 菜單搜尋功能"];
  }

  const prompt = query 
    ? `請問台灣飲料店「${brandName}」的「${query}」相關品項有哪些？請列出3-5個最相關的飲料名稱。只回傳飲料名稱清單，不要有其他描述。`
    : `請列出台灣飲料店「${brandName}」目前最熱門或推薦的 8 款飲料名稱。請確保資訊是真實存在的菜單。只回傳飲料名稱清單，以條列式呈現，不要有編號。`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }], // Use grounding to get real recent data
      }
    });

    const text = response.text || '';
    
    // Simple parsing to extract lines that look like drink names
    const lines = text.split('\n')
      .map(line => line.replace(/^[\*\-\d\.]+\s*/, '').trim()) // Remove bullets/numbers
      .filter(line => line.length > 0 && !line.startsWith('http') && !line.includes('source'));

    return lines;

  } catch (error) {
    console.error("Gemini Search Error:", error);
    return [];
  }
}

export async function suggestCustomization(brandName: string, drinkName: string): Promise<string> {
   if (!apiKey) return "";

   const prompt = `對於台灣飲料店「${brandName}」的「${drinkName}」，網友或老饕通常推薦什麼甜度冰塊比例最好喝？請用一句簡短的話回答（例如：推薦微糖少冰）。`;

   try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      }
    });
    return response.text || "";
   } catch (error) {
    return "";
   }
}
