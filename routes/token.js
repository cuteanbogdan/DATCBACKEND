const express = require("express");
const router = express.Router();
const passport = require("passport");

// Token validation endpoint
router.post("/validate", (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ msg: err.message });
    }

    if (!user) {
      // Check if 'info' is defined before trying to access 'message'
      const message = info?.message || "Token is not valid";
      return res.status(401).json({ msg: message });
    }

    // If the token is valid, proceed
    res.json({ msg: "Token is valid", user: user });
  })(req, res, next);
});

module.exports = router;
