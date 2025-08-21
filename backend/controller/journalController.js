const Journal = require("../models/Journal");
exports.createJournal = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }
    const journal = new Journal({
      title,
      content,
    });
    const savedJournal = await journal.save();

    res.status(201).json(savedJournal);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
exports.getAllJournals = async (req, res, next) => {
  console.log("route hitting");
  try {
    const journals = await Journal.find().sort({ updatedAt: -1 }); // newest first
    res.json(journals);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// @desc    Get single journal by ID
// @route   GET /api/journals/:id
exports.getJournalById = async (req, res, next) => {
  try {
    const journal = await Journal.findById(req.params.id);
    if (!journal) {
      return res.status(404).json({ message: "Journal not found" });
    }
    res.json(journal);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// @desc    Update journal
// @route   PUT /api/journals/:id
exports.updateJournal = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    // Find journal and update it
    const updatedJournal = await Journal.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true, runValidators: true } // return updated doc & validate
    );

    if (!updatedJournal) {
      return res.status(404).json({ message: "Journal not found" });
    }

    res.json(updatedJournal);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// @desc    Delete journal
// @route   DELETE /api/journals/:id
exports.deleteJournal = async (req, res, next) => {
  try {
    const deletedJournal = await Journal.findByIdAndDelete(req.params.id);

    if (!deletedJournal) {
      return res.status(404).json({ message: "Journal not found" });
    }

    res.json({ message: "Journal deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
