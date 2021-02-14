import express from "express";
import { getFigure, getFigures } from '../controllers/figure';
import asyncHandler from 'express-async-handler';
import { rules_getFigureById, rules_getStarFigures } from "../middleware/rules/figures";
import { validate } from "../middleware/validation";

const router = express.Router();

router.get('/star/:figureId', rules_getStarFigures, validate, asyncHandler(getFigures));
router.get('/:figureId', rules_getFigureById, validate, asyncHandler(getFigure));

export default router;