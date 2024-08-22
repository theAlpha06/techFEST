import { check } from "express-validator";
import Express from "express";
import {
  signUp,
  signIn,
  changePassword,
  verify,
  verifyUser,
  forgotPassword,
  resetPassword,
  updatePassword,
} from "../controllers/auth.js";

const router = Express.Router();

router.post(
  "/sign-up",
  [
    check("name", "Name is required").trim(),
    check("email", "Email is required").trim().isEmail().normalizeEmail(),
    check("password", "Password should be at least 3 chars").isLength({
      min: 3,
    }),
  ],
  signUp
);

router.post(
  "/sign-in",
  [
    check("email", "Email is required").trim().isEmail(),
    check("password", "Password field is required").isLength({
      min: 3,
    }),
  ],
  signIn
);

router.post(
  "/change-password",
  [
    check("newPassword", "New Password is required"),
    check("email", "email is required").isEmail(),
  ],
  changePassword
);

router.post("/verify", [check("email", "email is required").isEmail()], verify);

router.get("/verifyUser/:token", verifyUser);
router.post("/forgot-password", forgotPassword);
router.get("/reset-password/:id/:token", resetPassword);
router.post("/updatePassword", updatePassword);

export default router;
