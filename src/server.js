import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = [
  "https://health-enrollment.xyz",
  "https://buyertrend.org",
  "https://monkfish-app-99vcw.ondigitalocean.app",
  "http://localhost:5173", // For local development
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());

app.post("/api/submit-lead", async (req, res) => {
  try {
    const { phone, tcpa_consent } = req.body;

    if (!phone || tcpa_consent !== true) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Store the lead data
    const lead = {
      phone,
      tcpa_consent,
      timestamp: new Date().toISOString(),
    };

    console.log("Lead received:", lead);

    res.json({
      success: true,
      timestamp: lead.timestamp,
    });
  } catch (error) {
    console.error("Lead submission error:", error);
    res.status(500).json({ error: "Failed to process lead" });
  }
});

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, "../dist")));

// Handle React routing, return all requests to React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
