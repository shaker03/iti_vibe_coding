require('dotenv').config();

async function testHuggingFace() {
  const token = process.env.HF_TOKEN;
  console.log("Token exists:", !!token);

  const url = "https://router.huggingface.co/v1/chat/completions";
  
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "Qwen/Qwen2.5-7B-Instruct",
        messages: [{ role: "user", content: "Hello" }],
        max_tokens: 100
      })
    });
    
    const data = await response.json();
    console.log("Status:", response.status);
    console.log("Response:", JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

testHuggingFace();
