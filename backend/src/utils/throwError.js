import { appError } from "./appError.js";

export const throwError = (statusCode, message) => {
  throw new appError(message, statusCode);
};
