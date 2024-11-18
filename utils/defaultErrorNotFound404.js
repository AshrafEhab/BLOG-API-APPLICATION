const { appError } = require("./appError")

const defaultErrorNotFound404 = (req,res,next)=>
{
    next(appError("Provided Path is not Found!",404));
}
module.exports = defaultErrorNotFound404;
