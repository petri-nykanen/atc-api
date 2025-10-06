// src/index.ts
import express, { Request, Response } from "express";
import { fetchCsvAsJson } from "./fetchCsv";

const app = express();
const PORT = 3000;

let cachedData: unknown[] = [];

const CSV_URL = "https://fimea.fi/documents/147152901/159465988/atc.txt/4f929a39-d6e6-4e85-835f-762993c5a87f?t=1758616780855" // Replace with your actual URL

app.get("/refresh", async (req : Request, res : Response) => {
  try {
    cachedData = await fetchCsvAsJson(CSV_URL);
    res.json({ message: "Data refreshed", count: cachedData.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch CSV" });
  }
});

app.get("/data", (req, res) => {
  if (!cachedData.length) {
    return res.status(400).json({ error: "Data not loaded yet. Hit /refresh first." });
  }
  res.json(cachedData);
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
