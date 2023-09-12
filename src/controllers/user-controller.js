import bcrypt from "bcrypt";
import { userValidation } from "../utils/user-validation.js";
import { customError } from "../utils/custom-error.js";
import { User } from "../models/user-model.js";
import { generateToken, verifyToken } from "../utils/jwt.js";
import mongoose from "mongoose";
import { Membership } from "../models/membership-model.js";
import { Group } from "../models/group-model.js";
const ObjectId = mongoose.Types.ObjectId;
export const createUser = async (req, res, next) => {
  try {
    const { username, email, password, phone_number } = req.body;
    if (!username || !password || !email || !phone_number) {
      return res.status(400).json({
        message: "Please provide all fields",
      });
    }
    const { error } = userValidation({
      username,
      email,
      password,
      phone_number,
    });
    if (error) {
      throw new customError(400, error.details[0].message);
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const findUser = await User.findOne({ username });
    const data = await User.create({
      username,
      email,
      password: hashedPassword,
      phone_number,
    });
    if (findUser) {
      return res.status(403).json({
        message: "User already exists",
      });
    }
    await data.save();
    if (data) {
      const token = generateToken({
        _id: data._id,
      });
      return res.status(201).json({
        message: "user created successfully",
        token,
      });
    }
  } catch (error) {
    next(error);
  }
};
export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;
    if (!username || !password || !email) {
      return res.status(400).json({
        message: "Please provide all fields",
      });
    }
    const { error } = adminValidation({
      username,
      email,
      password,
    });
    if (error) {
      throw new customError(400, error.details[0].message);
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const update = await User.findByIdAndUpdate(
      id,
      {
        username,
        email,
        password: hashedPassword,
      },
      { new: true }
    );
    if (update) {
      return res.status(201).json({
        message: "user updated successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};
export const remove = (req, res) => {
  const { id } = req.params;
  User.findByIdAndDelete(id)
    .then((data) => {
      if (data) {
        return res.status(201).json({
          message: "user deleted successfully",
        });
      }
    })
    .catch((error) => {
      next(error);
    });
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (users) {
      return res.status(200).json({
        message: "users fetched successfully",
        users,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getOneUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const findGroups = await Membership.find({
      user_id: id,
    });
    const groups = [];
    for (let i = 0; i < findGroups.length; i++) {
      const data = await Group.findById(findGroups[i].group_id);
      if (data) {
        groups.push(data);
      }
    }
    const parseUser = JSON.parse(JSON.stringify(user));
    parseUser.groups = groups;
    if (user) {
      return res.status(201).json({
        message: "user fetched successfully",
        user: parseUser,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const onLogin = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      return res.status(400).json({
        message: "Please provide all fields",
      });
    }
    const { error } = userValidation({
      username,
      password,
      email,
    });
    if (error) {
      throw new customError(400, error.details[0].message);
    }
    const findUser = await User.findOne({ username });
    if (findUser) {
      const verifyPassword = await bcrypt.compare(password, findUser.password);
      if (verifyPassword) {
        const token = generateToken({
          id: findUser._id,
        });
        return res.json({
          message: "Successfully login",
          token,
        });
      }
    } else {
      return res.status(403).json({
        message: "User not found",
      });
    }
  } catch (error) {
    next(error);
  }
};
