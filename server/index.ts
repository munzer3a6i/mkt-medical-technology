import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import servicesRoutes from "./routes/services.js";
import equipmentRoutes from "./routes/equipment.js";
import partnersRoutes from "./routes/partners.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Serve static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Upload route — accepts base64-encoded file data via JSON and saves locally
app.post("/api/upload", async (req, res) => {
  try {
    const { filename, data } = req.body;
    if (!filename || !data) {
      return res.status(400).json({ error: "filename and data are required" });
    }

    // data is a base64 data URL like "data:image/png;base64,iVBOR..."
    const base64Data = data.includes(",") ? data.split(",")[1] : data;
    const buffer = Buffer.from(base64Data, "base64");

    const fs = await import("fs/promises");
    const filePath = path.join(__dirname, "uploads", filename);
    
    // Ensure the directory exists (e.g. for "equipment" or "partners" subfolders)
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, buffer);
    
    // Return the local URL
    return res.json({ url: `/uploads/${filename}` });
  } catch (error: any) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: "Upload failed", message: error.message });
  }
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/api/partners", partnersRoutes);

// Serve the React frontend static files
app.use(express.static(path.join(__dirname, "../dist")));

// Catch-all route to serve the React app for non-API requests (Client-side routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

// Start the server (Always listen, required for GoDaddy Node.js Hosting)
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;
