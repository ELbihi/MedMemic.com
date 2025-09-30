import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// Récupérer un scénario complet
app.get("/scenarios/:id", async (req, res) => {
  const scenarioId = parseInt(req.params.id);
  try {
    const scenario = await prisma.scenario.findUnique({
      where: { id: scenarioId },
      include: {
        phases: {
          include: {
            choices: true,
          },
        },
      },
    });

    if (!scenario) return res.status(404).json({ error: "Scénario non trouvé" });
    res.json(scenario);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
