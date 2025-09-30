// routes/scenarios.ts
import express from "express";
import { PrismaClient } from "@prisma/client";

import { supabase } from '@/integrations/supabase/client'
export const prisma = new PrismaClient();
const router = express.Router();

// Get all scenarios
router.get("/", async (req, res) => {
  const scenarios = await prisma.scenarios.findMany({
    include: {
      objectifs: true,
      phases: {
        include: {
          constantes: true,
          examens: true,
          traitements: true,
          coordination: true,
        },
      },
      diagnostics: true,
    },
  });

  res.json(scenarios);


});

// Increment usage
router.post("/:id/increment", async (req, res) => {
  const { id } = req.params;
  await prisma.scenarios.update({
    where: { id: Number(id) },
    data: { usage_count: { increment: 1 } },
  });
  res.json({ success: true });
});

export default router;
