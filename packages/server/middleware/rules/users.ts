import User from "../../models/User";
import { Errors } from "../../shared/erros";
import { body, param } from 'express-validator';

const isMailAlreadyExists = async (email: string) => {
    const doesEailExists = await User.exists({ email: email });
    if (doesEailExists)
        return Promise.reject(Errors.MAIL_ALREADY_EXISTS);
}


// const isMailNotExists = async (email: string) => {
//     const doesEailExists = await User.exists({ email: email });
//     if (doesEailExists)
//         return Promise.reject(Errors.MAIL_NOT_EXISTS);
// }

export const rules_signup = [
    body('email')
        .isEmail()
        .withMessage(Errors.INVALID_EMAIL)
        .custom(isMailAlreadyExists)
        .normalizeEmail(),
    body("password", Errors.INVALID_PASSWORD).isLength({ min: 6 }),
    body('confirmPassword')
        .custom((value: string, { req }: any) => {
            if (value !== req.body.password) {
                throw new Error(Errors.PASSWORD_MISMATCH);
            }
            return true;
        }),
    body("username", Errors.INVALID_USERNAME).notEmpty(), // TODO:
    body("given_name", Errors.INVALID_GIVEN_NAME).notEmpty(), // TODO:
    body("family_name", Errors.INVALID_FAMILY_NAME).notEmpty(), // TODO:
]

export const rules_login = [
    body('email')
        .isEmail()
        .withMessage(Errors.INVALID_EMAIL)
        .normalizeEmail(),
    body("password", Errors.INVALID_PASSWORD).notEmpty(),
]

export const rules_postResetToken = [
    param("token", Errors.INVALID_VERIFY_TOKEN).isHexadecimal(),
    body("password", Errors.INVALID_PASSWORD).isLength({ min: 6 }),
    body('confirmPassword')
        .custom((value: string, { req }: any) => {
            if (value !== req.body.password) {
                throw new Error(Errors.PASSWORD_MISMATCH);
            }
            return true;
        })
]

export const rules_getResetToken = [
    param("token", Errors.INVALID_VERIFY_TOKEN).isHexadecimal(),
]

export const rules_forgot = [
    body('email')
        .isEmail()
        .withMessage(Errors.INVALID_EMAIL)
        // .custom(isMailNotExists) // TODO: should be enabled? security issue
        .normalizeEmail(),
]

export const rules_refreshToken = [
    param("refresh_token", Errors.INVALID_REFRESH_TOKEN).notEmpty(), // TODO:
]