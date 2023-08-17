const express = require('express');
const router = express.Router();

const Artist = require("../models/Artist.model.js");
const Playlist = require("../models/Playlist.model.js")


const uploader = require("../middlewares/cloudinary.middlewares.js");
const {isLoggedIn, isAdmin} = require("../middlewares/auth.middlewares")


//GET "/all-artists" para ver todos los artistas

router.get ("/all-artists", isLoggedIn, async (req,res,next) => {
    try{ 
    const allArtists = await Artist.find().select({name:1});
    
    // .select({photo:1, name:1})
    console.log ("all artists:", allArtists)
    console.log(res.locals);
    
    res.render ("artist/all-artists.hbs", {
        allArtists: allArtists,
       
    })
   } catch (error) {
    next (error)
   }
})

//GET "/artist/:artistId/info" to see one artist´s details
router.get ("/:artistId/info", isLoggedIn, async(req,res,next)=>{
try {
    const {artistId}  =  req.params;
    
    const yourPlaylist = await Playlist.find({creator: req.session.user._id })
    .populate("_id")
    const oneArtist=
    await Artist.findById(artistId)
    // console.log("aqui la playlist", yourPlaylist);
    res.render ("artist/artist-info.hbs", {
        oneArtist: oneArtist,
        yourPlaylist : yourPlaylist
    })

} catch (error) {
    next (error)
}
})

router.post ("/:artistId/added-to-a-collection", isLoggedIn, async(req,res,next)=>{
    try {
        const {artistId}  =  req.params;
        const {collection} = req.body;
        console.log ("artistId", req.params)
        console.log ("req body", req.body)
        const playlistUpdated = await Playlist.findByIdAndUpdate(
            collection,
            { $addToSet: { artist: artistId}}); 
             console.log ("collection id", collection)
             console.log("collection update", playlistUpdated);
           
        res.redirect("/collection/my-collections");
        
    } catch (error) {
        next (error)
    }
    })

    
router.post ("/:collectionId/artist-removed-from-a-collection", isLoggedIn, async(req,res,next)=>{  
    
    try {
        const {artistId}  =  req.body;
        const {collection} = req.params;
      
        const playlistUpdated = await Playlist.findByIdAndUpdate(
            collection,
            { $pull: { artist: artistId}}); 
             console.log ("collection id", collection)
             console.log("collection update", playlistUpdated);
           
           
        res.redirect("/collection/my-collections");
      console.log ("artist removed")
        
    } catch (error) {
        next (error)
    }
    })

// GET "/new-artist" to create a new artist
router.get ("/new-artist", isLoggedIn, isAdmin, async (req, res, next) =>{
  res.render ("admin/new-artist.hbs")
})

router.post ("/new-artist",uploader.single("photo"), isLoggedIn, isAdmin,async (req, res, next) =>{
    try {
        
     console.log ("body new artist", req.body)
    // if (typeof(req.file.path) !== undefined) {  
        await Artist.create ({
        name: req.body.name,
        yearBorn: req.body.yearBorn,
        description: req.body.description,
        photo: req.file.path
    })
    res.redirect("/artist/all-artists")
// }  else {
//         await Artist.create ({
//             name: req.body.name,
//             yearBorn: req.body.yearBorn,
//             description: req.body.description,
//             photo : undefined
//          })}
   
} catch (error) {
        next (error)
    }
})



router.get("/:artistId/update", isLoggedIn, isAdmin, async (req,res,next)=>{
    try{

        const response = await Artist.findById(req.params.artistId)
        console.log("response get update", response);

res.render("admin/edit-artist.hbs",{
    oneArtist: response,
})

    }catch(error){
next(error)
    }
})

router.post("/:artistId/update", uploader.single("photo"),isLoggedIn, isAdmin, async (req,res,next)=>{

try {
    const { name, yearBorn, description, photo} = req.body
    console.log ("req.body en post update", req.body)

  const esteLibro = 
  await Artist.findByIdAndUpdate(req.params.artistId,{
    name : name, 
    yearBorn : yearBorn,
    description : description,
    photo : photo
  })
res.redirect("/artist/all-artists")
console.log ("updated artist", esteLibro)

} catch (error) {
    next(error)
}
})



router.post("/:artistId/delete", isLoggedIn, isAdmin, async(req,res,next)=>{
    try{
        await Artist.findByIdAndDelete(req.params.artistId)
        console.log("delete")
        res.redirect("/artist/all-artists")
    }catch(error){
        next(error)
    }
})



module.exports = router;