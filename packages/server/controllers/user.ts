import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { promisify } from 'util';
import mongoose from "mongoose"
import { ParamsDictionary } from "express-serve-static-core"

import User, { IUser } from '../models/User';
import { sendForgotPasswordEmail, sendResetPasswordEmail, sendVerifyEmail } from '../services/email';
import { Errors } from '../shared/erros';
import { HttpException } from '../shared/exceptions';
import { EnumGender, EnumLanguage } from '../shared/enums';
import { Name } from '../models/User'

const randomBytesAsync = promisify(crypto.randomBytes);

/**
 * POST /login
 * Sign in using email and password.
 */

interface loginRequestBody {
  email: string,
  password: string;
}

export const postLogin = async (req: Request<ParamsDictionary, loginRequestBody, loginRequestBody>, res: Response) => {
  const user = await User.findByCredentials(req.body.email, req.body.password);
  const tokens = await user.generateAuthToken();

  return res.status(200).json({
    success: true,
    message: "Auth succeeded",
    data: tokens
  });
};


/**
 * POST /refreshToken
 * Refresh token.
 */

export const refreshToken = async (req: Request, res: Response) => {
  const tokens = await req.user.generateAuthToken();

  return res.status(200).json({
    success: true,
    message: "Token refreshed successfully",
    data: tokens
  });
};


/**
 * POST /signup
 * Create a new local account.
 */

interface signupRequestBody {
  email: string,
  password: string;
  name: Name;
  birthDate?: Date;
}

export const postSignup = async (req: Request<ParamsDictionary, signupRequestBody, signupRequestBody>, res: Response) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
    profile: {
      name: req.body.name,
      birthDate: {
        date: req.body.birthDate
      }
    }
  });

  await user.save();
  await verifyUserEmail(user);
  const tokens = await user.generateAuthToken();

  res.status(201).json({
    success: true,
    message: "User created",
    data: tokens
  });
};

/**
 * PATCH /account/profile
 * Update profile information.
 */

interface updateProfileRequestBody {
  name: Name;
  birthDate: {
    date: Date
  }
  language: EnumLanguage;
  gender: EnumGender;
  about: string;
}


export const patchUpdateProfile = async (req: Request<ParamsDictionary, updateProfileRequestBody, updateProfileRequestBody>, res: Response) => {
  const user = req.user;

  // TODO: email cannot be changed (?)
  // if (user.email !== req.body.email) user.emailVerified = false;
  // user.email = req.body.email || '';

  user.profile = {
    name: req.body.name || '',
    gender: req.body.gender || '',
    language: req.body.language || '',
    // picture: req.body.picture || '',
    birthDate: {
      date: req.body.birthDate.date
    },
    about: req.body.about || ''
  };

  const savedUser = await user.save();

  res.json({
    success: true,
  });

  return savedUser;
}


/**
 * GET /account/profile
 * Get profile information.
 */

const getMyProfileInfo = async (id: mongoose.Types.ObjectId) => (
  await User.findById(id).select("email profile").exec()
);

export const getProfileInfo = async (req: Request, res: Response) => {
  const userInfo = await getMyProfileInfo(req.user.id);

  return res.json({
    success: true,
    data: userInfo
  });
};

/**
 * PATCH /account/password
 * Update current password.
 */

interface updatePasswordRequestBody {
  password: string;
}

export const patchUpdatePassword = async (req: Request<ParamsDictionary, updatePasswordRequestBody, updatePasswordRequestBody>, res: Response) => {
  const user = req.user;
  user.password = req.body.password;

  const savedUser = await user.save();
  res.json({
    success: true,
    message: "Password has been changed",
  });

  return savedUser;
};


/**
 * GET /reset/:token
 * Reset Password page.
 */
export const getReset = async (req: Request, res: Response) => {
  const user = await User.findOne({ passwordResetToken: req.params.token })
    .where('passwordResetExpires')
    .gt(Date.now())
    .exec();

  if (!user) {
    return res.json({
      success: false,
      errors: [{
        value: req.params.token,
        msg: Errors.NON_EXISTING_USER,
        param: "token",
        location: "params"
      }]
    });
  }
  return res.json({
    success: true
  });
};

/**
 * GET /account/verify/:token
 * Verify email address with an existing token
 */
export const getVerifyEmailToken = async (req: Request, res: Response) => {
  const user = req.user;

  if (user.emailVerified) {
    return res.json({
      success: false,
      errors: [{ msg: Errors.ALREADY_VERIFIED }]
    });
  }

  if (req.params.token !== user.emailVerificationToken) {
    return res.json({
      success: false,
      errors: [{ msg: Errors.TOKEN_MISMATCH }]
    })
  }

  user.emailVerificationToken = '';
  user.emailVerified = true;
  const savedUser = await user.save();

  res.json({
    success: true
  });

  return savedUser;
};

/**
 * GET /account/verify
 * Verify email address
 */
export const getVerifyEmail = async (req: Request, res: Response) => {
  await verifyUserEmail(req.user);
  return res.json({
    success: true
  });
};

const verifyUserEmail = async (user: IUser) => {
  if (user.emailVerified) {
    throw new HttpException(409, Errors.ALREADY_VERIFIED)
  }
  const token = await randomBytesAsync(16).then(buf => buf.toString('hex'));
  // eslint-disable-next-line require-atomic-updates
  user.emailVerificationToken = token;
  await user.save();
  // await sendVerifyEmail(user.email, token);
};

/**
 * POST /reset/:token
 * Process the reset password request.
 */

interface postResetRequestBody {
  password: string;
}

export const postReset = async (req: Request<ParamsDictionary, postResetRequestBody, postResetRequestBody>, res: Response) => {
  const user = await User.findOne({ passwordResetToken: req.params.token })
    .where('passwordResetExpires')
    .gt(Date.now())
    .exec();

  if (!user) {
    return res.json({
      success: false,
      errors: [{
        value: req.params.token,
        msg: Errors.NON_EXISTING_USER,
        param: "token",
        location: "params"
      }]
    });
  }
  user.password = req.body.password;
  user.passwordResetToken = "";
  user.passwordResetExpires = 0;

  await user.save();
  await sendResetPasswordEmail(user.email);
  const tokens = await user.generateAuthToken();

  return res.json({
    success: true,
    data: tokens
  });
};

/**
 * POST /forgot
 * Create a random token, then the send user an email with a reset link.
 */

interface postForgotRequestBody {
  email: string,
}

export const postForgot = async (req: Request<ParamsDictionary, postForgotRequestBody, postForgotRequestBody>, res: Response, next: NextFunction) => {
  try {
    const token = await randomBytesAsync(16).then(buf => buf.toString('hex'));
    const user = await User.findOne({ email: req.body.email }).exec();
    if (!user) {
      // TODO: security issue
      return res.json({
        success: true
      });
    }

    user.passwordResetToken = token;
    user.passwordResetExpires = Date.now() + 3600000; // 1 hour
    await user.save();
    await sendForgotPasswordEmail(user.email, token);

    return res.json({
      success: true
    });
  } catch (error) {
    return next(error);
  }
};
