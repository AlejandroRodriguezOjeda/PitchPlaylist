const { Schema, model, default: mongoose } = require("mongoose");


const collectionSchema = new Schema(
    {
        creator:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        title:{
            type: String,
            required: true
        },
        artist:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Artist",
        }],
        info: String
        
    }
)



const Collection = model("Collection", collectionSchema);

module.exports = Collection