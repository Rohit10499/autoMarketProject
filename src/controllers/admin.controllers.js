import { Admin } from "../models/admin.models.js";

const registerAdmin = async (req, res) => {
  try {
    const { admin_id, admin_password } = req.body;
    const existingAdmin = await Admin.findOne({ admin_id });
    if (existingAdmin) {
      return res.status(409).send("this id is already register");
    }

    const createAdmin = await Admin.create({
      admin_id,
      admin_password,
    });
    res.status(201).json({
      message: "Admin created Successfully",
      token: await createAdmin.generateToken(),
      adminId: createAdmin._id.toString(),
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server error",
    });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { admin_id, admin_password } = req.body;
    const adminExist = await Admin.findOne({ admin_id });
    if (!adminExist) {
      return res.status(400).json({
        message: "Invalide Credentials",
      });
    }
    const admin = await adminExist.comparePassword(admin_password);
    if (admin) {
      res.status(200).json({
        message: "Login Success",
        token: await adminExist.generateToken(),
        adminId: adminExist._id.toString(),
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export { registerAdmin, loginAdmin };
