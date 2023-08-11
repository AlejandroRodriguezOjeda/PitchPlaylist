const { Schema, model } = require("mongoose");

const artistSchema = new Schema(
{
    name:{
        type: String,
        required: true,
    },
    yearBorn:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    photo:{
        type: String,
        required: true
    },
    collection:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection"
    }]
}


)


const Artist = model("Artist", artistSchema);

module.exports = Artist;