const User=require('../models/user');

// module.exports.profile=function(req,res){
//     res.end("<h1>User profile</h1>");
// }


module.exports.profile=function(req,res)
{
    res.render('users_profile',{
        title:"Profile"
    });
}
module.exports.signUp=function(req,res)
{
    res.render('user_sign_up',{
        title:"SignUp page"
    })
}

module.exports.signIn=function(req,res)
{
    res.render('user_sign_in',{
        title:"SignIn page"
    })
}


// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }

    });
}