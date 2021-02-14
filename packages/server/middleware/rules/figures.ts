import { Errors } from "../../shared/erros";
import { param } from 'express-validator';

export const rules_getStarFigures = [
    param("starSlug", Errors.INVALID_SLUG).not().isEmpty(),
]

export const rules_getFigureById = [
    param("figureId", Errors.INVALID_MONGO_ID).matches("^[0-9a-fA-F]{24}$"),
]