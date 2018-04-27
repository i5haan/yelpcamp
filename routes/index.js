var express=require("express");
var router=express.Router();
var passport=require("passport");
var User=require("../models/user")

router.get("/",function(req,res)
{
    res.render("landing");
});

//-------------------------------
//==========Auth Routes==========
//-------------------------------


//Register

router.get("/register",function(req,res)
    {
        res.render("register");
    });

router.post("/register",function(req,res)
    {
        User.register(new User({username:req.body.username,email:req.body.email}),req.body.password, function(err,user)
        {
            if(err) 
            {
                console.log(err.message);
                return res.render('register',{error:err.message});
            }
            passport.authenticate("local")(req,res,function()
                {
                    res.redirect("/campgrounds");
                });
        });
    });

//Login

router.get("/login",function(req,res)
    {
        res.render("login");
    });

router.post("/login",passport.authenticate("local",
{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}),function(req,res)
    {

    });

//Logout

router.get("/logout",function(req,res)
    {
        req.logout();
        req.flash("success","Logged You Out")
        res.redirect("/campgrounds");
    });

function isLoggedIn(req,res,next)
{
    if(req.isAuthenticated())
    {
        return next();
    }
    res.redirect("/login");
}

module.exports=router;