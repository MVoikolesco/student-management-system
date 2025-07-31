-- Criar função para gerar RA
CREATE OR REPLACE FUNCTION generate_student_ra()
RETURNS TRIGGER AS $$
BEGIN
    NEW.ra := 'RA' || LPAD(CAST(NEW.id AS TEXT), 6, '0');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Criar trigger para gerar RA automaticamente
CREATE TRIGGER set_student_ra
    BEFORE INSERT ON "Student"
    FOR EACH ROW
    EXECUTE FUNCTION generate_student_ra();