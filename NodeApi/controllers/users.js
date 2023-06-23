import { User } from "../models/users.js";

export const getAllUsers = async (req,res) => {
    
    const users = await User.find({})

    console.log(req.query)
    res.json ({
        success:true,
        users,
    })
}


export const register = async (req,res) => {
    const {name,email,password} = req.body

    await User.create({
        name,
        email,
        password,

    });

    res.status(201).cookie('temp','lol').json ({
        success:true,
        message:"Registered Successfully",
    })
};



export const getUserDetails = async (req,res) =>{
  const {id} = req.params;
  const user = await User.findById(id);
  // console.log(req.params)
  res.json({
    success:true,
    user,
  })
};