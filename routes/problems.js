const express = require("express");
const router = express.Router();
const passport = require("passport");
const ReportedProblems = require("../schemas/ReportedProblems");

// GET /api/problems/retrieve - Retrieve all reported problems
router.get(
  "/retrieve",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const problems = await ReportedProblems.find();
      res.json(problems);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: "Error retrieving reported problems",
        error: error.message,
      });
    }
  }
);

// POST /api/problems/report - Create a new reported problem
router.post(
  "/report",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { coord, categorie } = req.body;
      if (!coord || !categorie) {
        return res.status(400).json({ msg: "Missing required fields" });
      }

      // 30m / 111139
      const proximityThreshold = 0.00027;

      // Find problems within the approximate radius and same category
      const existingProblems = await ReportedProblems.find({
        categorie: categorie,
        "coord.lat": {
          $gte: coord.lat - proximityThreshold,
          $lte: coord.lat + proximityThreshold,
        },
        "coord.lng": {
          $gte: coord.lng - proximityThreshold,
          $lte: coord.lng + proximityThreshold,
        },
      });

      let problemToSave;

      if (existingProblems && existingProblems.length > 0) {
        problemToSave = existingProblems[0];
        problemToSave.numarRaportari += 1;
      } else {
        // Create a new problem
        problemToSave = new ReportedProblems({
          coord,
          numarRaportari: 1,
          categorie,
        });
      }

      await problemToSave.save();

      const user = req.user;
      user.points = (user.points || 0) + 10;
      await user.save();

      res.json(problemToSave);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: "Error processing the reported problem",
        error: error.message,
      });
    }
  }
);

// PUT /api/problems/:id - Update a specific reported problem by its ID
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const problemId = req.params.id;
      const update = req.body;

      const updatedProblem = await ReportedProblems.findByIdAndUpdate(
        problemId,
        update,
        { new: true }
      );

      if (!updatedProblem) {
        return res.status(404).json({ msg: "Problem not found" });
      }

      res.json(updatedProblem);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: "Error updating the reported problem",
        error: error.message,
      });
    }
  }
);

// DELETE /api/problems/:id - Delete a specific reported problem by its ID
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const problemId = req.params.id;
      const result = await ReportedProblems.findByIdAndDelete(problemId);

      if (!result) {
        return res.status(404).json({ msg: "Problem not found" });
      }

      res.json({ msg: "Problem deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: "Error deleting the reported problem",
        error: error.message,
      });
    }
  }
);

module.exports = router;
