const router = require("express").Router();
const { Comment, Blog, User } = require("../models");
const withAuth = require("../utils/auth");

// // Get information for all tasks
router.post("/", withAuth, async (req, res) => {
  try {
    // Extract task data from the req body
    const { content, user_id, blog_id } = req.body;

    // Create the task
    const comment = await Comment.create({
      content,
      user_id,
      blog_id,
    });

    res.status(201).json({ message: "comment created", comment });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
