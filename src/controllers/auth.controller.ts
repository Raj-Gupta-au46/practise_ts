import { NextFunction, Request, Response } from "express";
import { JwtService, PasswordHashService } from "../services";
import { UserSchema } from "../models";
import { generateSlugName, generateVerificationToken } from "../utils";
import { body, query } from "express-validator";
import {
  Conflict,
  InternalServerError,
  NotFound,
  NotAcceptable,
} from "http-errors";
import { fieldValidateError } from "../helper";
import { tokenVerify } from "../utils/utility";
class AuthController {
  //Register user
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password, confirmPassword } = req.body;

      // validation error checking
      fieldValidateError(req);

      // hashing password
      const hashPassword = await new PasswordHashService().hash(password);

      // if password mismatch
      if (password !== confirmPassword)
        throw new NotFound("Password and confirmPassword does not match");

      //check duplicate user
      const checkDuplicate = await UserSchema.findOne({ email });
      if (checkDuplicate)
        throw new Conflict("user already exists with the same email");

      //generate slugName
      const slugName = generateSlugName(name);
      const { token, verifyToken } = generateVerificationToken();
      const expirationTime = new Date(Date.now() + 15 * 60 * 1000);

      const registerUser = await UserSchema.create({
        name,
        email,
        password: hashPassword,
        // profilePath: profileInfo?.public_id,
        // profileUrl: profileInfo?.url,
        slug: slugName,
        verificationToken: verifyToken,
        verificationTokenExpiresAt: expirationTime,
      });

      if (!registerUser)
        throw new InternalServerError(
          "Something went wrong, user not registered"
        );

      // Verification email sending
      // const verificationLink = `${req.protocol}://${req.get(
      //   "host"
      // )}/api/v1/auth/verify-email?token=${token}`;

      // // sending email
      // await new EmailService().emailSend({
      //   email,
      //   subject: "For Email Verification",
      //   message: `Hi ${name} you register successfully.. In TechSciVerse And Click to the following button to verify your account`,
      //   link: verificationLink,
      // });

      res.json({
        success: true,
        message: "You  Register successfully ",
        data: registerUser,
      });
    } catch (error) {
      next(error);
    }
  }

  // Verify Email
  // async verifyEMail(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { token } = req.query;
  //     if (!token) throw new NotFound("Your verification token not found.");

  //     if (typeof token !== "string")
  //       throw new NotAcceptable("token must be a string");
  //     const verifyToken = tokenVerify(token);

  //     //search for user using verification token
  //     const user = await UserSchema.findOne({
  //       verificationToken: verifyToken,
  //       verificationTokenExpiresAt: { $gt: Date.now() },
  //     });

  //     if (!user)
  //       throw new NotAcceptable(
  //         "Your token may be expire or it may be invalid"
  //       );

  //     user.isVerified = true;
  //     user.verificationToken = undefined;
  //     user.verificationTokenExpiresAt = undefined;
  //     user.save();
  //     res.json({
  //       success: true,
  //       message: "Your Token verify successfully..",
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  //Login User
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      fieldValidateError(req);

      //check user is exist or not
      const isUserExist = await UserSchema.findOne({
        email,
      }).select("+password");

      if (!isUserExist) throw new NotFound("No user found!!");
      console.log(isUserExist?.password);

      // check is verified user or not
      // if (!isUserExist.isVerified)
      //   throw new NotAcceptable("You are not a verified user");

      //check password
      const isPasswordMatch = isUserExist.password
        ? await new PasswordHashService().compare(
            password,
            isUserExist.password
          )
        : undefined;

      if (!isPasswordMatch)
        throw new NotAcceptable("email or password is incorrect!!");

      const credential = JSON.stringify({
        userId: isUserExist.id,
        role: isUserExist.role,
        status: isUserExist.status,
      });

      // generating access token
      const accessToken = await new JwtService().accessTokenGenerator(
        credential
      );

      // generating refresh token
      const refreshToken = await new JwtService().refreshTokenGenerator(
        credential
      );

      // store refresh token inside http only cookie
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days
      });

      res.json({
        success: true,
        accessToken,
        refreshToken,
        message: `${isUserExist.name}You are logged in successfully...`,
      });
    } catch (error) {
      next(error);
    }
  }
}

// --------------------------------------- VALIDATION SECTION ------------------------------------------------- //

export const AuthControllerValidator = {
  register: [
    body("name")
      .not()
      .isEmpty()
      .withMessage("Name is required")
      .isString()
      .withMessage("Name must be a string")
      .isLength({ max: 50 })
      .withMessage("Name must be at most 50 characters long")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long"),
    body("email")
      .not()
      .isEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("provide email is not a valid email address")
      .normalizeEmail()
      .isLength({ max: 50 })
      .withMessage("Email must be at most 50 characters long.")
      .isLength({ min: 3 })
      .withMessage("Email must be at least 3 characters long."),
    body("password")
      .not()
      .isEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long.")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one Capital letter")
      .matches(/\d/)
      .withMessage("Password must contain at least one digit")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("Password must contain at least one special character"),
  ],
  login: [
    body("email")
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("invalid email"),
    body("password").notEmpty().withMessage("password is required"),
  ],
};

export default AuthController;
