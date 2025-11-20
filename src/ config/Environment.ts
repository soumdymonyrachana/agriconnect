import dotenv from "dotenv";

dotenv.config();

const environment = {
  PORT: process.env.PORT || 3000,
  MONGODB_URI:
    process.env.MONGODB_URI ||
    "mongodb+srv://Rachana:290304%4012@cluster0.k9hxugk.mongodb.net/Agri-connect",
  JWT_SECRET: process.env.JWT_SECRET || "your-secret-key",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",
  NODE_ENV: process.env.NODE_ENV || "development",
};

export default environment;
