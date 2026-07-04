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

// Upload route — accepts base64-encoded file data via JSON
app.post("/api/upload", async (req, res) => {
  try {
    const { filename, data } = req.body;
    if (!filename || !data) {
      return res.status(400).json({ error: "filename and data are required" });
    }

    // data is a base64 data URL like "data:image/png;base64,iVBOR..."
    const base64Data = data.includes(",") ? data.split(",")[1] : data;
    const buffer = Buffer.from(base64Data, "base64");

    const { put } = await import("@vercel/blob");
    const blob = await put(filename, buffer, { access: "public" });
    return res.json(blob);
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

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

export default app;
