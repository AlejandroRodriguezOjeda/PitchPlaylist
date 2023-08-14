function isLoggedIn ( req, res, next) {
    if (req.session.user === undefined) {
        res.redirect ("/auth/login")
    } else {
        next ()
    }
}

function isAdmin (req,res,next){
    if (req.session.user === "admin") {
        next ()
    } else {
        res.redirect ("/auth/login")

    }
}

module.exports = {
    isLoggedIn: isLoggedIn,
    isAdmin: isAdmin
  }