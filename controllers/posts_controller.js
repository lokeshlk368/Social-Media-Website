// module.exports.post=function(req,res)
// {
//     res.end("<h1>users Post</h1>");
// }
const Post=require('../models/post');
const Comment=require('../models/comment');
module.exports.create=function(req,res)
{
    Post.create({
        content:req.body.content,
        user:req.user._id       
    },function(err,post)
    {
        if(err)
        {
            console.log("Error in creating a post");
            return;
        }
        return res.redirect('back');
    });
}

module.exports.destroy=function(req,res)
{

    console.log(req.params.id);
    // Find weather the post is exit in database or not
    Post.findById(req.params.id,function(err,post){
        // .id means converting objectid into string id
        if(post.user==req.user.id)
        {
            console.log(post.user);
            console.log(req.user._id);
            console.log(req.user.id);
            post.remove();
            Comment.deleteMany({post:req.params.id},function(err){
                return res.redirect('back');
            });
        }
        else
        {
            return res.redirect('back');
        }
    })
}