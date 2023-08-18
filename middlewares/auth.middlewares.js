function isLoggedIn(req, res, next) {
  if (req.session.user === undefined) {
    res.redirect("/auth/login");
  } else {
    next();
  }
}

function isAdmin(req, res, next) {
  if (req.session.user.role === "admin") {
    next();
  } else {
    res.redirect("/auth/login");
  }
}

function updateLocals(req, res, next) {
  if (req.session.user === undefined) {
    res.locals.isUserActive = false;
    res.locals.isAdmin = false;
  } else {
    res.locals.isUserActive = true;
    res.locals.isAdmin = req.session.user.role === "admin";
  }

  next();
}

module.exports = {
  isLoggedIn: isLoggedIn,
  isAdmin: isAdmin,
  updateLocals: updateLocals,
};
