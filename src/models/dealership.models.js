import mongoose from "mongoose";
const dealershipSchema = new mongoose.Schema(
  {
    dealership_email: {
      type: String,
      required: true,
      unique: true,
    },
    dealership_id: {
      type: String,
      required: true,
    },
    dealership_name: {
      type: String,
      required: true,
    },
    dealership_location: {
      type: String,
      required: true,
    },
    dealership_password: {
      type: String,
      required: true,
    },
    dealership_info: {
      type: mongoose.Schema.Types.Mixed,
    },
    cars: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cars" }],
    deals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Deal" }],
    sold_vehicles: [
      { type: mongoose.Schema.Types.ObjectId, ref: "SoldVehicles" },
    ],
  },
  { timestamps: true }
);

export const Dealership = mongoose.model("Dealership", dealershipSchema);
