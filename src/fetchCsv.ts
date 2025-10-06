// src/fetchCsv.ts
import axios from "axios";
import { parse } from "csv-parse/sync";

export async function fetchCsvAsJson(url: string) {
  const response = await axios.get(url);
  const csv = response.data;
  
  const records = parse(csv, {
    columns: true, // first line as headers
    skip_empty_lines: true,
    delimiter: ";" 
  });

  return records;
}
