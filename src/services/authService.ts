import User from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthService {
  async register(userData: any) {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = new User({
      ...userData,
      password: hashedPassword,
    });

    return await user.save();
  }

  async login(email: string, password: string) {
    try {
      // Convert email to lowercase to match registration
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) throw new Error("Invalid credentials");

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error("Invalid credentials");

      // Generate JWT token
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET || "secret",
        { expiresIn: "1h" }
      );

      return { user, token };
    } catch (error: any) {
      throw new Error(error.message || "Login failed");
    }
  }

  async logout() {
    return { message: "Logout successful" };
  }
}

// Helper functions for controllers
const authService = new AuthService();

export async function registerUser(body: any) {
  const user = await authService.register(body);

  const accessToken = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "1h" }
  );

  const refreshToken = null; // optional

  return { user, accessToken, refreshToken };
}

export async function loginUser(body: any) {
  const { user, token } = await authService.login(body.email, body.password);

  const accessToken = token;
  const refreshToken = null; // optional

  return { user, accessToken, refreshToken };
}
