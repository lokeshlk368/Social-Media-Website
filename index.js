// Requrire the express
const express=require('express');
const app=express();
const port=8000;

//Use Layout Library

const expresslayouts=require('express-ejs-layouts');
app.use(expresslayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// Use express router
app.use('/',require('./routes'));

// Setup view engine
app.set('view engine','ejs');
app.set('views','./views');

//Setting assets folder
app.use(express.static('./assets'));

//Use database

const db=require('./config/mongoose');


app.listen(port,function(err)
{
    if(err)
    {
        console.log(`Error in running the server:{err}`);
        return;
    }
    console.log(`Server is running with port:${port}`);
})
