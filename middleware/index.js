var Campground=require("../models/campground")
var Comment=require("../models/comment")
var middlewareObj={};

middlewareObj.checkCampgroundOwnership=function (req,res,next)
{
    if(req.isAuthenticated())
        {
            Campground.findById(req.params.id,function(err,campground)
            {
                if(err)
                {
                    console.log(err);
                    req.flash("error","Campground Not Found :)"); 
                    res.redirect("back");
                }
                else
                {
                    if(campground.author.id.equals(req.user._id))
                    {
                        next();
                    }
                    else
                    {
                        req.flash("error","You dont have Permission");
                        res.redirect("back");
                    }
                    
                }
            });
        }
        else
        {
            req.flash("error","You need to be Logged in!"); 
            res.redirect("back");
        }
}

middlewareObj.checkCommentOwnership=function(req,res,next)
{
    if(req.isAuthenticated())
    {
        Comment.findById(req.params.c_id,function(err,comment)
            {
                if(err)
                {
                    console.log(err);
                    res.redirect("back");
                }
                else
                {
                    if(comment.author.id.equals(req.user.id))
                    {
                        next();
                    }
                    else
                    {
                        res.redirect("back");
                    }
                }
            });
    }
    else
    {
        req.flash("error","You need to be Logged in!"); 
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn=function(req,res,next)
{
    if(req.isAuthenticated())
    {
        return next();
    }
    req.flash("error","You need to be Logged in!");
    res.redirect("/login");
}
module.exports=middlewareObj