import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    experience: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Experience",
      required: true,
    },
    slot: {
      date: String,
      time: String,
    },
    seatsBooked: {
      type: Number,
      default: 1,
      min: 1,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    promoCode: { type: String },
    discount: { type: Number, default: 0 },
    finalAmount: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Booking = mongoose.model("Booking", BookingSchema);
