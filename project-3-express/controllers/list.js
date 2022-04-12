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
    const filteredList = user.userInteracted.filter((target) => target.swiped);
    console.log(filteredList);
    const matchedList = [];
    for (let target of filteredList) {
      const returnTarget = await Users.findOne({ username: target.targetUsername });
      returnTarget.userInteracted.forEach((ea) => {
        if (ea.targetUsername === req.session.currentUser && ea.swiped)
          matchedList.push(returnTarget);
      });
    }
    // res.json(filteredList);
    res.json(
      matchedList.map((ea) => ({
        id: ea._id,
        displayName: ea.displayName,
        userRating: ea.Rating,
        imgUrl: ea.imgUrl,
      }))
    );
  } catch (err) {
    console.error(err);
    res.status(400).json(dbError);
  }
});

// router.post("/", auth, async (req, res) => {
//   try {
//     const user = await Users.findById(req.session.userId, { _id: 0, userInteracted: 1 });
//     const userInteracted = user.userInteracted;
//     // req.body.targetRating = null;
//     userInteracted.push(req.body);
//     // console.log(userInteracted);
//     await Users.findByIdAndUpdate(req.session.userId, { userInteracted });

//     if (req.body.swiped) {
//       const target = await Users.findOne({ username: req.body.targetUsername });
//       const targetInteracted = target.userInteracted.filter(
//         (target) => target.targetUsername === req.session.currentUser && target.swiped
//       );
//       console.log(targetInteracted);
//       if (targetInteracted.length === 1) res.json({ matched: true });
//       else res.json({ matched: false });
//     } else {
//       res.json({ title: "OK", message: "swiped successful" });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(400).json(dbError);
//   }
// });

module.exports = router;
