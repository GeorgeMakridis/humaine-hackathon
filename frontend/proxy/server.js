import express from "express";

const app = express();
app.use(express.json());

const XR_API_BASE_URL = process.env.XR_API_BASE_URL ?? "https://chat-api.xr50.eu";
const XR_API_TOKEN = process.env.XR_API_TOKEN ?? "";
const PORT = Number(process.env.PORT ?? 3001);

app.post("/api/chat", async (req, res) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (XR_API_TOKEN) {
      headers.Authorization = `Bearer ${XR_API_TOKEN}`;
    }

    const upstream = await fetch(`${XR_API_BASE_URL}/api/chat`, {
      method: "POST",
      headers,
      body: JSON.stringify(req.body ?? {}),
    });

    const text = await upstream.text();
    res.status(upstream.status).send(text);
  } catch {
    res.status(502).json({ message: "Proxy failed to reach upstream chat API." });
  }
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Proxy listening on ${PORT}`);
});
