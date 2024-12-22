import express from "express";
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
  const fullUrl = !custom
    ? `${process.env.API_URL}?url=${url}`
    : `${process.env.API_URL}?url=${url}&custom=${custom}`;

  try {
    const result = await fetch(fullUrl);

    const data = await result.json();

    console.log(data);

    res.send(data.data);
  } catch (error) {
    console.log(error);
  }
});

app.get("/*", (req, res) => {
  res.sendStatus(404);
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
