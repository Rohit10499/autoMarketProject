import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const adminSchema = new mongoose.Schema(
  {
    admin_id: {
      type: String,
      required: true,
      unique: true,
    },
    admin_password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

adminSchema.pre("save", async function (next) {
  const admin = this;
  console.log("admin model this data", this);
  if (!admin.isModified("admin_password")) {
    next();
  }
  try {
    const hash_password = await bcrypt.hash(admin.admin_password, 10);
    admin.admin_password = hash_password;
  } catch (error) {
    next(error);
  }
});

adminSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        adminId: this._id.toString(),
        admin_id: this.admin_id,
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
adminSchema.methods.comparePassword = async function (password) {
  try {
    return bcrypt.compare(password, this.admin_password);
  } catch (error) {
    console.log(error);
  }
};
export const Admin = mongoose.model("Admin", adminSchema);
