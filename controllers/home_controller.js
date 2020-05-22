// module.exports.home=function(req,res){
//     res.end("<h1>Express is up for codeial</h1>");
// }

// Rendering to home view engine

module.exports.home=function(req,res)
{
    res.render('home',{
        title:"Home"
    });
}