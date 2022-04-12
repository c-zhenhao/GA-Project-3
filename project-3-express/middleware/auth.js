module.exports = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    console.log(req.session);
    res.status(403).json({ title: "error", message: "not logged in" });
  }
};
