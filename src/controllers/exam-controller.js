import pkg from "mongoose";
import moment from "moment/moment.js";
import { Exam } from "../models/exam-model.js";
import { Group } from "../models/group-model.js";
const ObjectId = pkg.Types.ObjectId;
export const create = async (req, res, next) => {
  try {
    const { name, group_id, finishedDate, passing_score } = req.body;
    if (!name || !finishedDate || !group_id || !passing_score) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const file = req.file;
    if (!ObjectId.isValid(group_id)) {
      return res.status(400).json({ message: "Invalid ObjectId" });
    }
    const findGroup = await Group.findById({ _id: group_id });
    if (!findGroup) {
      return res.status(400).json({ message: "Group not found" });
    }
    const findExam = await Exam.find({
      groupId: group_id,
    });
    const examName = findExam.name;
    const checkName = findExam.some((exam) => exam.name === name);
    if (findExam && checkName) {
      return res.status(400).json({ message: "Exam already exists" });
    }
    if (findExam && name != examName) {
      let dateString = finishedDate;
      let dateParts = dateString.split(".");
      let jsDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
      const newExam = await Exam.create({
        name,
        groupId: group_id,
        finishedDate: jsDate,
        passing_score,
        file,
      });
      if (newExam) {
        return res.status(201).json({
          message: "Exam created successfully",
          exam: newExam,
        });
      }
    }
  } catch (error) {
    next(error);
  }
};
export const updateExam = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, group_id, finishedDate, passing_score } = req.body;
    if (!name || !finishedDate || !group_id || !passing_score) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const file = req.file;
    if (!ObjectId.isValid(group_id)) {
      return res.status(400).json({ message: "Invalid ObjectId" });
    }
    const findGroup = await Group.findById({ _id: group_id });
    if (!findGroup) {
      return res.status(400).json({ message: "Group not found" });
    }
    const findExam = await Exam.findOne({
      groupId: group_id,
    });
    if (!findExam) {
      return res.status(400).json({ message: "Exam not found" });
    }
    const update = await Exam.findByIdAndUpdate(id, {
      name,
      groupId: group_id,
      finishedDate,
      passing_score,
      file,
    });
    if (update) {
      return res.status(200).json({
        message: "Exam updated successfully",
        exam: update,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getOneExam = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ObjectId" });
    }
    const findExam = await Exam.findById(id);
    if (!findExam) {
      return res.status(400).json({ message: "Exam not found" });
    }
    return res.status(200).json({
      message: "Exam found successfully",
      exam: findExam,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllExam = async (req, res, next) => {
  try {
    const findExam = await Exam.find();
    if (!findExam) {
      return res.status(400).json({ message: "Exam not found" });
    }
    return res.status(200).json({
      message: "Exam found successfully",
      exam: findExam,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteExam = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ObjectId" });
    }
    const deleteExam = await Exam.findByIdAndDelete(id);
    if (!deleteExam) {
      return res.status(400).json({ message: "Exam not found" });
    }
    return res.status(200).json({
      message: "Exam deleted successfully",
      exam: deleteExam,
    });
  } catch (error) {
    next(error);
  }
};
