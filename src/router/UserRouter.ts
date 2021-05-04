import express from "express";
import userController from "../controller/UserController";

export const userRouter = express.Router();

userRouter.post("/signup", userController.signUp);
userRouter.post("/login", userController.logIn);
userRouter.get("/", userController.getAllUsers);
