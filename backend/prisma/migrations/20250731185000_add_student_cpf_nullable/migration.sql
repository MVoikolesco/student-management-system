-- Primeiro adiciona a coluna como nullable
ALTER TABLE "Student" ADD COLUMN "cpf" TEXT;

-- Adiciona o índice único
CREATE UNIQUE INDEX "Student_cpf_key" ON "Student"("cpf");

-- Altera a coluna para não aceitar nulos após a migração dos dados existentes
ALTER TABLE "Student" ALTER COLUMN "cpf" SET NOT NULL;