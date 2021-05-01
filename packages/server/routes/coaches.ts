import express from "express";
import { getCoaches } from '../controllers/coaches';
import asyncHandler from 'express-async-handler';

const router = express.Router();

router.get('/', asyncHandler(getCoaches));

export default router;