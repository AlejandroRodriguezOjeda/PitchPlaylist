const express = require('express');
const router = express.Router();

const Artist = require("../models/Artist.model.js");

const uploader = require("../middlewares/cloudinary.middlewares.js")

//GET "/all-artists" para ver todos los artistas

router.get ("/all-artists", async (req,res,next) => {
    try{ 
    const allArtists =    
    await Artist.find ()
    // .select({photo:1, name:1})
    .select({name:1})
    
    console.log ("all artists:", allArtists)
    res.render ("artist/all-artists.hbs", {
        allArtists: allArtists
    })
   } catch (error) {
    next (error)
   }
})

//GET "/:artistId" to see one artist´s details
router.get ("/:artistId/info", async(req,res,next)=>{
try {
    const {artistId}  =  req.params;
    console.log ("artistId", req.params)

    const oneArtist=
    await Artist.findById(artistId)
    .select ({name: 1, yearBorn:1, description:1})
    res.render ("artist/artist-info.hbs", {
        oneArtist: oneArtist
    })
    
} catch (error) {
    next (error)
    
}

})

// GET "/new-artist" to create a new artist
router.get ("/new-artist", async (req, res, next) =>{
  res.render ("admin/new-artist.hbs")
})

router.post ("/new-artist", async (req, res, next) =>{
    try {
        
     console.log ("body new artist", req.body)
    Artist.create ({
        name: req.body.name,
        yearBorn: req.body.yearBorn,
        description: req.body.description
    })
    res.redirect("/artist/all-artists")

} catch (error) {
        next (error)
    }
})

router.post("/upload-artist-pic", uploader.single("photo"), async (req,res,next)=>{
 try {
    Artist.create({
        photo: req.file.path
    })
    res.redirect ("/artist/new-artist")
 } catch (error) {
    next (error)
 }
})



module.exports = router;