import { Request, Response } from "express";
import * as authService from "../services/authService";

export const register = async (req: Request, res: Response) => {
  try {
    const { user, accessToken } = await authService.registerUser(req.body);
    res.json({ message: "Register successful", user, accessToken });
  } catch (err) {
    res
      .status(400)
      .json({ message: err instanceof Error ? err.message : "Error" });
  }
};
export const login = async (req: Request, res: Response) => {
  try {
    const { user, accessToken } = await authService.loginUser(req.body);
    res.json({
      message: "Login successful",
      user,
      accessToken,
    });
  } catch (err) {
    res
      .status(400)
      .json({ message: err instanceof Error ? err.message : "Error" });
  }
};

export const logout = (req: Request, res: Response) => {
  res.json({ message: "Logged out" });
};
