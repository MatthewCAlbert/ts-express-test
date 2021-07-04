import mongoose from "mongoose";

export type UserDocument = mongoose.Document & {
    username: String,
    hash: String,
    salt: String,
    password: String,
    createdAt: Date,
    updatedAt: Date,
};

const UserSchema = new mongoose.Schema<UserDocument>(
  {
    username: {type: String, unique: true},
    hash: String,
    salt: String,
    password: String
  },
  {
    timestamps: true,
    collection: "users",
  }
);

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;
