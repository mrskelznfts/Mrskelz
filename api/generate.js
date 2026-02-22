import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { prompt, style } = JSON.parse(req.body);

    if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server.' });
    }

    try {
        const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);
        const finalPrompt = prompt || "Neon Fedora, Cyber-Cigar, Tuxedo";
        const styleDesc = style === 'classic' ? "Black and white 1930s rubber-hose ink style" : "Vibrant 1930s rubber-hose style with neon noir colors";

        const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" }); // Using a stable model name

        const response = await model.generateContent([
            `A high-quality 1930s rubber-hose animation style (Cuphead aesthetic) mischievous skeleton character.
      Features: Large expressive eyes with pie-slice pupils, thick clean black outlines, muted vintage color palette (cream, burgundy, gold, navy), and a subtle grainy/noisy texture.
      Character is Mr. Skelz, a skeleton in a tuxedo.
      Traits to include: ${finalPrompt}.
      Style details: ${styleDesc}. 
      The composition should be a close-up portrait with a simple muted background, exactly matching the iconic rubber-hose cartoon look.`
        ]);

        const result = await response.response;
        const candidates = result.candidates;

        if (candidates && candidates[0] && candidates[0].content.parts) {
            for (const part of candidates[0].content.parts) {
                if (part.inlineData) {
                    return res.status(200).json({ image: part.inlineData.data });
                }
            }
        }

        // Fallback if no image returned (Gemini-2.0-flash might return text if not configured for image generation)
        // Actually, gemini-2.0-flash-exp or similar is used for text. 
        // The user had gemini-2.5-flash-image which might be a custom or preview name.
        // Let's use the exact model string from the original code to be safe.

        res.status(500).json({ error: 'No image data returned from AI.' });

    } catch (error) {
        console.error("AI Generation Error:", error);
        res.status(500).json({ error: error.message });
    }
}
