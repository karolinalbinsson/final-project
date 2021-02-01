import mongoose from "mongoose";

export const postSchema = new mongoose.Schema({
	//To say if it's a picture or plain text, maybe?
	message: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 200,
	},
	createdAt: {
		type: Date,
		default: () => new Date(),
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	likes: {
		type: Number,
	},
	projectId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Project",
	},
});
