import winston from "winston";
import "winston-daily-rotate-file";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define colors for each level
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "blue",
};

// Add colors to winston
winston.addColors(colors);

// Define log format
const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.errors({ stack: true }),
  winston.format.json(),
  winston.format.printf((info) => {
    if (info.stack) {
      return `${info.timestamp} ${info.level}: ${info.message} \n ${info.stack}`;
    }
    return `${info.timestamp} ${info.level}: ${info.message}`;
  })
);

// Define transports
const transports = [
  // Console transport
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize({ all: true }),
      winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`
      )
    ),
  }),

  // Daily rotate file for errors
  new winston.transports.DailyRotateFile({
    filename: path.join(__dirname, "../logs/error-%DATE%.log"),
    datePattern: "YYYY-MM-DD",
    level: "error",
    maxFiles: "30d",
    format: format,
  }),

  // Daily rotate file for all logs
  new winston.transports.DailyRotateFile({
    filename: path.join(__dirname, "../logs/combined-%DATE%.log"),
    datePattern: "YYYY-MM-DD",
    maxFiles: "30d",
    format: format,
  }),

  // HTTP requests log
  new winston.transports.DailyRotateFile({
    filename: path.join(__dirname, "../logs/http-%DATE%.log"),
    datePattern: "YYYY-MM-DD",
    level: "http",
    maxFiles: "30d",
    format: format,
  }),
];

// Create the logger instance
const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  levels,
  format,
  transports,
  exitOnError: false,
});

// Morgan stream for HTTP logging
export const morganStream = {
  write: (message) => {
    logger.http(message.trim());
  },
};

export default logger;
