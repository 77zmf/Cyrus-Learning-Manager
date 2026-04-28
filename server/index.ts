import cors from "cors";
import express from "express";
import { loadConfig } from "./config";
import { openDatabase } from "./db";
import { registerRoutes } from "./routes";

const config = loadConfig();
const db = openDatabase();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (origin.startsWith("http://localhost:")) return callback(null, true);
      if (origin.startsWith("http://127.0.0.1:")) return callback(null, true);
      if (origin === "https://77zmf.github.io") return callback(null, true);
      return callback(new Error(`Origin not allowed: ${origin}`));
    }
  })
);

registerRoutes(app, config, db);

app.listen(config.port, "127.0.0.1", () => {
  console.log(`Cyrus local sync service listening on http://127.0.0.1:${config.port}`);
});
