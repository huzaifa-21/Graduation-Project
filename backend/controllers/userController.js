import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwtGenrator.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const user = await User.findOne({ email });

    const token = generateToken({ email: user.emial, id: user._id });

    res
      .status(201)
      .json({
        success: true,
        data: { email: user.email, id: user._id, name: user.name },
        message: "User added successfully",
        token,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      data: { id: user._id, name: user.name },
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: false, __v: false });
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User is not registered" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Wrong password" });
    }

    const token = generateToken({ email: user.email, id: user._id });

    res.status(200).json({
      success: true,
      data: { email: user.email, id: user._id, name: user.name },
      message:"Logged in successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { registerUser, getUser, getUsers, login };
