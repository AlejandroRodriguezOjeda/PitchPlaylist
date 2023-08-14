const express = require ("express");
const User = require ("../models/User.model");
const router = express.Router();

const {isLoggedIn, isAdmin} =require("../middlewares/auth.middlewares")

const uploader = require("../middlewares/cloudinary.middlewares.js")

router.get("/", isLoggedIn, (req,res,next)=>{
    console.log(req.session.user);

    User.findById(req.session.user._id)
    .then((response)=>{



        res.render("user/profile.hbs",{
            user:response
        })
    })
    .catch((error)=>{
   next(error)
    })
})

router.post ("/upload-profile-pic", uploader.single("photoUrl"), (req, res, next) => {
User.findByIdAndUpdate(req.session.user._id,{
    photoUrl: req.file.path
}) 
.then (()=>{
    res.redirect ("/user")
} )
.catch ((error) => {
    next (error)
})
})




module.exports = router

