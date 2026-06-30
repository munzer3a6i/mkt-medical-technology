import { Router } from "express";
import multer from "multer";
import path from "path";
import prisma from "../prisma/client.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: "server/uploads/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "eq-" + uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// --- Equipment ---

router.get("/", async (req, res) => {
  try {
    const equipment = await prisma.equipment.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" }
    });
    
    const formatted = equipment.map(e => ({
      ...e,
      specifications: JSON.parse(e.specifications),
      specificationsAr: JSON.parse(e.specificationsAr),
    }));
    
    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", requireAuth, upload.single("image"), async (req, res) => {
  try {
    const { specifications, specificationsAr, ...data } = req.body;
    
    let imageUrl = data.image; // Might be passed as a string url
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }
    
    const item = await prisma.equipment.create({
      data: {
        ...data,
        image: imageUrl,
        specifications: specifications || "[]",
        specificationsAr: specificationsAr || "[]",
      },
      include: { category: true }
    });
    
    res.status(201).json({
      ...item,
      specifications: JSON.parse(item.specifications),
      specificationsAr: JSON.parse(item.specificationsAr),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", requireAuth, upload.single("image"), async (req, res) => {
  try {
    const { specifications, specificationsAr, ...data } = req.body;
    
    let imageUrl = data.image;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }
    
    const item = await prisma.equipment.update({
      where: { id: req.params.id },
      data: {
        ...data,
        ...(imageUrl !== undefined && { image: imageUrl }),
        specifications: specifications || "[]",
        specificationsAr: specificationsAr || "[]",
      },
      include: { category: true }
    });
    
    res.json({
      ...item,
      specifications: JSON.parse(item.specifications),
      specificationsAr: JSON.parse(item.specificationsAr),
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", requireAuth, async (req, res) => {
  try {
    await prisma.equipment.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// --- Categories ---

router.get("/categories", async (req, res) => {
  try {
    const cats = await prisma.equipmentCategory.findMany();
    res.json(cats);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/categories", requireAuth, async (req, res) => {
  try {
    const cat = await prisma.equipmentCategory.create({ data: req.body });
    res.status(201).json(cat);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/categories/:id", requireAuth, async (req, res) => {
  try {
    const cat = await prisma.equipmentCategory.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(cat);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/categories/:id", requireAuth, async (req, res) => {
  try {
    await prisma.equipmentCategory.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
