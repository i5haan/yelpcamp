var express=require("express");
var router=express.Router({mergeParams:true});
var Comment=require("../models/comment");
var Campground=require("../models/campground");
var middleware=require("../middleware")

router.get("/new",middleware.isLoggedIn,function(req,res)
    {
        var id=req.params.id;
        Campground.findById(id,function(err,campground)
            {
                if(err)
                {
                    console.log(error);
                }
                else
                {
                    res.render("comments/new",{campground:campground})
                }
            });
        
    });

router.post("/",middleware.isLoggedIn,function(req,res)
    {
        Campground.findById(req.params.id,function(err,campground)
            {
                if(err)
                {
                    console.log(err);
                    res.redirect("/campgrounds");
                }
                else
                {
                    Comment.create(req.body.comment,function(err,comment)
                        {
                            if(err)
                            {
                                console.log(err);
                            }
                            else
                            {
                                comment.author.id=req.user._id;
                                comment.author.username=req.user.username;
                                comment.save();
                                campground.comments.push(comment._id);
                                campground.save();
                                res.redirect("/campgrounds/"+req.params.id);
                            }
                        });
                }
            });
    });

router.get("/:c_id/edit",middleware.checkCommentOwnership,function(req,res)
    {
        Comment.findById(req.params.c_id,function(err,comment)
        {
            if(err)
            {
                console.log(err);
            }
            else
            {
            res.render("comments/edit",{comment:comment,campground_id:req.params.id});
            }
        });
        
    });

router.put("/:c_id",middleware.checkCommentOwnership,function(req,res)
{
    Comment.findByIdAndUpdate(req.params.c_id,req.body.comment,function(err,comment)
    {
        if(err)
        {
            res.redirect("/campgrounds/"+req.params.id);
        }
        else
        {
            res.redirect("/campgrounds/"+req.params.id);   
        }
    });
});

router.delete("/:c_id",middleware.checkCommentOwnership,function(req,res)
    {
         Comment.findByIdAndRemove(req.params.c_id,function(err)
            {
                if(err)
                {
                    res.redirect("back")
                }
                else
                {
                    res.redirect("/campgrounds/"+req.params.id);
                }
            });
    });

module.exports=router;