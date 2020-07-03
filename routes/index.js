var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
// LANDING PAGE
router.get("/", (req, res) => {
	res.render("landing");
});

///===========
/// AUTH ROUTES
///============

// REGISTER
router.get("/register", function(req, res){
	res.render("register");
});

router.post("/register", function(req, res){
	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
		if(err){
			req.flash("error", err.message);
			return res.redirect("/register");
		}
		passport.authenticate("local")(req, res, function(){
		req.flash("success", "Welcome to Yelpcamp " + req.body.username);
		res.redirect("/campgrounds");
		});
	});
});

// LOGIN
router.get("/login", function(req, res){
	res.render("login");
});

router.post("/login", passport.authenticate("local", {
	successRedirect: "/campgrounds",
	failureRedirect: "/login",
	failureFlash: true,
	successFlash: 'Welcome to Yelpcamp'

}), function(req, res){

});

// LOGOUT
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "logged out Successfully");
	res.redirect("/campgrounds");
});

module.exports = router;