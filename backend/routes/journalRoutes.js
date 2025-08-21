const express = require("express");

const journalController = require("../controller/journalController");
const router = express.Router();

// @desc    Create a new journal
// @route   POST /api/journals
// @access  Public (for now, no auth)
console.log("Journal Controller imported:", journalController);
console.log("Type of updateJournal:", typeof journalController.updateJournal);
console.log("Type of deleteJournal:", typeof journalController.deleteJournal);
console.log("Type of getJournalById:", typeof journalController.getJournalById);
router
  .route("/")
  .post(journalController.createJournal)
  .get(journalController.getAllJournals);

// @desc    Get all journals
// @route   GET /api/journals
// @access  Public
// @route   DELETE /api/journals/:id
router
  .route("/:id")
  .get(journalController.getJournalById)
  .put(journalController.updateJournal)
  .delete(journalController.deleteJournal);
module.exports = router;
