import { User } from "../models/user.models.js";

const registerUser = async (req, res) => {
  try {
    const { user_email, user_id, user_location, user_info, user_password } =
      req.body;

    const existingUser = await User.findOne({ user_email });
    if (existingUser) {
      return res.status(409).send("email already presant");
    }
    const createUser = await User.create({
      user_email,
      user_id,
      user_location,
      user_info,
      user_password,
    });
    res.status(201).json({
      message: "User created Successfully",
      token: await createUser.generateToken(),
      userId: createUser._id.toString(),
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { user_email, user_password } = req.body;
    const userExist = await User.findOne({ user_email });
    if (!userExist) {
      return res.status(400).json({
        message: "Invalide Credentials",
      });
    }
    const user = await userExist.comparePassword(user_password);
    if (user) {
      res.status(200).json({
        msg: "Login Successfuk",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export { registerUser, loginUser };
