import { Errors } from "../../shared/erros";
import { param } from 'express-validator';

export const rules_getStarByUsername = [
    param("starUsername", Errors.INVALID_USERNAME).isString().notEmpty(),
]