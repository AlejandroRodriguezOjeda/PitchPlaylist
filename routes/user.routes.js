const express = require ("express");
const User = require ("../models/User.model");
const router = express.Router();

const {isLoggedIn, isAdmin} =require("../middlewares/auth.middlewares")

const uploader = require("../middlewares/cloudinary.middlewares.js")

router.get("/", isLoggedIn, (req,res,next)=>{
    console.log(req.session.user);
    const userId = req.params.userid

    User.findById(userId)
    .then((response)=>{
        console.log(response)


        res.render("user/profile.hbs",{
            user:response
        })
    })
    .catch((error)=>{
   next(error)
    })
})




module.exports = router

