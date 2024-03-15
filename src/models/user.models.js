import mongoose from "mongoose";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    user_email: {
      type: String,
      required: true,
      unique: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    user_location: {
      type: String,
      required: true,
    },
    user_info: {
      type: mongoose.Schema.Types.Mixed,
    },
    user_password: {
      type: String,
      required: true,
    },
    vehicle_info: [
      { type: mongoose.Schema.Types.ObjectId, ref: "SoldVehicles" },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("user_password")) {
    next();
  }
  try {
    const saltRound = 10;
    const hash_password = await bcrypt.hash(user.user_password, saltRound);
    user.user_password = hash_password;
  } catch (error) {
    next(error);
  }
});

userSchema.methods.generateToken = async function () {
  try {
    // console.log("This", this);
    return jwt.sign(
      {
        userId: this._id.toString(),
        user_email: this.user_email,
      },
      process.env.JWT_SECERET_KEY,
      {
        expiresIn: "10d",
      }
    );
  } catch (error) {
    console.log(error);
  }
};
userSchema.methods.comparePassword = async function (password) {
  try {
    return bcrypt.compare(password, this.user_password);
  } catch (error) {
    console.log("invalide credincal", error);
  }
};
export const User = mongoose.model("User", userSchema);
