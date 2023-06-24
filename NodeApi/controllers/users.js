import { User } from "../models/users.js";
import bcrpyt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendCookie } from "../utils/features.js";


export const getAllUsers = async (req, res) => {
  const users = await User.find({});

  console.log(req.query);
  res.json({
    success: true,
    users,
  });
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });
  if (user)
    return res.status(404).json({
      success: false,
      message: "User Already Exist",
    });

  const hashedPassword = await bcrpyt.hash(password, 10);
  user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

sendCookie(user,res,"Registered SuccessFully",201)
}

export const getUserDetails = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  // console.log(req.params)
  res.json({
    success: true,
    user,
  });
};

export const login = async (req,res) =>{

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    
    if (!user)
    return res.status(404).json({
        success:false,
        message:"Invalid Email or Password",
    })

    const isMatch = await bcrpyt.compare(password,user.password);

    if (!isMatch)
    return res.status(404).json({
        success:false,
        message:"Invalid Email or Password",
    })

    sendCookie(user,res,`Welcome back, ${user.name}`,200);
}