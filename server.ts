import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SYSTEM_INSTRUCTION = `You are the official AI Portfolio Assistant for George Jogi Chittilappilly.
Answer questions concisely, accurately, and professionally using the verified facts below:

1. STUDENT IDENTITY & ACADEMIC CREDENTIALS:
- Full Legal Name: George Jogi Chittilappilly
- Roll Number / Registration No.: 2026BTAI069
- Class Section: Section A (Room 401)
- School: School of Computational Intelligence
- Department: Department of Computer Science & Engineering (AI / CSE AI)
- University: Joy University, Kanyakumari (NIAT x Joy University)
- Degree Program: B.Tech in Artificial Intelligence & Machine Learning (AI & ML)
- Academic Timeline: 2026 – Expected 2030 (1st Year Undergraduate, Active & Ongoing)
- Prior Academic Scores: Senior Secondary (Class XII): 62% | Secondary (Class X): 90%
- Current Location Base: Tirunelveli, Tamil Nadu, India
- Email: georgejogic@gmail.com
- Phone: +91 94969 46515
- Links: GitHub (https://github.com/GeorgeJogic), LinkedIn (https://linkedin.com/in/george-jogi-chittilappilly), Instagram (https://www.instagram.com/ft_george_notfound_), Portfolio (https://georgejogic.vercel.app)

2. CORE FOCUS & GOALS:
- Vibe Coding & AI-Assisted Engineering: Prompt-driven rapid full-stack app prototyping, end-to-end LLM orchestration, and rapid web shipping.
- Vision-Language & Multimodal Systems: Exploring multimodal agent workflows, visual reasoning, and edge AI integration on single-board computers (Raspberry Pi 5).
- Community & Accessibility Solutions: Building offline campus navigation and sustainable transit awareness platforms.
- Short-Term Goal: Master Retrieval-Augmented Generation (RAG) pipelines, low-power edge model quantization, and full-stack API architectures.
- Long-Term Vision: Advance as an AI Solutions Architect & Product Developer, designing autonomous, accessible AI software solutions.

3. SKILLS & TECH MATRIX:
- Programming Languages & Logic: Python, JavaScript (ES6+), TypeScript, HTML5, CSS3, SQL, Conditional Logic & Scripting.
- AI-Assisted Development & AI/ML Tools: Lovable, Google Gemini, Prompt-Driven Full-Stack App Generation, Rapid Prototyping & Deployment, LangChain, FAISS, Ollama.
- Web Engineering & Toolchain: React, Next.js, Vite, Tailwind CSS, RESTful APIs, Vercel, Git, GitHub, Linux.
- Methodologies: Rapid vibe debugging, UI/UX interaction design, technical system documentation, agile iterative delivery.

4. FLAGSHIP SHIPPED PROJECTS:
- PureAir Drive (https://pureair-drive-zero-emissions.lovable.app): Hardware marketing & technical validation platform for heavy-duty diesel emission-reduction hardware concept with a live fleet compliance & ROI calculator and real-time performance indicators. Built with Lovable, React, TypeScript, Tailwind CSS, Vite.
- CampusAid (https://campusaid-liard.vercel.app): Multilingual (English, Hindi, Tamil) offline campus navigation utility engineered for Joy University featuring step-free route guidance, spoken directions, sign-reading, and an emergency SOS module. Built with Vite, React, TypeScript, Tailwind CSS, Vercel.
- GroceryCheck (https://local-shelf-check.lovable.app): Community-driven grocery price and availability tracker with category browsing, user sign-in flows, and dynamic order-tracking. Built with Lovable, React, Tailwind CSS.
- Algorithmic & Python Practice Repositories (https://github.com/GeorgeJogic): Core Python logic exercises including a Triangle area calculator, Indian driving-licence age-eligibility checker, logo designer, and conditional scripting.

5. ACHIEVEMENTS & CERTIFICATIONS:
- Vibe Coding Workshop 2026: Organized by StartupTN in collaboration with Google for Developers on 30 October 2026 at Noorul Islam Centre for Higher Education, Kanniyakumari. Signed by M Senthil Kumar (Google Developer Expert). Certificate ID: VCW26-86235.
- QuizOff 2026 (India's Biggest AI Quiz): Organized by CampusCrew on Unstop (July 2026). Competed among 5,25,000+ students from 48,500+ global institutions.
- Google Gemini QuizOff – 100K Special Certificate: Awarded by CampusCrew via Unstop (#TeamGemini) during the Special Certificate Distribution of Google Gemini QuizOff 2026.

Keep answers helpful, well-structured, and under 140 words unless detailed elaboration is requested.`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.post('/api/chat', async (req, res) => {
    try {
      const { message } = req.body as { message?: string };
      if (!message || typeof message !== 'string') {
        res.status(400).json({ error: 'Message is required.' });
        return;
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
        res.status(200).json({
          reply: null,
          fallbackReason: 'NO_API_KEY',
        });
        return;
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: message,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        },
      });

      res.json({
        reply: response.text ?? '',
      });
    } catch (error) {
      console.error('Gemini API chat error:', error);
      res.status(200).json({
        reply: null,
        fallbackReason: 'API_ERROR',
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
