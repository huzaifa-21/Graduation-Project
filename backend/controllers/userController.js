import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

const addUser = async (req, res) => {
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt(10);

  const hashedPassowrd = await bcrypt.hash(password, salt);

  const newUser = new User({
    email,
    password: hashedPassowrd,
  });

  await newUser.save();

  res.json({ success: true, data: "user added successfully" });
};

const getUser = async (req, res) => {
  const { id } = req.body;
  const user = await User.findById(id);

  if (!user) {
    return res.json({ success: false, data: "user not found" });
  }

  res.json({ success: true, data: user });
};

const login = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });
  const hashedPassword = await bcrypt.compare(password, user.password);

  if (!user) {
    return res.json({ success: false, data: "User is not registerd" });
  }

  if (!hashedPassword) {
    return res.json({ success: false, data: "Wrong password" });
  }

  res.json({ success: true, data: user });
};

export { addUser, getUser, login };
