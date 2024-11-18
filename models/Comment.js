const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema
(
    {
        author:
        {
            type:mongoose.Schema.ObjectId,
            ref:"User",
            required:[true, "Error, Author is Required!"],
        },

        post:
        {
            type:mongoose.Schema.ObjectId,
            ref:"Post"
        },

        description:
        {
            type:String,
            required:[true, "Error, Comment Can't be Empty"]
        },
    },
    {
        timestamps: true,
    }
)

const Comment = mongoose.model("Comment",commentSchema);

module.exports = Comment;
