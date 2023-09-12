import { Schema, model } from "mongoose";

const groupSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    direction: {
      type: String,
      required: true,
    },
    lessonDays: {
      type: String,
      required: true,
    },
    lessonTime: {
      type: String,
      required: true,
    },
    adminId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export const Group = model("groups", groupSchema);
