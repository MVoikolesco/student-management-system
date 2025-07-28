import { Request, Response } from 'express';
import { studentService } from '../services/student.service';
import { controllerWrapper } from '../utils/controllerWrapper';

export const getStudents = controllerWrapper(async (req: Request, res: Response) => {
  const students = await studentService.findAll();
  res.json(students);
});

export const getStudentById = controllerWrapper(async (req: Request, res: Response) => {
  const { id } = req.params;
  const student = await studentService.findById(Number(id));
  res.json(student);
});

export const createStudent = controllerWrapper(async (req: Request, res: Response) => {
  const student = await studentService.create(req.body);
  res.status(201).json(student);
});

export const updateStudent = controllerWrapper(async (req: Request, res: Response) => {
  const { id } = req.params;
  const student = await studentService.update(Number(id), req.body);
  res.json(student);
});

export const deleteStudent = controllerWrapper(async (req: Request, res: Response) => {
  const { id } = req.params;
  await studentService.delete(Number(id));
  res.status(204).send();
});
