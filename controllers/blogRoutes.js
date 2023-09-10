const router = require("express").Router();
const { User, Comment, Blog } = require("../models");
// const withAuth = require("../utils/auth");

// // // Get information for all tasks
// router.get("/", withAuth, async (req, res) => {
//   try {
//     const tasksData = await Task.findAll({
//       include: [
//         {
//           model: TaskStatus,
//         },
//         { model: Employee, through: EmployeeTask, as: "task_employees" },
//       ],
//     });
//     if (!tasksData) {
//       res.status(404).json({ message: "No tasks found!" });
//       return;
//     }

//     res.status(200).json(tasksData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Get information for one tasks
// router.get("/:id", withAuth, async (req, res) => {
//   try {
//     const taskData = await Task.findOne({
//       where: { id: req.params.id },
//       include: [
//         {
//           model: TaskStatus,
//         },
//         { model: Employee, through: EmployeeTask, as: "task_employees" },
//       ],
//     });

//     if (!taskData) {
//       res
//         .status(404)
//         .json({ message: `No tasks found with this id: ${req.params.id}!` });
//       return;
//     }
//     res.status(200).json(taskData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Create task
router.post("/", async (req, res) => {
  try {
    // Extract task data from the req body
    const { blog_name, blog_content, postDate, user_id } = req.body;

    // Create the task
    const blog = await Blog.create({
      blog_name,
      blog_content,
      postDate,
      user_id,
    });
    console.log(`blog created ${blog}`);
    res.status(201).json({ message: "blog created", blog });
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

// // Update a task
// router.patch("/:id/status", withAuth, async (req, res) => {
//   try {
//     const statusData = await TaskStatus.findOne({
//       where: {
//         status_name: req.body.status_name,
//       },
//     });

//     if (!statusData) {
//       return res.status(404).json({ message: "Status not found!" });
//     }

//     const statusId = statusData.id;

//     // Update the task with the new status ID
//     const [numberOfAffectedRows] = await Task.update(
//       { status_id: statusId },
//       {
//         where: {
//           id: req.params.id,
//         },
//       },
//     );

//     if (numberOfAffectedRows === 0) {
//       return res.status(404).json({ message: "Task not found!" });
//     }

//     res.json({ message: "Task status updated successfully." });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error updating task status.", error: error.message });
//   }
// });

// // Update a task
// router.put("/:id", withAuth, async (req, res) => {
//   try {
//     const updatedRows = await Task.update(req.body, {
//       where: { id: req.params.id },
//     });
//     if (updatedRows[0] === 0) {
//       res.status(404).json({ message: "No task found with this id!" });
//       return;
//     }

//     if (req.body.employeeIds) {
//       const newTaskEmployeeArr = req.body.employeeIds.map((employeeId) => {
//         return {
//           employee_id: employeeId.employee_id,
//           task_id: req.params.id,
//         };
//       });

//       const taskEmployees = await EmployeeTask.findAll({
//         where: { task_id: req.params.id },
//       });
//       const taskEmployeesID = taskEmployees.map(
//         (employee_task) => employee_task.id,
//       );

//       await EmployeeTask.destroy({ where: { id: taskEmployeesID } });

//       res.status(200).json(await EmployeeTask.bulkCreate(newTaskEmployeeArr));
//     } else {
//       res.status(200).json({ message: "Task updated successfully!" });
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Delete a task
// router.delete("/:id", withAuth, async (req, res) => {
//   try {
//     const taskData = await Task.destroy({
//       where: { id: req.params.id },
//     });
//     if (!taskData) {
//       res
//         .status(404)
//         .json({ message: `No tasks found with this id: ${req.params.id}!` });
//       return;
//     }
//     res.status(200).json(taskData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
