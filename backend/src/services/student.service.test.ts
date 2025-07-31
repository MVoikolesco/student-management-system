import { studentService } from './student.service'
import { prismaMock } from '../tests/setup'
import { ConflictError, NotFoundError } from '../errors/AppError'

describe('StudentService', () => {
  const mockStudent = {
    id: 1,
    name: 'Test Student',
    email: 'test@example.com',
    cpf: '123.456.789-00',
    ra: 'RA000001',
    birthDate: new Date('2000-01-01'),
    createdAt: new Date(),
    updatedAt: new Date()
  }

  describe('findAll', () => {
    it('should return all students', async () => {
      prismaMock.student.findMany.mockResolvedValue([mockStudent])
      const result = await studentService.findAll()
      expect(result).toEqual([mockStudent])
    })
  })

  describe('findById', () => {
    it('should return student if found', async () => {
      prismaMock.student.findUnique.mockResolvedValue(mockStudent)
      const result = await studentService.findById(1)
      expect(result).toEqual(mockStudent)
    })

    it('should throw NotFoundError if student not found', async () => {
      prismaMock.student.findUnique.mockResolvedValue(null)
      await expect(studentService.findById(1)).rejects.toThrow(NotFoundError)
    })
  })

  describe('create', () => {
    const createData = {
      name: 'New Student',
      email: 'new@example.com',
      cpf: '987.654.321-00',
      birthDate: '2000-01-01'
    }

    it('should create student if data is valid', async () => {
      prismaMock.student.findUnique.mockResolvedValue(null)
      prismaMock.student.create.mockResolvedValue({
        ...mockStudent,
        ...createData,
        birthDate: new Date(createData.birthDate)
      })

      const result = await studentService.create(createData)
      expect(result.name).toBe(createData.name)
      expect(result.email).toBe(createData.email)
      expect(result.cpf).toBe(createData.cpf)
    })

    it('should throw ConflictError if email exists', async () => {
      prismaMock.student.findFirst.mockResolvedValue(mockStudent)
      await expect(studentService.create(createData)).rejects.toThrow(ConflictError)
    })

    it('should throw ConflictError if CPF exists', async () => {
      prismaMock.student.findFirst.mockResolvedValue(mockStudent)
      await expect(studentService.create(createData)).rejects.toThrow(ConflictError)
    })
  })

  describe('update', () => {
    const updateData = {
      name: 'Updated Name',
      email: 'updated@example.com'
    }

    it('should update student if data is valid', async () => {
      prismaMock.student.findUnique.mockResolvedValue(mockStudent)
      prismaMock.student.findFirst.mockResolvedValue(null)
      prismaMock.student.update.mockResolvedValue({
        ...mockStudent,
        ...updateData
      })

      const result = await studentService.update(1, updateData)
      expect(result.name).toBe(updateData.name)
      expect(result.email).toBe(updateData.email)
    })

    it('should throw NotFoundError if student not found', async () => {
      prismaMock.student.findUnique.mockResolvedValue(null)
      await expect(studentService.update(1, updateData)).rejects.toThrow(NotFoundError)
    })
  })

  describe('delete', () => {
    it('should delete student if exists', async () => {
      prismaMock.student.findUnique.mockResolvedValue(mockStudent)
      await studentService.delete(1)
      expect(prismaMock.student.delete).toHaveBeenCalledWith({ where: { id: 1 } })
    })

    it('should throw NotFoundError if student not found', async () => {
      prismaMock.student.findUnique.mockResolvedValue(null)
      await expect(studentService.delete(1)).rejects.toThrow(NotFoundError)
    })
  })
})