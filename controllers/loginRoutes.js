const router = require("express").Router();
const { User } = require("../models");

router.post("/", async (req, res) => {
  try {
    // retrieve
    console.log(1);
    const userData = await User.findOne({
      where: { username: req.body.username },
    });
    console.log(2);

    // if the user does not exist
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }
    console.log(3);
    console.log(userData.password);
    console.log(req.body.password);

    // Checking password keyed in against stored hashed password
    // const validPassword =  await userData.checkPassword(req.body.password);
    const validPassword = userData.password === req.body.password;

    console.log(4);

    //if the password does not match
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }
    console.log(5);

    // All good on password and user, initiate user session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
      console.log(6);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
