import { Router } from "express";
import prisma from "../prisma/client.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// --- Services ---

router.get("/", async (req, res) => {
  try {
    const services = await prisma.service.findMany({
      orderBy: { sortOrder: "asc" },
      include: { complianceRows: true }
    });
    
    // Parse JSON strings back to arrays
    const formatted = services.map(s => ({
      ...s,
      keyProjects: JSON.parse(s.keyProjects),
      keyProjectsAr: JSON.parse(s.keyProjectsAr),
      certifications: JSON.parse(s.certifications),
    }));
    
    res.json(formatted);
  } catch (error) {
    console.error("GET /services error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", requireAuth, async (req, res) => {
  try {
    const { keyProjects, keyProjectsAr, certifications, complianceRows, ...data } = req.body;
    
    const service = await prisma.service.create({
      data: {
        ...data,
        keyProjects: JSON.stringify(keyProjects || []),
        keyProjectsAr: JSON.stringify(keyProjectsAr || []),
        certifications: JSON.stringify(certifications || []),
      }
    });

    res.status(201).json(service);
  } catch (error) {
    console.error("POST /services error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", requireAuth, async (req, res) => {
  try {
    const { keyProjects, keyProjectsAr, certifications, complianceRows, ...data } = req.body;
    
    const service = await prisma.service.update({
      where: { id: req.params.id },
      data: {
        ...data,
        keyProjects: JSON.stringify(keyProjects || []),
        keyProjectsAr: JSON.stringify(keyProjectsAr || []),
        certifications: JSON.stringify(certifications || []),
      }
    });

    res.json(service);
  } catch (error) {
    console.error("PUT /services error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", requireAuth, async (req, res) => {
  try {
    await prisma.service.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    console.error("DELETE /services error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// --- Compliance Rows ---

router.post("/:serviceId/compliance", requireAuth, async (req, res) => {
  try {
    const row = await prisma.complianceRow.create({
      data: {
        ...req.body,
        serviceId: req.params.serviceId
      }
    });
    res.status(201).json(row);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/compliance/:id", requireAuth, async (req, res) => {
  try {
    const row = await prisma.complianceRow.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(row);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/compliance/:id", requireAuth, async (req, res) => {
  try {
    await prisma.complianceRow.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
