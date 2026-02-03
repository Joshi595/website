import { GoogleGenAI, Type } from "@google/genai";

// Placeholder image for fallback scenarios
const PLACEHOLDER_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%232b4036" width="800" height="600"/%3E%3Ctext x="50%25" y="50%25" font-size="32" fill="%23f1f5f2" text-anchor="middle" dy=".3em"%3E🌿 Bild konnte nicht geladen werden%3C/text%3E%3C/svg%3E';

// Polishing content using Gemini 3 Flash for efficient text refinement.
export const polishContent = async (originalText: string, context: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `As a professional copywriting expert for high-end gardening and landscaping businesses, refine the following text. 
    Context: ${context}
    Original Text: "${originalText}"
    
    Requirements:
    - Keep it concise (maximum 2-3 sentences).
    - Use elegant, evocative, and professional language.
    - Focus on peace, nature, and expertise.
    - Return ONLY the refined text without any quotes or explanations.`,
  });

  // Correctly access the .text property instead of calling a method.
  return response.text || originalText;
};

// Generate high-quality service images using gemini-2.5-flash-image.
export const generateServiceImage = async (serviceName: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  let customPrompt = `A high-end, luxury professional photograph of ${serviceName} in an elegant European garden. Cinematic lighting, photorealistic, lush greenery.`;
  
  const nameLower = serviceName.toLowerCase();
  // Fixing the incomplete logic and ensuring a return value.
  if (nameLower.includes("hecke")) {
    customPrompt = "Showcase a masterpiece of topiary art: a perfectly manicured, symmetrical boxwood hedge with razor-sharp edges. The texture is dense and lush emerald green. The lighting is golden hour, casting long, elegant shadows across a pristine stone walkway in a high-end European estate.";
  } else if (nameLower.includes("laub")) {
    customPrompt = "Focus on a clean, pristine gravel or stone garden path, completely free of leaves, surrounded by lush green shrubs.";
  } else if (nameLower.includes("hochdruck") || nameLower.includes("steine") || nameLower.includes("reinigung")) {
    customPrompt = "A professional high-pressure cleaning of a luxury natural stone terrace. Water sparkling, stone texture restored to perfection. High-end outdoor furniture in background.";
  } else if (nameLower.includes("beet") || nameLower.includes("unkraut")) {
    customPrompt = "Exquisite flower bed maintenance. Freshly mulched soil, vibrant healthy perennials, architectural plant arrangement in a luxury residential garden.";
  } else if (nameLower.includes("rasen")) {
    customPrompt = "A perfect, thick emerald green lawn with professional stripes. Viewed from a low angle. High-end estate garden background, soft sunlight.";
  } else if (nameLower.includes("winter")) {
    customPrompt = "Professional snow removal from a luxury house driveway. Clean, safe path in a winter wonderland setting, evening light.";
  }

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: { parts: [{ text: customPrompt }] },
  });

  // Iterate through parts to find the image part
  if (response.candidates?.[0]?.content?.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
  }
  
  return PLACEHOLDER_IMAGE; 
};

// Generate three new luxury background images for the Hero section.
export const generateHeroBackgrounds = async (): Promise<string[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompts = [
    "Ultra-luxury modern garden with a minimalist swimming pool and architectural plants at twilight. 8k, cinematic lighting.",
    "Classic European mansion garden with symmetrical lawns and a grand stone fountain. Golden hour photography.",
    "Contemporary designer terrace with lush vertical gardens and high-end outdoor furniture. Bright, airy atmosphere."
  ];

  const results = await Promise.all(prompts.map(async (prompt) => {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: prompt }] },
        config: { imageConfig: { aspectRatio: "16:9" } }
      });
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          }
        }
      }
    } catch (e) {
      console.error('Failed to generate background image:', e);
    }
    return PLACEHOLDER_IMAGE;
  }));

  return results;
};

// Generate detailed descriptions and benefits for services in JSON format.
export const generateServiceDetails = async (serviceName: string): Promise<{ detailedDescription: string; benefits: string[] }> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `As an expert horticulturalist for "Mein Gärtla", provide a detailed description and key benefits for: "${serviceName}". Focus on luxury, precision, and sustainability. Return in German.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          detailedDescription: {
            type: Type.STRING,
            description: "A professional 3-sentence description.",
          },
          benefits: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of 4 key benefits.",
          },
        },
        required: ["detailedDescription", "benefits"],
      },
    },
  });

  try {
    const text = response.text || '{}';
    return JSON.parse(text) as { detailedDescription: string; benefits: string[] };
  } catch (e) {
    return {
      detailedDescription: "Wir bieten professionelle Lösungen für Ihren Garten mit höchstem Qualitätsanspruch.",
      benefits: ["Präzision", "Langlebigkeit", "Ästhetik", "Nachhaltigkeit"]
    };
  }
};

// Generate a custom garden visualization for the Design Studio.
export const generateCustomGardenImage = async (prompt: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: { 
      parts: [{ text: `A high-end, luxury garden architectural visualization based on this description: ${prompt}. Photorealistic, 8k resolution, cinematic lighting.` }] 
    },
    config: { imageConfig: { aspectRatio: "16:9" } }
  });

  if (response.candidates?.[0]?.content?.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
  }

  return PLACEHOLDER_IMAGE;
};