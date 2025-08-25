import express from "express";

const app = express();

app.use(express.json());

// routes
app.use("/api/users", (req, res) => {
  res.send("User route");
});

export default app;
