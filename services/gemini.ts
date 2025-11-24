import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Job, UserProfile, Availability } from "../types";

// Helper to create the AI client
const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found. Please set process.env.API_KEY");
  }
  return new GoogleGenAI({ apiKey });
};

export const fetchMatchingJobs = async (
  profile: UserProfile,
  availability: Availability
): Promise<Job[]> => {
  const ai = getAiClient();

  // Define the schema for structured JSON output
  const jobSchema: Schema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        id: { type: Type.STRING },
        title: { type: Type.STRING },
        description: { type: Type.STRING },
        budget: { type: Type.STRING },
        urgencyLevel: { type: Type.STRING, enum: ["alta", "media", "baixa"] },
        skillsRequired: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
        location: { type: Type.STRING },
        companyName: { type: Type.STRING },
        type: { type: Type.STRING, enum: ["substituicao", "projeto", "pico_demanda"] },
      },
      required: [
        "id",
        "title",
        "description",
        "budget",
        "urgencyLevel",
        "skillsRequired",
        "location",
        "companyName",
        "type",
      ],
    },
  };

  const prompt = `
    Você é um motor de matching para um aplicativo de freelancing focado em urgência.
    Gere 4 a 6 oportunidades de trabalho fictícias mas realistas baseadas no perfil do profissional abaixo.
    
    Perfil do Usuário:
    - Nome: ${profile.name}
    - Especialidade: ${profile.headline}
    - Habilidades: ${profile.skills.join(", ")}
    - Nível: ${profile.experienceLevel}
    
    Disponibilidade:
    - Disponível Hoje? ${availability.availableToday ? "Sim" : "Não"}
    - Disponível Fim de Semana? ${availability.weekends ? "Sim" : "Não"}
    
    Foque estritamente em vagas de alta urgência, como:
    - Substituição de funcionário doente
    - Cobertura de licença
    - Pico de demanda repentino (Black Friday, lançamento de produto)
    - Prazo apertado
    
    Gere dados variados de orçamento (em BRL) e nomes de empresas fictícias.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: jobSchema,
        temperature: 0.7,
      },
    });

    const jsonText = response.text;
    if (!jsonText) return [];

    const jobs = JSON.parse(jsonText) as Job[];
    
    // Add realistic randomness or IDs if missing
    return jobs.map((job, index) => ({
      ...job,
      id: job.id || `job-${Date.now()}-${index}`,
    }));
  } catch (error) {
    console.error("Erro ao buscar vagas com Gemini:", error);
    return [];
  }
};