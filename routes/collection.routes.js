const express = require("express");
const router = express.Router();

const Artist = require("../models/Artist.model.js");
const User = require("../models/User.model.js");
const Playlist = require("../models/Playlist.model.js");

const { isLoggedIn, isAdmin } = require("../middlewares/auth.middlewares");

router.get("/new-collection", isLoggedIn, async (req, res, next) => {
  try {
    const creator = await User.findById(req.session.user._id);
    res.render("collection/new-collection.hbs", {
      creator: creator,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/new-collection", isLoggedIn, async (req, res, next) => {
  try {
    await Playlist.create({
      creator: req.session.user,
      title: req.body.title,
      info: req.body.info,
    });
    res.redirect("/collection/my-collections");
  } catch (error) {
    next(error);
  }
});

router.get("/my-collections", isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.session.user._id;
    const yourCollections = await Playlist.find({ creator: userId });
    res.render("user/yourcollections.hbs", {
      yourCollections: yourCollections,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/all-collections", isLoggedIn, async (req, res, next) => {
  try {
    const allPlaylists = await Playlist.find();
    res.render("collection/all-collections.hbs", {
      allPlaylists: allPlaylists,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:collectionId", isLoggedIn, async (req, res, next) => {
  try {
    const collectionId = req.params.collectionId;
    const oneCollection = await Playlist.findById(collectionId).populate(
      "creator"
    );
    const allArtists = await Playlist.findById(collectionId).populate("artist");
    const cloneAllArtists = JSON.parse(JSON.stringify(allArtists.artist));

    res.render("user/onecollection.hbs", {
      oneCollection: oneCollection,
      allArtists: cloneAllArtists,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:collectionId/update", isLoggedIn, async (req, res, next) => {
  try {
    const { collectionId } = req.params;
    const onePlaylist = await Playlist.findByIdAndUpdate(collectionId).populate(
      "creator"
    );

    const allArtists = await Playlist.findById(collectionId).populate("artist");
    const cloneAllArtists = JSON.parse(JSON.stringify(allArtists.artist));
    res.render("collection/edit-collection.hbs", {
      onePlaylist: onePlaylist,
      allArtists: cloneAllArtists,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/:collectionId/update", isLoggedIn, async (req, res, next) => {
  try {
    const { creator, title, artist, info } = req.body;
    const onePlaylist = await Playlist.findByIdAndUpdate(
      req.params.collectionId,
      {
        creator: creator,
        title: title,
        artist: artist,
        info: info,
      }
    );
    res.redirect(`/collection/${onePlaylist._id}`);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/:collectionId/removed-from-a-collection/:artistId",
  isLoggedIn,
  async (req, res, next) => {
    try {
      const { collectionId } = req.params;
      const { artistId } = req.params;

      const playlistUpdated = await Playlist.findByIdAndUpdate(collectionId, {
        $pull: { artist: artistId },
      });

      res.redirect(`/collection/${collectionId}`);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/:collectionId/delete", isLoggedIn, async (req, res, next) => {
  try {
    await Playlist.findByIdAndDelete(req.params.collectionId);
    res.redirect("/collection/my-collections");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
