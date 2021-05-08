import express from "express";
import { getCoaches, setCoach } from '../controllers/coaches';
import asyncHandler from 'express-async-handler';

const router = express.Router();

router.get('/', asyncHandler(getCoaches));
router.post('/:coachUsername', asyncHandler(setCoach));

export default router;