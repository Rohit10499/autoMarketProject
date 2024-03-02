import mongoose from "mongoose";
const carsSchema = new mongoose.Schema(
  {
    car_id: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    car_info: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  { timestamps: true }
);
export const Cars = mongoose.model("Cars", carsSchema);
