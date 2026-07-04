import { Router } from "express";
import prisma from "../prisma/client.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// --- Partners ---

router.get("/", async (req, res) => {
  try {
    const partners = await prisma.partner.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" }
    });
    res.json(partners);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", requireAuth, async (req, res) => {
  try {
    const data = req.body;
    
    delete data.id;
    delete data.createdAt;
    delete data.updatedAt;
    delete data.category;
    if (data.categoryId === "") data.categoryId = null;
    
    const partner = await prisma.partner.create({
      data,
      include: { category: true }
    });
    
    res.status(201).json(partner);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", requireAuth, async (req, res) => {
  try {
    const data = req.body;
    
    delete data.id;
    delete data.createdAt;
    delete data.updatedAt;
    delete data.category;
    if (data.categoryId === "") data.categoryId = null;
    
    const partner = await prisma.partner.update({
      where: { id: req.params.id },
      data,
      include: { category: true }
    });
    
    res.json(partner);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", requireAuth, async (req, res) => {
  try {
    await prisma.partner.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// --- Categories ---

router.get("/categories", async (req, res) => {
  try {
    const cats = await prisma.partnerCategory.findMany();
    res.json(cats);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/categories", requireAuth, async (req, res) => {
  try {
    const cat = await prisma.partnerCategory.create({ data: req.body });
    res.status(201).json(cat);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/categories/:id", requireAuth, async (req, res) => {
  try {
    const cat = await prisma.partnerCategory.update({
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
    await prisma.partnerCategory.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
