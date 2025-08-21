const mongoose = require("mongoose");

// 1. Define the schema (shape of a Journal document)
const journalSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // must have a title
    },
    content: {
      type: String,
      required: true, // must have content
    },
    createdAt: {
      type: Date,
      default: Date.now, // auto set when created
    },
  },
  {
    // adds createdAt & updatedAt automatically
    timestamps: true,
  }
);

// 2. Create a model based on the schema
const Journal = mongoose.model("Journal", journalSchema);

// 3. Export the model so other files can use it
module.exports = Journal;
