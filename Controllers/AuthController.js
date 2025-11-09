require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/UsersModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcrypt");

// SIGNUP
module.exports.signup = async (req, res, next) => {
  try {
    const { email, password, name, mobileNumber } = req.body;

    if (!email || !password || !name || !mobileNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      name,
      password: hashedPassword,
      mobileNumber,
    });

    await newUser.save();

    const token = createSecretToken(newUser._id);

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false, // use true in production
    });

    return res
      .status(201)
      .json({ message: "User created", user: newUser, token });
  } catch (err) {
    console.log(err);
  }
};

// //  LOGIN

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    res
      .status(201)
      .json({ message: "User logged in successfully", success: true });
  } catch (error) {
    console.error(error);
  }
};

// //  USER VERIFICATION
// module.exports.userVerification = (req, res) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.json({ status: false });
//   }

//   jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
//     if (err) {
//       return res.json({ status: false });
//     } else {
//       const user = await User.findById(data.id);
//       if (user) return res.json({ status: true, user: user.username });
//       else return res.json({ status: false });
//     }
//   });
// };
