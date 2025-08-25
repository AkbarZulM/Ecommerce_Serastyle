import morgan from "morgan";
import { morganStream } from "../utils/logger.mjs";

const requestLogger = morgan(
  ':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms',
  { stream: morganStream }
);

export default requestLogger;
