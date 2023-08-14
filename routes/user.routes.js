const express = require ("express");
const User = require ("../models/User.model");
const router = express.Router();

const {isLoggedIn, isAdmin} =require("../middlewares/auth.middlewares")




module.exports = router

