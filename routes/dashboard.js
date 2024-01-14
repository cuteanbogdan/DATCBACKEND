const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../schemas/User");

// Fetch all users endpoint
router.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Error fetching users", error: error.message });
    }
  }
);

router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ msg: "Unauthorized access" });
      }

      const userId = req.user._id;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      res.json(user);
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Error fetching user", error: error.message });
    }
  }
);

// DELETE user endpoint
router.delete(
  "/users/:userId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const userId = req.params.userId;
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({ msg: "User not found" });
      }
      res.json({ msg: "User deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Error deleting user", error: error.message });
    }
  }
);

module.exports = router;
