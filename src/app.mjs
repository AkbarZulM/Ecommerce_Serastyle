import express from "express";
import dotenv from "dotenv";
import requestLogger from "./middlewares/requestLogger.mjs";
import errorLogger from "./middlewares/errorLogger.mjs";
import PrivateRouter from "./routes/private-route.mjs";

dotenv.config();

const app = express();

app.use(express.json());
app.use(requestLogger);
app.use(PrivateRouter);
app.use(errorLogger);

export default app;
