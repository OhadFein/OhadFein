import express from "express";
import { getStudents } from '../controllers/students';
import asyncHandler from 'express-async-handler';

const router = express.Router();

router.get('/', asyncHandler(getStudents));

export default router;