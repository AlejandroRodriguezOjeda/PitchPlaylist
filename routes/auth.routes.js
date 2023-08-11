const express = require ("express");
const User = require ("../models/User.model");
const router = express.Router();
const bcrypt = require("bcrypt")
// GET /signup para un usuario nuevo para registrarse

router.get ("/signup", (req, res, next) => {

    console.log("signup get route")
    res.render ("auth/signup.hbs");
});

router.post("/signup", async(req,res,next) =>{
console.log(req.body);

const {username , email, password} = req.body

if(username === "" || email === "" || password === "") {
    res.status(400).render("auth/signup.hbs",{
        errorMessage : "Llena todos los campos"
    })
return;
}

try{
    const userFound = await User.findOne ({
        $or: [{email:email}, {username:username}]
    })
    if(userFound !== null ){
        res.status(400).render("auth/signup.hbs",{
            errorMessage : "Este usuario ya existe!"
        })
        return;
    }
    
}catch(error){
        next(error)
    }

const salt =  await bcrypt.genSalt (10)
const passwordHash = await bcrypt.hash(password , salt)


  try{
await User.create({
    username : username ,
    email : email,
    password : passwordHash,
}) 
res.redirect("/")   // CAMBIAR ESTE REDIRECT A LA HOME PAGE
  }catch(error){
next(error)
  }
})

module.exports = router;