import mongoose from "mongoose";

const SlotSchema = new mongoose.Schema({
  date: String,
  time: String,
  totalSeats: { type: Number, default: 10 },
  bookedSeats: { type: Number, default: 0 },
});

const ExperienceSchema = new mongoose.Schema({
  title: String,
  location: String,
  description: String,
  price: Number,
  image: String,
  availableSlots: [SlotSchema],
});
export const Experience = mongoose.model("Experience", ExperienceSchema);
