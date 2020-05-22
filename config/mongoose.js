const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/Social_Media_Development');

const db=mongoose.connection;

db.on('error',console.error.bind(console,"Error Connecting to mongoDB"));

db.once('open',function(){
    console.log("Connecting to database");
});

module.exports=db;