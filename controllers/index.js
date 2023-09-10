const router = require("express").Router();

// const loginRoutes = require("./loginRoutes");
// const signupRoutes = require("./signupRoutes.js");

const homeRoutes = require("./homeRoutes");
// const blogRoutes = require("./blogRoutes");
// const commentRoutes = require("./commentRoutes");
// const userRoutes = require("./userRoutes");

router.use("/", homeRoutes);

// router.use("/api/blog", blogRoutes);
// router.use("/api/comment", commentRoutes);
// router.use("/api/user", userRoutes);

// router.use("/login", loginRoutes);
// router.use("/signup", signupRoutes);

module.exports = router;
