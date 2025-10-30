import mongoose from "mongoose";
import { Booking } from "../models/booking.model.js";
import { Experience } from "../models/experience.model.js";
import { User } from "../models/user.model.js";
import validator from "validator";
import { nanoid } from "nanoid";
import { catchAsync } from "../utils/catchAsync.js";
import { throwError } from "../utils/throwError.js";
import { Promo } from "../models/promotion.model.js";

export const getAllExperiences = catchAsync(async (req, res) => {
  const query = {};
  if (req.query.search) {
    query.title = { $regex: req.query.search, $options: "i" };
  }
  const experiences = await Experience.find(query);
  if (!experiences || experiences.length === 0)
    return throwError(404, "No experiences found");
  res.status(200).json(experiences);
});

export const getOneExperience = catchAsync(async (req, res) => {
  const { id } = req.params;
  const experience = await Experience.findById(id);
  if (!experience) return throwError(404, "Experience not found");
  res.status(200).json(experience);
});

export const bookExperience = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      id,
      email,
      name,
      seatsBooked,
      date,
      time,
      promoCode,
      discount,
      finalAmount,
      totalAmount,
    } = req.body;
    if (!email || !name) return throwError(400, "Name and email are required");

    const validatedName = validator.escape(name);
    const validatedEmail = validator.normalizeEmail(email);

    const experience = await Experience.findById(id).session(session);
    if (!experience) return throwError(404, "Experience not found");
    console.log("slot", experience.availableSlots);

    const reqDate = String(date).trim();
    const reqTime = String(time).trim().toLowerCase();

    const slot = experience.availableSlots.find((s) => {
      const slotDate = String(s.date).trim();
      const slotTime = String(s.time).trim().toLowerCase();
      return slotDate === reqDate && slotTime === reqTime;
    });

    if (!slot) {
      console.log(" Slot not found. Requested:", { reqDate, reqTime });
      console.log(" Available slots:", experience.availableSlots);
      return throwError(400, "Slot not available");
    }

    // if (!slot) return throwError(400, "Slot not available");
    if (slot.bookedSeats + seatsBooked > slot.totalSeats)
      return throwError(400, "Not enough seats available");

    slot.bookedSeats += seatsBooked;
    await experience.save({ session });

    let user = await User.findOne({ email }).session(session);

    if (!user) {
      [user] = await User.create(
        [{ name: validatedName, email: validatedEmail }],
        { session }
      );
    }

    const bookingId = `BOOK-${nanoid(8).toUpperCase()}`;

    const [booking] = await Booking.create(
      [
        {
          bookingId,
          user: user._id,
          experience: experience._id,
          slot: { date, time },
          seatsBooked,
          totalAmount: totalAmount || experience.price * seatsBooked,
          promoCode,
          discount,
          finalAmount,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    res.status(201).json({ message: "Booking successful", booking });
  } catch (error) {
    await session.abortTransaction();
    res.status(400).json({ error: error.message });
  } finally {
    if (session) await session.endSession();
  }
};
