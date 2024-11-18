const User = require('../models/User');
const { appError } = require('../utils/appError');
const validateToken = require('../utils/validateToken');
    
const isLoggedIn =  async (req, res, next) =>
{
        try 
        {    
            const token = req.headers["authorization"].split(" ")[1];
            const payload = await validateToken(token);
            const userId = payload.userId;
            await User.findById(userId).exec();
            req.userId = userId;
            next();
        } 
        catch (error)
        {
            next(appError("Invalid or Expired Token!",400)); 
        }
}


module.exports = isLoggedIn;
