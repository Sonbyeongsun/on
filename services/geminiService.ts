import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY is not defined. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function fetchEncouragingQuote(emotion: string): Promise<string> {
  const prompt = `너는 지친 학생들을 위로하고 격려해주는 따뜻한 멘토야. 학업 때문에 '${emotion}' 감정을 느끼는 학생에게 힘이 될 수 있는 짧고 진심 어린 명언이나 응원 문구를 한두 문장으로 생성해줘. 반말로 친근하게 말해줘.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0.8,
        topP: 0.95,
        topK: 40,
      }
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error fetching encouraging quote:", error);
    throw new Error("응원 문구를 가져오는 데 실패했습니다. 잠시 후 다시 시도해주세요.");
  }
}