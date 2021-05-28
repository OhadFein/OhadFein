import express from "express";
import { getStar, getStars } from '../controllers/star';
import asyncHandler from 'express-async-handler';
import { validate } from "../middleware/validation";
import { rules_getStarByUsername } from "../middleware/rules/stars";

const router = express.Router();

router.get('/:starUsername', rules_getStarByUsername, validate, asyncHandler(getStar));
router.get('/', asyncHandler(getStars));

export default router;
