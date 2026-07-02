require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const { HfInference } = require("@huggingface/inference");

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Hugging Face Inference
const hf = new HfInference(process.env.HF_TOKEN);

app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, "public")));

// Chat API Route
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages format. Expected an array." });
    }

    const response = await hf.chatCompletion({
      model: "Qwen/Qwen2.5-7B-Instruct",
      messages: messages,
      max_tokens: 1024,
      temperature: 0.7,
    });

    res.json(response);
  } catch (error) {
    console.error("Error communicating with Hugging Face:", error);
    res.status(500).json({ 
      error: "An error occurred while fetching the response.",
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
