const User = require('../models/User');
const { appError } = require('../utils/appError');
    
const isAdmin =  async (req, res, next) =>
{
        try 
        {    
            // this middleware should come after isLogin middleware so id is ready in userId
            const user = await User.findById(req.userId).exec();
            if (user.isAdmin)
            {
                next();
            }
            else
            {
                next(appError("Access Denied!",403));
            }
        } 
        catch (error)
        {
            next(appError("Access Denied!",403));
        }
}


module.exports = isAdmin;
