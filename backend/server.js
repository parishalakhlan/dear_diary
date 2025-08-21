const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const journalRoutes = require("./routes/journalRoutes");
dotenv.config();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" })); // allow frontend

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
