import express from "express";
import {
  createUser,
  login,
  logout,
} from "../controller/userController.js";
import { getAccessToken } from "../controller/tokenController.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

//  Register user
router.post("/register", createUser);

//  Login user
router.post("/login", login);

//  Logout user
router.delete("/logout", logout);

//  Get new access token (refresh flow)
router.get("/token", getAccessToken);

//  Protected route example (gunakan ini di routes notes)
router.get("/protected", verifyToken, (req, res) => {
  res.status(200).json({ message: "Access granted", user: req.user });
});

export default router;
