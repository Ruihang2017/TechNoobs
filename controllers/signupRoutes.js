const router = require("express").Router();
const { User } = require("../models");

router.post("/", async (req, res) => {
  try {
    console.log("Signup POST");
    const { first_name, last_name, username, password, confirm_password } =
      req.body;

    // Confirming if user keyed in the same password twice
    if (password !== confirm_password) {
      return res.status(400).json({ message: "Passwords do not match!" });
    }

    // Check if the username already exists in the database
    const existingUser = await User.findOne({
      where: { username: username },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists!" });
    }

    // Create a new employee if the username is unique
    const userData = await User.create({
      first_name,
      last_name,
      username,
      password,
    });
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
    });

    return res.status(201).json(userData);
  } catch (err) {
    console.error("Error during signup:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
