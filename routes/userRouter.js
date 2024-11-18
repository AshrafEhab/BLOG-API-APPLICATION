const express = require('express');
const userRouter = express.Router();

const userController = require('../controllers/userController');
const isLoggedIn = require('../middlewares/isLoggedIn');
const isAdmin    = require('../middlewares/isAdmin');


userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", userController.getUser);

userRouter.post("/create", userController.createUser);
userRouter.post("/login", userController.loginUser);

userRouter.put("/follow/:id", isLoggedIn, userController.followUser);
userRouter.put("/unfollow/:id", isLoggedIn, userController.unfollowUser);
userRouter.put("/view/:id", isLoggedIn, userController.viewUser);
userRouter.put("/edit/:id", isLoggedIn, userController.editUser);
userRouter.put("/adminBlockUser/:id",isLoggedIn ,isAdmin, userController.adminBlockUser);
userRouter.put("/adminUnblockUser/:id",isLoggedIn ,isAdmin, userController.adminUnblockUser);

userRouter.delete("/delete/:id", isLoggedIn, userController.deleteUser);



module.exports = userRouter;
