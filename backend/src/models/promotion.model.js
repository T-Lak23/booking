import mongoose from "mongoose";

const PromoSchema = new mongoose.Schema({
  code: String,
  type: { type: String, enum: ["percent", "flat"] },
  value: Number,
});

export const Promo = mongoose.model("Promo", PromoSchema);
