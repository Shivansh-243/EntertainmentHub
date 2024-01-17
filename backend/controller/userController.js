const User = require("../model/userModal");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  // Basic input validation
  if (!userName || !email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide all required information" });
  }

  const existingUser = await User.findOne({ email });
  console.log(existingUser);
  if (existingUser) {
    console.log("already registered");
    return res.status(400);
  }

  try {
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error("it,s sever page ", error);
    res.status(500).json({ message: "Server error" });
  }
};

const authUser = async (req, res) => {
  console.log("login");
  try {
    const { email, password } = req.body; // Declare email and password here

    if (!email || !password) {
      console.log("please fill every field");
      return res.status(400).json({ message: "Please fill every field" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      console.log("No user found");
      return res.status(400).json({ message: "No user found" });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      console.log("wrong password");
      return res.status(400).json({ message: "wrong password" });
    }
    const secret_key = "shivansh";

    const token = jwt.sign({ userId: user._id }, secret_key, {
      expiresIn: "30d",
    });

    res.json({ token });
    console.log("in userController ", user._id);
    res.status(200);
  } catch (error) {
    console.log("error in logging in", error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = { registerUser, authUser };
