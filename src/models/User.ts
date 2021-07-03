import mongoose from "mongoose";

export type UserDocument = mongoose.Document & {
    username: String,
    hash: String,
    salt: String,
    password: String,
};

const UserSchema = new mongoose.Schema<UserDocument>(
  {
    username: {type: String, unique: true},
    hash: String,
    salt: String,
    password: String,
  },
  {
    collection: "users",
  }
);

const model = mongoose.model<UserDocument>("User", UserSchema);

export default model;
