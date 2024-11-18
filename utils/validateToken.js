require('dotenv').config();

const validateToken = async(token)=>
{
    const jose = require('jose');
    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY)    
    const {payload} = await jose.jwtVerify(token, secret,{}); // will through error if token not valid
    return payload;
}
module.exports = validateToken;
