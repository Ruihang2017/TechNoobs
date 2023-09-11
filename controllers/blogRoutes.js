const router = require("express").Router();
const { User, Comment, Blog } = require("../models");
const withAuth = require("../utils/auth");

// // Create task
router.post("/", withAuth, async (req, res) => {
  try {
    // Extract task data from the req body
    const { blog_name, blog_content, postDate } = req.body;

    // Create the task
    const blog = await Blog.create({
      blog_name,
      blog_content,
      postDate,
      user_id: req.session.user_id,
    });
    console.log(`blog created ${blog}`);
    res.status(201).json({ message: "blog created", blog });
  } catch (err) {
    res.status(500).json(err);
  }
});

// // Update a task
router.put("/:id", async (req, res) => {
  try {
    const updatedRows = await Blog.update(req.body, {
      where: { id: req.params.id },
    });
    if (updatedRows[0] === 0) {
      res.status(404).json({ message: "No task found with this id!" });
      return;
    }
    res.status(200).json(updatedRows);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a task
router.delete("/:id", async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: { id: req.params.id },
    });
    if (!blogData) {
      res
        .status(404)
        .json({ message: `No blogData found with this id: ${req.params.id}!` });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
