import { Schema, model } from "mongoose";

const membershipSchema = Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    group_id: {
      type: Schema.Types.ObjectId,
      ref: "groups",
    },
  },
  {
    timestamps: true,
  }
);
export const Membership = model("membership", membershipSchema);
