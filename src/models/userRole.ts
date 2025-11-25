import { Schema, model, Document } from "mongoose";

export interface IUserRole extends Document {
  user_id: Schema.Types.ObjectId;
  role_id: Schema.Types.ObjectId;
}

const userRoleSchema = new Schema<IUserRole>(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    role_id: { type: Schema.Types.ObjectId, ref: "Role", required: true },
  },
  { timestamps: true }
);

userRoleSchema.index({ user_id: 1, role_id: 1 }, { unique: true });

export const UserRoleModel = model<IUserRole>("UserRole", userRoleSchema);
