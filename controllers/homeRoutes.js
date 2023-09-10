const router = require("express").Router();
const { User, Comment, Blog } = require("../models");
// const withAuth = require("../utils/auth");

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
    const BlogData = await Blog.findAll({
      include: [{ model: User }, { model: Comment }],
    });
    console.log("GET / ");
    // const employeeData = await Employee.findAll({
    //   attributes: { exclude: ["password"] },
    // });

    // const employees = employeeData.map((employee) =>
    //   employee.get({ plain: true }),
    // );

    // const loggedInUser = req.session.logged_in
    //   ? employees.find((employee) => employee.id === req.session.user_id)
    //   : null;

    const Blogs = BlogData.map((data) => data.get({ plain: true }));
    res.render("home", {
      // loggedInUser,
      Blogs,
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
    const BlogData = await Blog.findByPk(req.params.id);
    const BlogDataPlain = BlogData.get({ plain: true });

    console.log(`GET /Blog/${req.params.id}`);

    res.render("blog", {
      BlogDataPlain,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// // All task
// router.get("/tasks", withAuth, async (req, res) => {
//   try {
//     const tasksData = await Task.findAll({
//       include: [
//         {
//           model: TaskStatus,
//         },
//         { model: Employee, through: EmployeeTask, as: "task_employees" },
//       ],
//     });

//     const employeeData = await Employee.findAll({
//       attributes: { exclude: ["password"] },
//     });

//     const employees = employeeData.map((employee) =>
//       employee.get({ plain: true }),
//     );

//     const loggedInUser = req.session.logged_in
//       ? employees.find((employee) => employee.id === req.session.user_id)
//       : null;

//     const tasks = tasksData.map((task) => task.get({ plain: true }));
//     res.render("teamTaskBoard", {
//       loggedInUser,
//       tasks,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Get information for all employees
// router.get("/employees", withAuth, async (req, res) => {
//   try {
//     // Find all employees
//     const employeesData = await Employee.findAll({
//       attributes: { exclude: ["password"] },
//     });
//     if (!employeesData || employeesData.length === 0) {
//       res.status(404).json({ message: "No employees found!" });
//       return;
//     }

//     const employees = employeesData.map((employee) =>
//       employee.get({ plain: true }),
//     );

//     res.render("employees", {
//       employees,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // get employees
// router.get("/api/employees", withAuth, async (req, res) => {
//   try {
//     // Find all employees

//     const employeesData = await Employee.findAll({
//       attributes: { exclude: ["password"] },
//     });

//     const employees = employeesData.map((employee) =>
//       employee.get({ plain: true }),
//     );
//     res.status(200).json(employeesData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Get information for one employee
// router.get("/employees/:id", withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const employeeData = await Employee.findByPk(req.params.id, {
//       attributes: { exclude: ["password"] },
//     });

//     if (!employeeData) {
//       res.status(404).json({ message: "No employee found with this id!" });
//       return;
//     }

//     const employee = employeeData.get({ plain: true });

//     res.render("employees", {
//       ...employee,
//       logged_in: true,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Login page
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/employees");
    return;
  }

  res.render("login");
});

//signup page
router.get("/signup", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/employees");
    return;
  }

  res.render("signup");
});

router.get("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
