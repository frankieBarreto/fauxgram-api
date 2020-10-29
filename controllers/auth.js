const bcrypt = require('bcryptjs');
const db = require("../models");
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const foundUser = await db.User.findOne({ email: req.body.email });

        if(foundUser) {
            return res.send({ message: "Account is already registered" });
        }

        const salt = await bcrypt.genSalt(10);

        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;

        const createdUser = await db.User.create({...req.body, password: hash });

        return res
            .status(201)
            .json({status: 201, message: "success", createdUser });
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: "Something went wrong. PLease try again",
        });
    }
};


const login = async (req, res) => {
  try {
    const foundUser = await db.User.findOne({ email: req.body.email });

    console.log(foundUser);

    if (!foundUser) {
      return res.send({ message: "Email or Password incorrect" });
    }

    const match = await bcrypt.compare(req.body.password, foundUser.password);

    if (!match) {
      return res.send({ message: "Email or Password incorrect" });
    }

    const isMatch = await bcrypt.compare(req.body.password, foundUser.password);

    if (isMatch) {
    
      const signedJwt = await jwt.sign(
        {
          _id: foundUser._id,
        },
        "super_secret_key",
        {
          expiresIn: "1h",
        }
      );

      return res.status(200).json({
        status: 200,
        message: "Success",
        id: foundUser._id,
        signedJwt,
      });
      
    } else {
      return res.status(400).json({
        status: 400,
        message: "Username or password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: "Something went wrong. Please try again",
    });
  }
};


module.exports = {
  register,
  login,
  // logout, // not needed 
};


