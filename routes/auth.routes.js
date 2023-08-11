const express = require ("express");
const User = require ("../models/User.model");
const router = express.Router();

// GET /signup para un usuario nuevo para registrarse

router.get ("/signup", (req, res, next) => {

    console.log("signup get route")
    res.render ("auth/signup.hbs");
});

module.exports = router;