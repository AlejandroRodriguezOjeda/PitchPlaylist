const express = require('express');
const router = express.Router();

const { updateLocals } = require("../middlewares/auth.middlewares.js")
router.use(updateLocals)



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

const artistRouter = require ("./artist.routes.js")
router.use("/artist", artistRouter)

const collectionRouter = require ("./collection.routes.js")
router.use("/collection", collectionRouter)


module.exports = router;
