const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const auth = require("../middleware/auth");
const Users = require("../models/Users");

const dbError = {
  title: "error",
  message: "unable to complete request",
};

router.get("/", auth, async (req, res) => {
  try {
    const user = await Users.findById(req.session.userId);
    console.log(user);
    const filter = user.userInteracted.map((target) => target.targetUsername);
    filter.push(req.session.currentUser);
    console.log(filter);
    res.json(await Users.find({ username: { $nin: filter } }, { passwordHash: 0 }));
  } catch (err) {
    console.error(err);
    res.status(400).json(dbError);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const user = await Users.findById(req.session.userId, { _id: 0, userInteracted: 1 });
    const userInteracted = user.userInteracted;
    // req.body.targetRating = null;
    userInteracted.push(req.body);
    // console.log(userInteracted);
    await Users.findByIdAndUpdate(req.session.userId, { userInteracted });

    if (req.body.swiped) {
      const target = await Users.findOne({ username: req.body.targetUsername });
      const targetInteracted = target.userInteracted.filter(
        (target) => target.targetUsername === req.session.currentUser && target.swiped
      );
      console.log(targetInteracted);
      if (targetInteracted.length === 1) res.json({ matched: true });
      else res.json({ matched: false });
    } else {
      res.json({ title: "OK", message: "swiped successful" });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json(dbError);
  }
});

module.exports = router;
