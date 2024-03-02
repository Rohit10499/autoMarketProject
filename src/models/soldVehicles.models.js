const soldVehiclesSchema = new mongoose.Schema({
  vehicle_id: { type: String, required: true, unique: true },
  car_id: { type: mongoose.Schema.Types.ObjectId, ref: "Cars", required: true },
  vehicle_info: { type: mongoose.Schema.Types.Mixed },
});

export const SoldVehicles = mongoose.model("SoldVehicles", soldVehiclesSchema);
