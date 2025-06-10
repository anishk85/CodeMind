const mongoose = require("mongoose");

const SubSectionSchema = new mongoose.Schema({
	title: { type: String },
	timeDuration: { type: String },
	description: { type: String },
	videoUrl: { type: String },
});

module.exports = mongoose.models.SubSection || mongoose.model("SubSection", SubSectionSchema);

//yha phas gye the hum 
// This happens when you define the same Mongoose model multiple times,
//  usually during hot reload (via nodemon or Docker watch).

//its a best practice if you follows this approach to avoid the error 
