const express = require('express');
const postRouter = express.Router();


const postController  = require('../controllers/postController');
const isLoggedIn = require('../middlewares/isLoggedIn');
const isAdmin    = require('../middlewares/isAdmin');


postRouter.get("/", postController.getAllPosts);
postRouter.get("/:id", postController.getPost);

postRouter.post("/create",isLoggedIn ,postController.createPost);

postRouter.put("/:id/like",isLoggedIn, postController.likePost);
postRouter.put("/:id/unlike",isLoggedIn, postController.unlikePost);
postRouter.put("/:id/dislike",isLoggedIn, postController.dislikePost);
postRouter.put("/:id/undislike",isLoggedIn, postController.undislikePost);
postRouter.put("/edit/:id",isLoggedIn, postController.editPost);


postRouter.delete("/delete/:id", isLoggedIn, postController.deletePost);



module.exports = postRouter;
