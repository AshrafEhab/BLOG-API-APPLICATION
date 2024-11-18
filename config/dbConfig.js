require('dotenv').config();
const mongoose = require('mongoose');


const dbConfig = async ()=>
{
    try
    {
        //mongoose.set('strictQuery',false);

        await mongoose.connect(process.env.MONGO_DB_URL)
        .then(()=> console.log(`Connected to MongoDB Successfully.!`))
        .catch((err)=>console.log(`Failed to Connect to MongoDB`));    
    } 
    catch (err) 
    {
        console.log("333333333");
    }
}


module.exports = dbConfig;

 