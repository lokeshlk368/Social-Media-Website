const User=require('../models/user');
const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField:'email'
},
  function(email,password,done)
  {
      //Find the User and establish the identity
      User.findOne({email:email},function(err,user){
          if(err)
          {
              console.log("Error in finding the --> passport");
              return done(err);
          }
          if(!user || user.password!=password)
          {
              console.log("Invalid Username and password");
              return done(null,false);
          }
        //   If  the User exist
        return done(null,user);

      });
  }
));

// Serializing the user to decide which key is kept 

passport.serializeUser(function(user,done){
    return done(null,user);
});

// Deserialzing the User

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user)
    {
        if(err)
        {
            console.log('Error in finding the user -> passport');
            return done(err);
        }
        return done(null,user);
    });
});

module.exports=passport;

//Check the user is authenticated

passport.checkAuthentication=function(req,res,next)
{
    //If the user is signin then the pass the request to the next function controller
    if(req.isAuthenticated())
    {
        return next();
    }
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser=function(req,res,next)
{
    if(req.isAuthenticated())
    {
        //req.user contain the current signed in the user from cookie and we are just sending to the local for views
        res.locals.user=req.user;
    }
    next();
}
