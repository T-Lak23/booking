import express from "express";
import {
  bookExperience,
  getAllExperiences,
  getOneExperience,
} from "../controllers/experience.controller.js";
const router = express.Router();

router.get("/", getAllExperiences);
router.get("/:id", getOneExperience);
router.post("/booking", bookExperience);

export default router;
