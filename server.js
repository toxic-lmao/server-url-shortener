import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: "GET,POST",
    credentials: true,
  })
);

app.post("/shorten", async (req, res) => {
  const { url, custom } = req.body;

  try {
    const result = await axios.post("https://ulvis.net/API/write/get", null, {
      params: { url, custom },
    });

    console.log(result.data);

    res.send(result.data.data);
  } catch (error) {
    console.log(error);

    res.sendStatus(500).json({ error: "API Busy" });
  }
});

app.get("/*", (req, res) => {
  res.sendStatus(404);
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
