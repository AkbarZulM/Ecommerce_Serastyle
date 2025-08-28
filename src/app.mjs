import express from "express";
import requestLogger from "./middlewares/requestLogger.mjs";
import errorLogger from "./middlewares/errorLogger.mjs";
import PrivateRouter from "./routes/private-route.mjs";
const app = express();

app.use(express.json());
app.use(requestLogger);
app.use(errorLogger);

app.use(PrivateRouter);

export default app;
