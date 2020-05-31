// Requrire the express
const express=require('express');
const cookieParser=require('cookie-parser');

const app=express();
const port=8000;


app.use(express.urlencoded());
app.use(cookieParser());

// Use SASS Library
const sassMiddleware=require('node-sass-middleware');
app.use(sassMiddleware({
      src:'./assets/scss',
      dest:'./assets/css',
      debug:true,
      outputStyle:'extended',
      prefix:'/css'
})); 


//Use Layout Library

const expresslayouts=require('express-ejs-layouts');
app.use(expresslayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// Setup view engine
app.set('view engine','ejs');
app.set('views','./views');

//Use database

const db=require('./config/mongoose');
const passport=require('passport');
const session=require('express-session');
const passportLocal=require('./config/passport-local-strategy');

const MongoStore=require('connect-mongo')(session);

//Setting assets folder
app.use(express.static('./assets'));

app.use(session({
    name:'Social-Media-Website',
    secret:'blahSomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:new MongoStore(
        {
            mongooseConnection:db,
            autoRemove:'disabled'
        },
        function(err)
        {
            console.log(err || 'connect mongodb setup ok');
        })
}));



app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


// Use express router
app.use('/',require('./routes'));

app.listen(port,function(err)
{
    if(err)
    {
        console.log(`Error in running the server:{err}`);
        return;
    }
    console.log(`Server is running with port:${port}`);
})
