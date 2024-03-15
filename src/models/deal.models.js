import mongoose from "mongoose";
const dealSchema = new mongoose.Schema(
  {
    deal_id: {
      type: String,
      required: true,
      unique: true,
    },
    car_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cars",
      required: true,
    },
    deal_info: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

export const Deal = mongoose.model("Deal", dealSchema);
