const express = require('express');
const router = express.Router();



/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


router.get("/main-page", (req,res,next)=>{
  res.render ("main-page.hbs")
})
const authRouter = require("./auth.routes.js")
router.use("/auth", authRouter)

const userRouter = require ("./user.routes.js")
router.use("/user", userRouter)

module.exports = router;
