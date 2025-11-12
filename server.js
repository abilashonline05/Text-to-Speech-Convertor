// server.js

import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

// Text-to-Speech API route
app.post("/api/tts", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    const apiKey = process.env.VOICERSS_API_KEY;
    const url = `https://api.voicerss.org/?key=${apiKey}&hl=en-us&src=${encodeURIComponent(
      text
    )}&c=MP3`;

    const response = await axios.get(url, { responseType: "arraybuffer" });
    const audioBase64 = Buffer.from(response.data, "binary").toString("base64");
    const audioUrl = `data:audio/mp3;base64,${audioBase64}`;

    res.json({ audioUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate speech" });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
