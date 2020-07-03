var express 	= require("express"),
 	app 		= express(),
	bodyParser 	= require("body-parser"),
	Campground 	= require("./models/campground"),
	Comment     = require("./models/comment"),
	flash		= require("connect-flash"),
 	mongoose 	= require("mongoose"),
 	passport	= require("passport"),
 	LocalStrategy =	require("passport-local"),
 	//seedDB		= require("./seeds"),
 	User 		= require("./models/user"),
 	methodOverride = require("method-override"),
 	campgroundRoutes = require("./routes/campgrounds"),
 	commentsRoutes	 = require("./routes/comments"),
 	indexRoutes		 = require("./routes/index")

//seedDB();
//mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connect("mongodb+srv://Messi:Ronaldo@cluster0.z1xm6.mongodb.net/yelpcamp?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "saurabh",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	// res.locals.message = req.flash("error");
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
}); 

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentsRoutes);
app.use(indexRoutes); 


app.listen(process.env.PORT,process.env.IP);
