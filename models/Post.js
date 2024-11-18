const mongoose = require('mongoose');

const postSchema = new mongoose.Schema
({
    author:
    {
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:[true, "Error, Author is Required!"],
    },
    
    title: 
    {
        type:String, 
        required:[true, "Error, title is required"]
    },

    description: 
    {
        type:String, 
        required:[true, "Error, description is required"]
    },


    viewers:
    [{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    }],

    likers:
    [{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    }],

    dislikers:
    [{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    }],

    comments:
    [{
        type:mongoose.Schema.ObjectId,
        ref:"Comment"
    }],

},

{
    timestamps: true,
});

const Post = mongoose.model("Post",postSchema);
module.exports = Post;
