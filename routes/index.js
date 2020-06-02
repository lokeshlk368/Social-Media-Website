const express=require('express');

const router=express.Router();

// console.log("Router is working sucessfully");
const homeControllers=require('../controllers/home_controller');

router.get('/',homeControllers.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));
module.exports=router;