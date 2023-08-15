const { Schema, model, default: mongoose } = require("mongoose");


const playlistSchema = new Schema(
    {
        creator:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        title:{
            type: String,
            // required: true
        },
        artist:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Artist",
        }],
        info: String
        
    }
)



const Playlist = model("Playlist", playlistSchema);

module.exports = Playlist