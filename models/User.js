const mongoose = require('mongoose');

const userSchema = new mongoose.Schema
(
    {
        firstName: 
        {
            type:String, 
            required:[true, "Error, firstName is required"]
        },

        lastName: 
        {
            type:String, 
            required:[true, "Error, lastName is required"],
        },

        email: 
        {
            type:String, 
            required:[true, "Error, email is required"],
            unique: [true, "Email taken, please use another name."],
        },

        password: 
        {
            type:String, 
            required:[true, "Error,password is required"]
        },


        isAdmin:
        {
            type:Boolean,
            default:false,
        },

        isBlocked:
        {
            type:Boolean,
            default:false,
        },


        following:
        [{
            type:mongoose.Schema.ObjectId,
            ref:"User"
        }],

        followers:
        [{
            type:mongoose.Schema.ObjectId,
            ref:"User"
        }],

        viewers:
        [{
            type:mongoose.Schema.ObjectId,
            ref:"User"
        }],

        posts:
        [{
            type:mongoose.Schema.ObjectId,
            ref:"Post"
        }],

        likes:
        [{
            type:mongoose.Schema.ObjectId,
            ref:"Post"
        }],

        dislikes:
        [{
            type:mongoose.Schema.ObjectId,
            ref:"Post"
        }],

        comments:
        [{
            type:mongoose.Schema.ObjectId,
            ref:"Comment"
        }],
    
    },
    {
        timestamps: true,
    }
)

const User = mongoose.model("User",userSchema);

module.exports = User;
