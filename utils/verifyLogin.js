const verifyLogin = (email, password) =>
{
  const user = await User.findOne({email:email}).exec();
  

  if (user.length < 1)
    {
        next(appError("Wrong Email or Password",400)); 
    }
    else
    {
        const isValid = passwordValidator(password, user.password);
        if(!isValid)
        {
            next(appError("Wrong Email or Password",400)); 
        }
        else
        {
            const token = generateToken(user._id);
            res.json(
            {
                status:"Logged In Successfully",
                token,
            })
        }
    }
} 
catch (error)
{
    next(appError("Wrong Email or Password",400)); 
}


}

const loginUser =  async (req, res, next) =>
  {
      try 
      {   
          const {email, password} = req.body;        
  } 