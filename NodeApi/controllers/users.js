import { User } from "../models/users.js";
import bcrpyt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendCookie } from "../utils/features.js";
import errorHandler from "../middlewares/error.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});

    console.log(req.query);
    res.json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return next(new errorHandler("User Already Exists", 400));

    const hashedPassword = await bcrpyt.hash(password, 10);
    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    sendCookie(user, res, "Registered SuccessFully", 201);
  } catch (error) {
    next(error);
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new errorHandler("Invalid Email or Passoword", 400));

    const isMatch = await bcrpyt.compare(password, user.password);

    if (!isMatch)
      return next(new errorHandler("Invalid Email or Passoword", 400));

    sendCookie(user, res, `Welcome back, ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  try {

    res
      .status(200)
      .cookie("token", "", { expires: new Date(Date.now()) })
      .json({
        success: true,
        user: req.user,
      });

  } catch (error) {

    next(error);
  
  }
};
