var express=require("express"),
    mongoose=require("mongoose"),
    passport=require("passport"),
    bodyParser=require("body-parser"),
    LocalStrategy=require("passport-local"),
    flash=require("connect-flash")
    passportLocalMongoose=require("passport-local-mongoose"),
    User=require("./models/user"),
    app=express(),
    seedDB= require("./seed"),
    methodOverride=require("method-override");

var indexRoutes=require("./routes/index");
var campgroundRoutes=require("./routes/campgrounds");
var commentRoutes=require("./routes/comments");


mongoose.connect("mongodb://localhost/yelpcamp_v11");
// mongoose.connect("mongodb://i5haan:i5haan@ds129156.mlab.com:29156/mydatabase")

app.set('view engine','ejs');
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

//Passport Configuration
app.use(require("express-session")(
    {
        secret: "doedcjeezzsfdhneinhg",
        resave: false,
        saveUninitialized: false
    }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use(function(req,res,next)
    {
        res.locals.currentUser=req.user;
        res.locals.error=req.flash('error');
        res.locals.success=req.flash('success');
        next();
    });

app.use("/", indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


//SCEHMA SETUP
var Campground=require("./models/campground");
var Comment=require("./models/comment")


app.listen(process.env.PORT,process.env.IP,function()
{
    console.log("Server is Started");
});
