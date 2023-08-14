const express = require('express');
const router = express.Router();

const Artist = require("../models/Artist.model.js");

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

// GET "/new-artist" to create a new artist
router.get ("/new-artist", async (req, res, next) =>{
  res.render ("admin/new-artist")
})

router.post ("/new-artist", async (req, res, next) =>{
    try {
        
     console.log ("body new artist", req.body)
    Artist.create ({
        name: req.body.name,
        yearBorn: req.body.yearBorn,
        description: req.body.description,
        // photo: req.body.photo
    })
    res.redirect("/all-artists")

} catch (error) {
        next (error)
    }
})

module.exports = router;