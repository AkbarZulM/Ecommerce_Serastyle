import express from "express";
import requestLogger from "./middlewares/requestLogger.mjs";
import errorLogger from "./middlewares/errorLogger.mjs";
const app = express();

app.use(express.json());
app.use(requestLogger);
app.use(errorLogger);

// routes
app.use("/api/users", (req, res) => {
  res.send("User route");
});

export default app;
