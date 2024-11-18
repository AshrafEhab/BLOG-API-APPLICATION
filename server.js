const express = require('express');
const app = express();

require('dotenv').config();


/* importing configrations */
const dbConfig  = require('./config/dbConfig');

/*importing routers */
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');
const commentRouter = require('./routes/commentRouter');

const defaultErrorNotFound404 = require('./utils/defaultErrorNotFound404');
const errorHandler = require('./middlewares/errorHandler');



/* defining needed variables */
const PORT = process.env.PORT || 9000;

/* middlewares */
app.all("/",(req,res)=>res.json({status:"Welcome Page"}))
app.use(express.json());

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

app.all("*",defaultErrorNotFound404);
app.use(errorHandler);






dbConfig();
app.listen(PORT, console.log(`Server is listening to port ${PORT} ...`));

