import { Router } from "express";
import multer from "multer";
import path from "path";
import prisma from "../prisma/client.js";
import { requireAuth } from "../middleware/auth.js";
import { put } from "@vercel/blob";

const router = Router();

// Multer setup for memory storage (for Vercel Blob)
const storage = multer.memoryStorage();
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
    
    delete data.id;
    delete data.createdAt;
    delete data.updatedAt;
    delete data.category;
    if (data.categoryId === "") data.categoryId = null;

    let imageUrl = data.image; // Might be passed as a string url
    if (req.file) {
      try {
        const blob = await put(`equipment/${req.file.originalname}`, req.file.buffer, { access: "public" });
        imageUrl = blob.url;
      } catch (err) {
        console.error("Blob error:", err);
      }
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
    
    delete data.id;
    delete data.createdAt;
    delete data.updatedAt;
    delete data.category;
    if (data.categoryId === "") data.categoryId = null;

    let imageUrl = data.image;
    if (req.file) {
      try {
        const blob = await put(`equipment/${req.file.originalname}`, req.file.buffer, { access: "public" });
        imageUrl = blob.url;
      } catch (err) {
        console.error("Blob error:", err);
      }
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
    console.error("PUT equipment error:", error);
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
