import { Errors } from "../../shared/erros";
import { param } from 'express-validator';

export const rules_getStarFigures = [
    param("starUsername", Errors.INVALID_USERNAME).isString().notEmpty()
]

export const rules_getFigureById = [
    param("figureId", Errors.INVALID_MONGO_ID).matches("^[0-9a-fA-F]{24}$"),
]