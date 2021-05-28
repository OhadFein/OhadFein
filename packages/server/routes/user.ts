import express from "express";
import { postLogin, postSignup, getReset, postReset, postForgot, refreshToken, getGeneralInfo } from '../controllers/user';
import { checkAuth, checkRefreshToken } from '../middleware/checkAuth';
import asyncHandler from 'express-async-handler';
import { validate } from "../middleware/validation";
import { rules_login, rules_getResetToken, rules_postResetToken, rules_signup, rules_forgot, rules_refreshToken } from "../middleware/rules/users";

const router = express.Router();

router.post('/login', rules_login, validate, asyncHandler(postLogin));
router.post('/signup', rules_signup, validate, asyncHandler(postSignup));
router.get('/reset/:token', rules_getResetToken, validate, asyncHandler(getReset));
router.post('/reset/:token', rules_postResetToken, validate, asyncHandler(postReset));
router.post('/forgot', rules_forgot, validate, asyncHandler(postForgot));
router.post("/refreshToken/:refresh_token", rules_refreshToken, validate, checkRefreshToken, asyncHandler(refreshToken));

router.get('/', checkAuth, asyncHandler(getGeneralInfo));


// get notifcations and my role request

export default router;
