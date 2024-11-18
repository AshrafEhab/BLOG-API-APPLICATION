const Comment = require("../models/Comment");
const Post = require("../models/Post");
const User = require("../models/User");
const { appError } = require("../utils/appError");

const getAllComments = async (req,res,next) =>
{
    try 
    {
        const comments = await Comment.find().exec();
        if (comments)
        {
            res.json(
                {
                    status:"Done Successfully",
                    comments:comments
                }
            )
        }
        else
        {
            next(appError("No Comments Found",400)); 
        }
        
    } 
    catch (error)
    {            
        next(appError("Error",500)); 
    }
}

const getComment = async (req,res,next) =>
{
    try 
    {   
        const id = req.params.id;    
        const comment = await Comment.findById(id).exec(); 
        if (comment)
        {
            res.json(
                {
                    status:"Done Successfully",
                    comment:comment
                });    
        }
        else
        {
            next(appError("Invalid Comment id",400)); 
        }
    } 
    catch (error)
    {
        next(appError("Invalid Comment id",400)); 
    }
}       
       

const createComment = async (req,res,next) =>
{
    try 
    {   
        const author = await User.findById(req.userId).exec();
        const post   = await Post.findById(req.body.post).exec();
        let comment = new Comment(
        {
            author : author._id,
            post : post._id,
            description : req.body.description,
        });   
        await comment.save();

        author.comments.push(comment._id);
        await author.save();
        
        post.comments.push(comment._id);
        await post.save();
        

        res.json(
        {
            status:"Created Successfully",
            data:comment
        });
    } 
    catch (error)
    {
        next(appError(error.message,400)); 
    }
}


const deleteComment = async (req, res, next) =>
{
    try 
    {   
        const commentId = req.params.id;
        const comment = await Comment.findById(commentId).exec();
        const authorId = comment.author.toString();  

        if(req.userId !== authorId)
        {
            next(appError("Access Denied!",403));
        }
       

        await comment.deleteOne({_id:commentId}).exec();  
        // remove the comment from author
        const author = await User.findById(authorId).exec();
        author.comments = author.comments.filter(comment =>comment.toString() !== commentId);
        author.save();

        // remove the comment from post
        const post = await Post.findById(comment.post).exec()
        post.comments = post.comments.filter(comment =>comment.toString() !== commentId);
        post.save();

        res.json(
        {
            status:"Deleted Successfully",
        });
    
        
    } 
    catch (error)
    {
        next(appError("Invalid id",400)); 
    }
}  

const editComment = async (req, res, next) =>
{
    try 
    {   
        const id = req.params.id;
        let comment = await Comment.findById(id).exec();        
        const authorId = comment.author.toString(); 

        if(req.userId !== authorId)
        {
            next(appError("Access Denied!",403));
        }
       
        comment = await Comment.findOneAndUpdate(
            {
                _id:id
            },
            {
                description:req.body.description,
            },
            {
                new:true
            });

        res.json(
        {
            status:"Edited Successfully",
            data:comment
        });
    } 
    catch (error)
    {
        next(appError("Invalid Comment ID",400)); 
    }
} 

module.exports = 
{
    createComment,
    getAllComments,
    getComment,
    deleteComment,
    editComment,
};
