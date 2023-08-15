const express = require('express');
const router = express.Router();

const Artist = require("../models/Artist.model.js");
const User = require("../models/User.model.js");
const Collection = require ("../models/Collection.model.js")

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
 
         await Collection.create({
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
        const yourCollections = await Collection.find();
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
        const oneCollection = await Collection.findById(collectionId)
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
        await Collection.findByIdAndDelete(req.params.collectionId)
        console.log("collection id", req.params.collectionId)
        res.redirect("/collection/my-collections")
    }catch(error){
        next(error)
    }
})


module.exports = router;