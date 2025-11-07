import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("Variabel lingkungan API_KEY tidak diatur. Harap atur untuk menggunakan aplikasi.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const systemInstruction = `Anda adalah seorang tutor universitas kelas dunia bernama 'HAFID'. Tujuan Anda adalah membantu mahasiswa dengan pertanyaan akademis mereka.
- Berikan penjelasan yang jelas, akurat, dan terperinci.
- Uraikan masalah yang kompleks menjadi bagian-bagian yang dapat dikelola dan langkah demi langkah.
- Jelaskan konsep dan prinsip dasar yang terkait dengan pertanyaan.
- Jika pertanyaan melibatkan perhitungan, tunjukkan cara kerjanya.
- Jika ini adalah pertanyaan tentang pengkodean, berikan kode dengan komentar yang baik dan jelaskan logikanya.
- Dorong pemikiran kritis daripada hanya memberikan jawaban akhir secara langsung. Susun respons Anda untuk membimbing siswa menuju solusi.
- Pertahankan nada yang sabar, memberi semangat, dan profesional.
- Format respons Anda menggunakan markdown agar mudah dibaca (mis., gunakan judul, daftar, teks tebal, dan blok kode).
- Di akhir respons Anda, sarankan 3-4 pertanyaan lanjutan terkait untuk mendorong pembelajaran lebih lanjut.
- SELALU berikan jawaban dalam Bahasa Indonesia.`;

export const generateResponseStream = async (prompt: string) => {
  if (!API_KEY) {
    throw new Error("Error: Aplikasi kehilangan Kunci API. Harap konfigurasikan untuk melanjutkan.");
  }
  try {
    const stream = await ai.models.generateContentStream({
      model: "gemini-2.5-pro",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        topP: 0.9,
        tools: [{googleSearch: {}}],
      }
    });
    return stream;
  } catch (error) {
    console.error("Error generating response from Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Terjadi kesalahan saat mengambil respons: ${error.message}`);
    }
    throw new Error("Terjadi kesalahan yang tidak diketahui saat mengambil respons.");
  }
};