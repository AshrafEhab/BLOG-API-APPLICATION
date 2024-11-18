const Post = require("../models/Post");
const User = require("../models/User");
const { appError } = require("../utils/appError");

const getAllPosts = async (req,res,next) =>
{
    try 
    {
        const posts = await Post.find().exec();
        if (posts)
        {
            res.json(
                {
                    status:"Done Successfully",
                    Posts:posts
                }
            )
        }
        else
        {
            next(appError("No Posts Found",400)); 
        }
        
    } 
    catch (error)
    {            
        next(appError("Error",500)); 
    }
}

const getPost = async (req,res,next) =>
{
    try 
    {   
        const id = req.params.id;    
        const post = await Post.findById(id).exec(); 
        if (post)
        {
            res.json(
                {
                    status:"Done Successfully",
                    Post:post
                });    
        }
        else
        {
            next(appError("Invalid Post id",400)); 
        }
    } 
    catch (error)
    {
        next(appError("Invalid Post id",400)); 
    }
}       
       

const createPost = async (req,res,next) =>
{
    try 
    {   
        const author = await User.findById(req.userId).exec();

        let post = new Post(
        {
            author : author._id,
            title : req.body.title,
            description : req.body.description,
        });   
        await post.save();

        author.posts.push(post._id);
        await author.save();
          
        res.json(
            {
                status:"Created Successfully",
                data:post
            }
        )
    } 
    catch (error)
    {
        next(appError(error.message,400)); 
    }
}


const deletePost = async (req, res, next) =>
{
    try 
    {   
        const postId = req.params.id;
        const post = await Post.findById(postId).exec();

        const authorId = post.author.toString();     

        if(req.userId === authorId)
        {
            await Post.deleteOne({_id:postId}).exec();  
            const author = await User.findById(authorId).exec();
            author.posts = author.posts.filter(post =>post.toString() !== postId);
            author.save();
            res.json(
            {
                status:"Deleted Successfully",
            });
        }
        else
        {
            next(appError("Access Denied!",403));
        }
        
    } 
    catch (error)
    {
        next(appError("Invalid id",400)); 
    }
}  


const editPost = async (req, res, next) =>
{
    try 
    {   
        const id = req.params.id;
        let post = await Post.findById(id).exec();
        
        const authorId = post.author.toString();  
        if(req.userId !== authorId)
        {
            next(appError("Access Denied!",403));
        }
        

        post = await Post.findOneAndUpdate(
            {
                _id:id
            },

            {
                title:req.body.title,
                description:req.body.description,
            },

            {
                new:true
            });

        res.json(
        {
            status:"Edited Successfully",
            data:post
        }
        )
    } 
    catch (error)
    {
        next(appError("Invalid Id",400)); 
    }
} 


const likePost = async (req, res, next) =>
{
    try 
    {   
        const postId = req.params.id;
        const likerId = req.userId;
        const post  = await Post.findById(postId).exec();
        if (post)
        {
            const liker = await User.findById(likerId).exec();

            if(liker.likes.includes(post._id))
            {
                next(appError("Already Liked",400));
            }
            else
            {
                post.likers.push(liker._id);
                post.save();
                liker.likes.push(post._id);
                liker.save();
                res.json(
                {
                    status:"Liked Successfully",
                    data:post
                });
            }
        }

        else
        {
            next(appError("Invalid Post Id",400)); 
        }
    } 
    catch (error)
    {
        next(appError("Invalid Post Id",400)); 
    }
} 

const unlikePost = async (req, res, next) =>
{
    try 
    {   
        const postId = req.params.id;
        const unlikerId = req.userId;
        const post  = await Post.findById(postId).exec();
        if (post)
        {
            const unliker = await User.findById(unlikerId).exec();
            if (unliker.likes.includes(post._id))
            {                    
                unliker.likes = unliker.likes.filter(post => post !== post._id);
                unliker.save();
                post.likers = post.likers.filter(liker => liker.toString() !== unliker._id.toString());
                post.save();
                res.json(
                {
                    status:"Unliked Successfully",
                    data:post
                });
            }
            else
            {
                next(appError("Already Unliked",400));
            }

        }

        else
        {
            next(appError("Invalid Post ID",400)); 
        }
    } 
    catch (error)
    {
        next(appError("Invalid Post Id",500)); 
    }
} 
 
const dislikePost = async (req, res, next) =>
{
    try 
    {   
        const postId = req.params.id;
        const dislikerId = req.userId;
        const post  = await Post.findById(postId).exec();
        if (post)
        {
            const disliker = await User.findById(dislikerId).exec();

            if(disliker.dislikes.includes(post._id))
            {
                next(appError("Already disliked",400));
            }
            else
            {
                post.dislikers.push(disliker._id);
                post.save();
                disliker.dislikes.push(post._id);
                disliker.save();
                res.json(
                {
                    status:"disliked Successfully",
                    data:post
                });
            }
        }

        else
        {
            next(appError("Invalid Post Id",400)); 
        }
    } 
    catch (error)
    {
        next(appError("Invalid Post Id",400)); 
    }
} 
    
const undislikePost = async (req, res, next) =>
{
    try 
    {   
        const postId = req.params.id;
        const undislikerId = req.userId;
        const post  = await Post.findById(postId).exec();
        if (post)
        {
            const undisliker = await User.findById(undislikerId).exec();
            if (undisliker.dislikes.includes(post._id))
            {                    
                undisliker.dislikes = undisliker.dislikes.filter(post => post !== post._id);
                undisliker.save();
                post.dislikers = post.dislikers.filter(disliker => disliker.toString() !== undisliker._id.toString());
                post.save();
                res.json(
                {
                    status:"Undisliked Successfully",
                    data:post
                });
            }
            else
            {
                next(appError("Already Undisliked",400));
            }

        }

        else
        {
            next(appError("Invalid Post ID",400)); 
        }
    } 
    catch (error)
    {
        next(appError("Invalid Post Id",500)); 
    }
} 
    

module.exports = 
{
    createPost,
    getAllPosts,
    getPost,
    deletePost,
    editPost,
    likePost, 
    unlikePost,
    dislikePost,
    undislikePost,
};
