import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PointSchema = new Schema({
  type: { type: String, default: "Point" },
  coordinates: { type: [Number] },
});

const DriverSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  driving: {
    type: Boolean,
    default: false,
  },
  location: {
    type: PointSchema
  },
});

DriverSchema.index({ location: "2dsphere" });

const Driver = mongoose.model("driver", DriverSchema);

export default Driver;
