const express = require("express");
const User = require("../models/User.model");
const router = express.Router();
const bcrypt = require("bcrypt");

const {isLoggedIn, isAdmin} = require("../middlewares/auth.middlewares")
// GET /signup para un usuario nuevo para registrarse

router.get("/signup", (req, res, next) => {
  console.log("signup get route");
  res.render("auth/signup.hbs");
});

router.post("/signup", async (req, res, next) => {
//   console.log(req.body);

  const { username, email, password } = req.body;

  if (username === "" || email === "" || password === "") {
    res.status(400).render("auth/signup.hbs", {
      errorMessage: "Llena todos los campos",
    });
    return;
  }

  try {
    const userFound = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });
    if (userFound !== null) {
      res.status(400).render("auth/signup.hbs", {
        errorMessage: "Este usuario ya existe!",
      });
      return;
    }
  } catch (error) {
    next(error);
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  try {
    await User.create({
      username: username,
      email: email,
      password: passwordHash,
    });
    res.redirect("/"); // CAMBIAR ESTE REDIRECT A LA HOME PAGE
  } catch (error) {
    next(error);
  }
});

// GET "/login" to render login.hbs
router.get("/login", (req, res, next) => {
  res.render("auth/login.hbs");
});

// POST "/login" to verify user´s info
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const userFound = await User.findOne({ username: username });
    if (userFound === null) {
      // console.log ("userFound in psot login funciona")
      res.status(400).render("auth/login.hbs", {
        errorMessage: "Are you sure we´ve met before? Try again",
      });
      return;
    }

    const isPasswordOk = await bcrypt.compare(password, userFound.password);

    if (isPasswordOk === false) {
      res.status(400).render("auth/login.hbs", {
        errorMessage: "This is not your password",
      });
      return;
    }

    req.session.user = {
      _id: userFound._id,
      email: userFound.email,
      role: userFound.role,
    };

    req.session.save(() => {
      res.redirect("/main-page");
    });
  } catch (error) {
    next(error);
  }
});

// GET "/auth/logout" to close a session
router.get("/logout", isLoggedIn, (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
