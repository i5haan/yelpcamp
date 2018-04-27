var express=require("express");
var router=express.Router({mergeParams:true});
var Campground=require("../models/campground");
var middleware=require("../middleware")


router.get("/",function(req,res)
{
    Campground.find({},function(err,campgrounds)
    {
        if(err)
        {
            console.log(err)
        }
        else
        {
            res.render("./campgrounds/campgrounds",{campgrounds:campgrounds});
        }
    });
});


router.post("/",middleware.isLoggedIn,function(req,res)
{
    console.log(req.body);
    var name=req.body.name;
    var image=req.body.image;
    var desc=req.body.desc;
    var author={
        id:req.user._id,
        username:req.user.username
    };
    var newCampground=new Campground(
        {
            name:name,
            image:image,
            desc:desc,
            author:author
        });
    newCampground.save(function(err,campground)
        {
            if(err)
            {
                console.log(error);
            }
            else
            {
                console.log("Inserted");
                console.log(campground);
            }
        });

    res.redirect("/campgrounds");
    
});


router.get("/new",middleware.isLoggedIn,function(req,res)
{
    res.render("campgrounds/new");
});

router.get("/:id",function(req,res)
{
    var id=req.params.id;
    
    Campground.findById(id).populate("comments").exec(function(err,campground)
        {
            if(err)
            {
                console.log(err);
            }
            else
            {
                console.log(campground);
                res.render("campgrounds/show",{campground:campground});
            }
        });

    
});

router.get("/:id/edit",middleware.checkCampgroundOwnership, function(req,res)
    {

        Campground.findById(req.params.id).populate("comments").exec(function(err,campground)
        {
               res.render("campgrounds/edit",{campground:campground}); 
        });
    
        
    });

router.put("/:id",middleware.checkCampgroundOwnership,function(req,res)
    {
        Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,campground)
            {
                if(err)
                {
                    console.log(err);
                    res.redirect("/campgrounds")
                }
                else
                {
                    res.redirect("/campgrounds/"+req.params.id);
                }
            });
    });

router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res)
    {
        console.log("did i reach here??");
        Campground.findByIdAndRemove(req.params.id,function(err)
            {
                if(err)
                {
                    res.redirect("/campgrounds");
                }
                else
                {
                    res.redirect("/campgrounds");
                }
            });
    });




module.exports=router;