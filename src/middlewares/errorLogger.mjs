import logger from "../utils/logger.mjs";

const errorLogger = (error, req, res, next) => {
  logger.error("Unhandled Error:", {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    body: req.body,
    params: req.params,
    query: req.query,
    user: req.user ? req.user.id : "anonymous",
  });

  next(error);
};

export default errorLogger;
