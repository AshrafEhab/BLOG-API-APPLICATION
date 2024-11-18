const generateToken = async (id)=>
{
    const jose = require('jose');
    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY)
    const alg = 'HS256'
    const token = await new jose.SignJWT({userId:id})
    .setProtectedHeader({ alg })
    .setExpirationTime('2h')
    .sign(secret);
    return token;
}
module.exports = generateToken;
