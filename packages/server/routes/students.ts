import express from "express";
import { getStudents, getStudentPractices, addStudentPracticeNote } from '../controllers/students';
import asyncHandler from 'express-async-handler';

const router = express.Router();

router.get('/', asyncHandler(getStudents));
router.get('/:studentId', asyncHandler(getStudentPractices)); // TODO: add validator
router.post('/:studentId/note/:practiceId', asyncHandler(addStudentPracticeNote)); // TODO: add validator


export default router;