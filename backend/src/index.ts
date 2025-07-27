import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", (_, res) => res.send("API rodando 🚀"));

app.get("/students", async (_, res) => {
  const students = await prisma.student.findMany();
  res.json(students);
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});