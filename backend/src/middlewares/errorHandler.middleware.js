import { ENV } from "../config/env.js";

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message;

  res.status(statusCode).json({
    success: false,
    message,
    stack: ENV.NODE_ENV === "development" && err.stack,
  });
};
