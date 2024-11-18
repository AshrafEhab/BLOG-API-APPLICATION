const { appError } = require("../utils/appError.js");
const  User  = require('../models/User');
const  Post  = require('../models/Post');
const  Comment  = require('../models/Comment');
const { passwordHasher, passwordValidator } = require("../utils/passwordUtils.js");
const generateToken = require("../utils/generateToken.js");


const getAllUsers = async (req, res, next) =>
{
    try 
    {
        const users = await User.find().exec();
        if (users)
        {
            res.json(
                {
                    status:"Done Successfully",
                    data:users
                }
            )
        }
        else
        {
            next(appError("No Users Found",400)); 
        }
        
    } 
    catch (error)
    {            
        next(appError("Error",500)); 
    }
}
    
const getUser = async (req, res, next) =>
{
    try 
    {   
        const id = req.params.id;    
        const user = await User.findById(id).exec(); 
        if (user)
        {
            res.json(
                {
                    status:"Done Successfully",
                    data:user
                });    
        }
        else
        {
            next(appError("Invalid id",400)); 
        }
    } 
    catch (error)
    {
        next(appError("Invalid id",400)); 
    }
}       

const createUser = async (req, res, next) =>
{
    try 
    {   
        const hashedPassword =  await passwordHasher(req.body.password);
        let user = new User(
        {
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            password:hashedPassword,
        });
        await user.save();
          
        res.json(
            {
                status:"Created Successfully",
                data:user
            }
        )
    } 
    catch (error)
    {
        next(appError(error.message,400)); 
    }
}

const editUser = async (req, res, next) =>
{
    try 
    {   
        const id = req.params.id;
        let user = await User.findById(id).exec();

        if(req.userId !== id)
        {
            next(appError("Access Denied!",403));
        }

        user = await User.findOneAndUpdate(
        {
            _id:id
        },

        {
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
        },

        {
            new:true
        });

        res.json(
        {
            status:"Edited Successfully",
            data:user
        }
        )
    } 
    catch (error)
    {
        next(appError(error.message,400)); 
    }
} 

const deleteUser = async (req, res, next) =>
{
    try 
    {   
        const id = req.params.id;                
        const user = await User.findById(id).exec();
        
        
        if(req.userId === id)
        {
            await User.deleteOne({_id:id}).exec();  
            res.json(
                {
                    status:"Deleted Successfully",
                }
            )
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
   
const loginUser =  async (req, res, next) =>
{
    try 
    {   
        const {email, password} = req.body;        
        const user = await User.findOne({email:email}).exec();
        if (user.length < 1)
        {
            next(appError("Wrong Email or Password",400)); 
        }
        else
        {
            const isValid = passwordValidator(password, user.password);
            if(!isValid)
            {
                next(appError("Wrong Email or Password",400)); 
            }
            else
            {
                const token = await generateToken(user._id);
                res.json(
                {
                    status:"Logged In Successfully",
                    token,
                })
            }
        }
    } 
    catch (error)
    {
        next(appError("Wrong Email or Password",400)); 
    }
} 

const followUser =  async (req, res, next) =>
{
    try 
    {        
        const followerUserId = req.userId;
        const followedUserId = req.params.id;
        
        const followerUser = await User.findById(followerUserId).exec();
        const followedUser = await User.findById(followedUserId).exec();
        
        const alreadyFollowed = followerUser.following.find(id => id.toString() === followedUserId)

        
        if (alreadyFollowed)
        {
            next(appError("User Already Followed!",400));
        }
        else
        {
            followerUser.following.push(followedUser._id);
            await followerUser.save();
            followedUser.followers.push(followerUser._id);
            await followedUser.save();
            res.json(
            {
                status:"Followed Successfully!"
            });
        }
         
    } 
    catch (error)
    {
        next(appError("Incorrect Id",400)); 
    }
}

const unfollowUser =  async (req, res, next) =>
{
    try 
    {        
        const followerUserId = req.userId;
        const followedUserId = req.params.id;
        
        const followerUser = await User.findById(followerUserId).exec();
        const followedUser = await User.findById(followedUserId).exec();
        
        const userNotFollowed = undefined == followerUser.following.find(id => id.toString() === followedUserId)

        if (userNotFollowed)
        {
            next(appError("User is not Followed!",400));
        }
        else
        {
            followerUser.following = followerUser.following.filter(followed =>followed.toString() !== followedUserId);
            await followerUser.save();            
            followedUser.followers = followedUser.followers.filter(follower =>follower.toString() !== followerUserId);
            await followedUser.save();

            res.json(
            {
                status:"Unfollowed Successfully!"
            });
        }
            
    } 
    catch (error)
    {
        next(appError("Incorrect Id",400)); 
    }
}
   
const viewUser =  async (req, res, next) =>
{
    try 
    {        
        const viewerUserId = req.userId;
        const viewedUserId = req.params.id;
        
        const viewerUser = await User.findById(viewerUserId).exec();
        const viewedUser = await User.findById(viewedUserId).exec();
        
        const alreadyViewed = viewedUser.viewers.find(id => id.toString() === viewerUserId)


        if (alreadyViewed)
        {      
            res.json(
            {
                status:"already viewed!"
            });
        }
        else
        {
            viewedUser.viewers.push(viewerUser._id);
            await viewedUser.save();
            res.json(
            {
                status:"viewed Successfully!"
            });
        }
            
    } 
    catch (error)
    {
        next(appError("Incorrect Id",400)); 
    }
}

const adminBlockUser = async (req, res, next) =>
{
    try 
    {   

        const id = req.params.id;                
        const user = await User.findById(id).exec();
        
        if (user)
        {
            if(user.isBlocked)
            {
                res.json(
                {
                    status:"User Already Blocked!",
                }) 
        
            }
            else
            {           
                user.isBlocked = true;
                await user.save(); 
                res.json(
                {
                    status:"User Blocked Successfully!",
                }) 
            }  
        }

        else
        {        
            next(appError("Invalid id",400)); 
        }

    } 
    catch (error)
    {
        next(appError("Invalid id",400)); 
    }
}   

const adminUnblockUser = async (req, res, next) =>
{
    try 
    {   

        const id = req.params.id;                
        const user = await User.findById(id).exec();
        
        if (user)
        {   
            if(user.isBlocked)
            {
                user.isBlocked = false;
                await user.save(); 
                
                res.json(
                {
                    status:"User Unblocked Successfully!",
                });

        
            }
            else
            {           
                res.json(
                {
                    status:"User already not Blocked!",
                });
            }  
        }

        else
        {        
            next(appError("Invalid id",400)); 
        }

    } 
    catch (error)
    {
        next(appError("Invalid id",400)); 
    }
} 


module.exports = 
{
    getAllUsers,
    getUser,
    createUser,
    deleteUser,
    editUser,
    loginUser,
    followUser,
    unfollowUser,
    viewUser,
    adminBlockUser,
    adminUnblockUser,
    
};
