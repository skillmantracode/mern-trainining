import { ApiError } from "../utils/apiError.js";
import config from "../config/config.js";

const errorHandler = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Something went wrong";
    error = new ApiError(statusCode, message, [], err.stack);
  }
  
  const response = {
    statusCode: error.statusCode,
    message: error.message,
    errors: error.errors,
    ...(config.NODE_ENV === "developement" && { stack: error.stack }),
  };

  return res.status(error.statusCode).json(response);
};
export { errorHandler };




