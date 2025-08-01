import { prisma } from '../config/prisma';
import { NotFoundError, ValidationError, ConflictError } from '../errors/AppError';

interface CreateStudentData {
  name: string;
  email: string;
  cpf: string;
  birthDate: string | Date;
}

interface UpdateStudentData {
  name?: string;
  email?: string;
  cpf?: string;
  birthDate?: string | Date;
}

class StudentService {
  async findAll() {
    return await prisma.student.findMany();
  }

  async findById(id: number) {
    const student = await prisma.student.findUnique({
      where: { id }
    });

    if (!student) {
      throw new NotFoundError('Estudante');
    }

    return student;
  }

  async create(data: CreateStudentData) {
    if (!data.name || !data.email || !data.cpf || !data.birthDate) {
      throw new ValidationError('Nome, email, CPF e data de nascimento são obrigatórios');
    }

    const existingEmail = await prisma.student.findUnique({
      where: { email: data.email }
    });

    if (existingEmail) {
      throw new ConflictError('Este email já está em uso');
    }

    const existingCpf = await prisma.student.findUnique({
      where: { cpf: data.cpf }
    });

    if (existingCpf) {
      throw new ConflictError('Este CPF já está cadastrado');
    }

    return await prisma.student.create({
      data: {
        ...data,
        birthDate: new Date(data.birthDate)
      }
    });
  }

  async update(id: number, data: UpdateStudentData) {
    const existingStudent = await this.findById(id);

    // Verifica email duplicado
    if (data.email && data.email !== existingStudent.email) {
      const emailInUse = await prisma.student.findFirst({
        where: { 
          email: data.email,
          NOT: { id: existingStudent.id }
        }
      });

      if (emailInUse) {
        throw new ConflictError('Este email já está em uso');
      }
    }

    // Verifica CPF duplicado
    if (data.cpf && data.cpf !== existingStudent.cpf) {
      const cpfInUse = await prisma.student.findFirst({
        where: { 
          cpf: data.cpf,
          NOT: { id: existingStudent.id }
        }
      });

      if (cpfInUse) {
        throw new ConflictError('Este CPF já está cadastrado');
      }
    }

    return await prisma.student.update({
      where: { id },
      data: {
        name: data.name || undefined,
        email: data.email || undefined,
        birthDate: data.birthDate ? new Date(data.birthDate) : undefined
      }
    });
  }

  async delete(id: number) {
    await this.findById(id);
    await prisma.student.delete({
      where: { id }
    });
  }
}

export const studentService = new StudentService(); 