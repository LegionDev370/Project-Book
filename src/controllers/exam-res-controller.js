import mongoose from "mongoose";
import { ExamResult } from "../models/exam-result.js";
import { Exam } from "../models/exam-model.js";
const ObjectId = mongoose.Types.ObjectId;
export const sendResult = async (req, res, next) => {
  try {
    const { student_id, exam_id } = req.body;
    const file = req.file;
    if (!student_id || !exam_id)
      return res.status(400).json({ message: "Missing required fields" });
    if (!ObjectId.isValid(student_id) || !ObjectId.isValid(exam_id)) {
      return res.status(400).json({ message: "Invalid ObjectId" });
    }
    const date = new Date();
    const findStudent = await ExamResult.findOne({
      student_id,
    });
    if (findStudent) {
      return res.status(400).json({ message: "Student already has result" });
    }
    const resultExam = await ExamResult.create({
      date,
      student_id,
      exam_id,
      file,
    });
    if (resultExam) {
      return res.status(201).json({ message: "Result added" });
    }
  } catch (error) {
    next(error);
  }
};

export const updExmResult = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { score } = req.body;
    const findExamResult = await ExamResult.findById(id);
    const findExam = await Exam.findById(findExamResult.exam_id);
    const dateExmResult = findExamResult.date;
    const dateExm = findExam?.finishedDate;
    if (dateExmResult < dateExm && score > findExam?.passing_score) {
      const update = await ExamResult.findByIdAndUpdate(id, {
        ball: score,
        status: "success",
      });
      if (update) {
        return res.status(200).json({ message: "Score updated" });
      }
    }
    if (dateExmResult > dateExm && score > findExam?.passing_score) {
      const date1 = new Date(dateExmResult);
      const date2 = new Date(dateExm);
      const timeDifference = Math.abs(date1 - date2);
      const minutesDifference = Math.trunc(
        Math.floor(timeDifference / (1000 * 60)) / 5
      );
      const checkScore = score - minutesDifference;
      if (checkScore < 1) {
        const update = await ExamResult.findByIdAndUpdate(id, {
          ball: 0,
          status: "failure",
        });
        if (update) {
          return res.status(200).json({ message: "Score updated" });
        }
      } else {
        if (score > findExam.passing_score) {
          const update = await ExamResult.findByIdAndUpdate(id, {
            ball: score,
            status: "success",
          });
          if (update) {
            return res.status(200).json({ message: "Score updated" });
          }
        } else {
          const update = await ExamResult.findByIdAndUpdate(id, {
            ball: score,
            status: "failure",
          });
          if (update) {
            return res.status(200).json({ message: "Score updated" });
          }
        }
      }
    }
  } catch (error) {
    next(error);
  }
};

export const getExamResults = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findExamResult = await ExamResult.findById(id);
    if (findExamResult) {
      return res.status(200).json({
        message: "Exam result found",
        examResult: findExamResult,
      });
    } else {
      return res.status(404).json({ message: "Exam result not found" });
    }
  } catch (error) {
    next(error);
  }
};
export const getAllExmResults = async (req, res, next) => {
  try {
    const findExamResults = await ExamResult.find();
    if (findExamResults) {
      return res.status(200).json({
        message: "Exam results found",
        examResults: findExamResults,
      });
    } else {
      return res.status(404).json({ message: "Exam results not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const removeExamResult = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findExamResult = await ExamResult.findById(id);
    if (findExamResult) {
      const remove = await ExamResult.findByIdAndDelete(id);
      if (remove) {
        return res.status(200).json({ message: "Exam result removed" });
      }
    } else {
      return res.status(404).json({ message: "Exam result not found" });
    }
  } catch (error) {
    next(error);
  }
};
