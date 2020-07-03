var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{
		name: "campground 1",
		image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Tenting_at_Joseph_A._Citta.jpg/250px-Tenting_at_Joseph_A._Citta.jpg",
		decription: "This is campground"
	},
	{
		name: "campground 2",
		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ4wiuv6-a9WmVEh79PwRFrafYBYW-FambVeCqC8CyWo35jdAHt&usqp=CAU",
		decription: "This is campground"
	},
	{
		name: "campground 3",
		image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRnpc3zX7043Ol7xQh1nyU1BWRUhJpTs8zoC5n7FxlQ0d_iY280&usqp=CAU",
		decription: "This is campground"
	}
];
function seedDB(){
	Campground.remove({}, function(err){
	// 	if(err)
	// 	{
	// 		console.log(err); 
	// 	}
	// 	else
	// 	{
	// 		console.log("Removed");
	// 	}
	// 	data.forEach(function(seed){
	// 			Campground.create(seed, function(err, campground)
	// 			{
	// 				if(err)
	// 				{
	// 					console.log(err);
	// 				}
	// 				else
	// 				{
	// 					console.log("Added");
	// 					Comment.create(
	// 					{
	// 						text: "Comment Added",
	// 						author: "John"
	// 					}, function(err, comment){
	// 						if(err)
	// 						{
	// 							console.log(err);
	// 						}
	// 						else
	// 						{
	// 							campground.comments.push(comment);
	// 							campground.save();
	// 							console.log("Comment saved");
	// 						}
	// 					});
	// 				}
	// 			});
	// 		});
	 });
};

module.exports = seedDB;