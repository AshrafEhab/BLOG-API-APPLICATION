const express = require('express');
const commentRouter = express.Router();

const isLoggedIn = require('../middlewares/isLoggedIn');
const isAdmin    = require('../middlewares/isAdmin');
const commentController = require('../controllers/commentController');


commentRouter.get("/", commentController.getAllComments);
commentRouter.get("/:id", commentController.getComment);

commentRouter.post("/create",isLoggedIn, commentController.createComment);

commentRouter.put("/edit/:id", isLoggedIn, commentController.editComment);

commentRouter.delete("/delete/:id", isLoggedIn, commentController.deleteComment);


module.exports = commentRouter;
