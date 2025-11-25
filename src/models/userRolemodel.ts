import mongoose, { Schema, Document } from "mongoose";

export interface IUserRole {
  userId: mongoose.Types.ObjectId;
  roleId: mongoose.Types.ObjectId;
}

export interface IUserRoleDocument extends IUserRole, Document {}

const UserRoleSchema: Schema<IUserRoleDocument> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    roleId: { type: Schema.Types.ObjectId, ref: "Role", required: true },
  },
  { timestamps: true }
);

export const UserRoleModel = mongoose.model<IUserRoleDocument>(
  "UserRole",
  UserRoleSchema
);
