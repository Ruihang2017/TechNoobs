const router = require("express").Router();
const { User, Comment, Blog } = require("../models");
const withAuth = require("../utils/auth");

// //Home page that goes straight to login
// router.get("/", withAuth, async (req, res) => {
//   try {
//     // If the user is already logged in, redirect them to the tasks page
//     res.redirect("/tasks");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get("/", async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [{ model: User }, { model: Comment }],
    });
    console.log("GET / ");
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
    });

    // const employees = employeeData.map((employee) =>
    //   employee.get({ plain: true }),
    // );
    const blogs = blogData.map((data) => data.get({ plain: true }));
    const users = userData.map((user) => user.get({ plain: true }));

    const loggedInUser = req.session.logged_in
      ? users.find((user) => user.id === req.session.user_id)
      : null;

    res.render("home", {
      loggedInUser,
      blogs,
      logged_in: req.session.logged_in,

      // logged_in: req.session.logged_in,
    });
    // res.render("teamTaskBoard", {
    //   loggedInUser,
    //   tasks,
    //   logged_in: req.session.logged_in,
    // });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/blog/:id", async (req, res) => {
  try {
    // const BlogData = await Blog.findOne({
    //   include: [{ model: User }, { model: Comment }],
    // });
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },
        {
          model: Comment,
          include: {
            model: User,
            attributes: ["first_name", "last_name"],
          },
        },
      ],
    });
    const blogDataPlain = blogData.get({ plain: true });

    console.log(`GET /Blog/${req.params.id}`);
    // console.log(blogDataPlain.comments[0]);

    res.render("blog", {
      blogDataPlain,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login page
router.get("/login", (req, res) => {
  try {
    if (req.session.logged_in) {
      res.redirect("/");
      return;
    }
    res.render("signIn");
  } catch (error) {
    res.status(500).json(err);
  }
});

//signup page
router.get("/signup", (req, res) => {
  try {
    if (req.session.logged_in) {
      res.redirect("/");
      return;
    }
    res.render("signUp");
  } catch (error) {
    res.status(500).json(err);
  }
});

router.get("/logout", (req, res) => {
  try {
    console.log("log out");
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    res.status(500).json(err);
  }
});

module.exports = router;
