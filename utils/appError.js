const appError = (message, statusCode=500) =>
{
    let error = new Error(message);
    error.statusCode =  statusCode;
    return error
}

module.exports = 
{
    appError
};
