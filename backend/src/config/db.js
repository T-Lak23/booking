import mongoose from "mongoose";
import { ENV } from "./env.js";
import { Experience } from "../models/experience.model.js";
import { Promo } from "../models/promotion.model.js";
import { experiences, promos } from "../seed/seedData.js";

export const dbConnection = async () => {
  try {
    const conn = await mongoose.connect(ENV.MONGO_URI);
    console.log("db connected", conn.connection.host);
    // await seedData();
  } catch (error) {
    console.log("connection to db failed", error);
    process.exit(1);
  }
};

export const seedData = async () => {
  try {
    // await Experience.deleteMany({});
    await Promo.deleteMany({});
    // await Experience.insertMany(experiences);
    await Promo.insertMany(promos);
    console.log("Data seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};
