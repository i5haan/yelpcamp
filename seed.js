var mongoose=require("mongoose");
var Campground=require("./models/campground");
var Comment=require("./models/comment")

var campgrounds=[
    {
    	name:"Salmon Creek", 
    	image:"https://www.nhstateparks.org/uploads/images/Dry-River_Campground_02.jpg",
    	desc:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
    	name:"Granite Hills", 
    	image:"http://www.saturnapub.com/wp-content/uploads/2017/02/Saturna-Lighthouse-Pub-Arbutus-Campground-2.jpg",
    	desc:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
    	name:"Mountain Sites",
    	image:"https://lostriver.com/style/images/Pic-6-RV.jpg",
    	desc:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
    	name:"Salmon Creek", 
    	image:"https://www.nhstateparks.org/uploads/images/Dry-River_Campground_02.jpg",
    	desc:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
];


function seedDB()
{
	console.log("Seeding Started!");
	Campground.remove({},function(err)
	{
		// if(err)
		// {
		// 	console.log(err);
		// }
		// else
		// {
		// 	console.log("#Emptied Database!!");
		// 	campgrounds.forEach(function(campground)
		// 	{
		// 		Campground.create(campground,function(err,campground)
		// 		{
		// 			if(err)
		// 			{
		// 				console.log("#Error in inserting "+campground.name);
		// 			}
		// 			else
		// 			{
		// 				console.log("#Created "+campground.name);
		// 				Comment.create(
		// 					{
		// 						text:"Good job maaan!!",
		// 						author:"Homie bhai"
		// 					},function(error,comment)
		// 					{
		// 						if(err)
		// 						{
		// 							console.log(err);
		// 						}
		// 						else
		// 						{
		// 							campground.comments.push(comment._id);
		// 							campground.save();
		// 							console.log("Created Comment");
		// 						}
		// 					});
		// 			}
		// 		});
		// 	});
		// }
	});

	

}

module.exports=seedDB;