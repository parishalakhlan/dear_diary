const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const journalRoutes = require("./routes/journalRoutes");
dotenv.config();
const cors = require("cors");

const app = express();
app.use(express.json());
const allowedOrigins = [
  "http://localhost:3000", // local dev
  "https://dear-diary-henna.vercel.app", // deployed frontend
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
); // allow frontend

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB error:", err));

app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api/journals", journalRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
