import { Schema, model } from "mongoose";
const examSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  finishedDate: {
    type: Date,
    default: null,
  },
  passing_score: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  file: {
    type: String,
    default: null,
  },
  groupId: {
    type: Schema.Types.ObjectId,
    ref: "groups",
  },
});
export const Exam = model("exam", examSchema);
