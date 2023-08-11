const { Schema, model, default: mongoose } = require("mongoose");

const commentSchema = new Schema(

    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        collection:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Collection"
        },
        content: String
    }
)


const Comments = model("Comments", commentSchema);

module.exports = Comments;