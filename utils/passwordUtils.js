const bcrypt = require('bcrypt');

const passwordHasher = (password) =>
{
    const saltRounds = 10;

    const hashedPassword = bcrypt.hash(password, saltRounds)
    .then(hash => hash)
    .catch( err => {throw "Error in Hashing Password"});

    return hashedPassword;
}


const passwordValidator = (password, hashedPassword) =>
{
    const validation = bcrypt.compare(password, hashedPassword)
    .then( result => result)
    .catch (err => {throw "Error in Validating Password"});

    return validation;
}



module.exports = 
{
    passwordHasher,
    passwordValidator,
};
