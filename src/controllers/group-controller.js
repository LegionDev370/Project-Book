import { groupValidation } from "../utils/group-validation.js";
import { customError } from "../utils/custom-error.js";
import { Group } from "../models/group-model.js";
import mongoose from "mongoose";
import { Membership } from "../models/membership-model.js";
const ObjectId = mongoose.Types.ObjectId;
export const create = async (req, res, next) => {
  try {
    const { name, direction, lessonDays, lessonTime, adminId } = req.body;
    if (!name || !direction || !lessonDays || !lessonTime || !adminId) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    const { error } = groupValidation({
      name,
      direction,
      lessonDays,
      lessonTime,
    });
    if (error) {
      throw new customError(400, error.details[0].message);
    }
    const data = await Group.create({
      name,
      direction,
      lessonDays,
      lessonTime,
      adminId,
    });
    if (data) {
      return res.status(201).json({ message: "Group created successfully" });
    }
  } catch (error) {
    next(error);
  }
};
export const getOneGroup = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Group.findById(id);
    if (data) {
      return res.status(200).json({
        message: "Group retrieved successfully",
        data,
      });
    } else {
      return res.status(404).json({ message: "Group not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const getAllGroup = async (req, res, next) => {
  try {
    const data = await Group.find();
    if (data) {
      return res.status(200).json({
        message: "Group retrieved successfully",
        data,
      });
    }
  } catch (error) {}
};

export const updateGroup = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { direction, lessonDays, lessonTime, teacherId } = req.body;
    if (!direction || !lessonDays || !lessonTime || !teacherId) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    const { error } = groupValidation({
      direction,
      lessonDays,
      lessonTime,
    });
    if (error) {
      throw new customError(400, error.details[0].message);
    }
    const data = await Group.findByIdAndUpdate(id, {
      direction,
      lessonDays,
      lessonTime,
      teacherId,
    });
    if (data) {
      return res.status(200).json({ message: "Group updated successfully" });
    }
  } catch (error) {
    next(error);
  }
};

export const removeGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Group.findByIdAndDelete(id);
    if (data) {
      return res.status(200).json({ message: "Group deleted successfully" });
    }
  } catch (error) {
    next(error);
  }
};

export const joinGroup = async (req, res, next) => {
  try {
    const { group_id, user_id } = req.body;

    if (!group_id || !user_id) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    if (!ObjectId.isValid(group_id) || !ObjectId.isValid(user_id)) {
      return res.status(400).json({ message: "Invalid ObjectId" });
    }
    const findUser = await Membership.findById(user_id);
    if (findUser) {
      return res.status(400).json({ message: "Student already joined" });
    }
    const data = await Membership.create({
      group_id,
      user_id,
    });
    if (data) {
      return res.status(200).json({ message: "Student joined successfully" });
    }
  } catch (error) {
    next(error);
  }
};
