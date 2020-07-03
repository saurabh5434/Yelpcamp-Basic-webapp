var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

router.get("/", (req, res) => {
	// // 
	// console.log(req.user.username);
	Campground.find({}, (err, allCampgrounds) => {
		if(err){
			console.log(err);
		}
		else{
			res.render("campgrounds/index", {campgrounds: allCampgrounds});
		}
	});
});

/// CREATE NEW CAMPGROUND
router.post("/", middleware.isLoggedIn, (req, res) => {
	var author= {
		id: req.user._id,
		username: req.user.username
	};
	Campground.create(
	{
		name: req.body.name,
		image: req.body.image,
		decription: req.body.decription,
		author: author
	}, (err, newCampground) => {
		if(err){
			console.log(err);
		}
		else{
			res.redirect("/campgrounds");
		}
	});
});

router.get("/new", middleware.isLoggedIn, (req, res) => {
	res.render("campgrounds/new");
});

//// SHOW ROUTE
router.get("/:id", (req, res) => {
	Campground.findById(req.params.id).populate("comments").exec( (err, foundCampground) => {
		if(err){
			console.log(err);
		}
		else{
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});
// EDIT

router.get("/:id/edit", middleware.checkCampgroundOwner, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
			res.render("campgrounds/edit", {campground:foundCampground});
	});
});

router.put("/:id", middleware.checkCampgroundOwner, function(req, res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}
		else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	});

});

/// DELETE
router.delete("/:id", middleware.checkCampgroundOwner, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds/" + req.params.id);
		}
		else{
			res.redirect("/campgrounds");
		}
	})
});

/// middleware

module.exports = router;