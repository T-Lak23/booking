import { Promo } from "../models/promotion.model.js";
import { catchAsync } from "../utils/catchAsync.js";
import { throwError } from "../utils/throwError.js";

export const validatePromo = catchAsync(async (req, res) => {
  let { discountCode, totalAmount } = req.body;
  totalAmount = Number(totalAmount);
  let discount = 0;

  const promo = await Promo.findOne({
    code: discountCode?.trim()?.toUpperCase(),
  });
  if (!promo) return throwError(404, "Invalid coupon code");

  let finalAmount;

  if (promo.type === "percent") {
    discount = (promo.value / 100) * totalAmount;
  } else if (promo.type === "flat") {
    discount = promo.value;
  }
  if (discount > totalAmount) discount = totalAmount;

  finalAmount = totalAmount - discount;

  res.status(200).json({
    message: "Coupon applied",
    discount,
    finalAmount,
  });
});
