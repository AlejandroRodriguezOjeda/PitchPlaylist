const express = require('express');
const router = express.Router();

const Artist = require("../models/Artist.model.js");
const User = require("../models/User.model.js");
const Playlist = require ("../models/Playlist.model.js")

router.get ("/new-collection", async (req,res,next) => {
    try {
         const creator = await User.findById(req.session.user._id);
        console.log ("creator", creator)
        res.render ("collection/new-collection.hbs",{
            creator: creator
        })
    } catch (error) {
        next (error)
    }
    
})

router.post ("/new-collection", async (req, res, next) => {
    try {
 
         await Playlist.create({
            creator: req.session.user,
            title: req.body.title,
            // artist: req.session.body,
            info: req.body.info
         })    
         console.log ("post new collection", req.body)
         res.redirect ("/collection/my-collections")
     

    } catch (error) {
        next (error)
    }
   
})

router.get ("/my-collections", async (req, res, next) => {
    try {
        const userId = req.session.user._id
        const yourCollections = await Playlist.find({creator: userId});
        res.render ("user/yourcollections.hbs", {  
        yourCollections: yourCollections
        })
    } catch (error) {
        next (error)
    }
})


router.get ("/:collectionId", async (req, res, next) => {
    try {
        const collectionId = req.params.collectionId;
        const oneCollection = await Playlist.findById(collectionId)
        .populate("creator")
        console.log ("oneCollection", oneCollection._id)
        res.render ("user/onecollection.hbs", {
            oneCollection: oneCollection
        })
        
    } catch (error) {
        next (error)
    }
})


router.post("/:collectionId/delete", async(req,res,next)=>{
    try{
        await Playlist.findByIdAndDelete(req.params.collectionId)
        console.log("collection id", req.params.collectionId)
        res.redirect("/collection/my-collections")
    }catch(error){
        next(error)
    }
})

router.post("/:collectionId/update", async(req,res,next)=>{
    try {
       const playlistUpdated = await Playlist.findByIdAndUpdate(req.params.collectionId)
        console.log("collection update", playlistUpdated)
        res.redirect("/collection/my-collections");
    } catch (error) {
        next(error)
    }
})

module.exports = router;