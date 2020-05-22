// module.exports.profile=function(req,res){
//     res.end("<h1>User profile</h1>");
// }

module.exports.profile=function(req,res)
{
    res.render('users_profile',{
        title:"Profile"
    });
}