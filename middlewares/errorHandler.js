const errorHandler = (err, req, res, next) =>
{  
    res.status(err.statusCode).json(
    {
        status: "failed",
        message: err.message,
        stack: err.stack,
    })

}

module.exports = errorHandler;
