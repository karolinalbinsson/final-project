import mongoose from "mongoose";

export const projectSchema = new mongoose.Schema({
	projectName: {
		type: String,
		required: true,
	},
	projectShortDescription: {
		type: String,
		maxlength: 100,
	},
	projectLongDescription: {
		type: String,
		maxlength: 240,
	},
	createdAt: {
		type: Date,
		default: () => new Date(),
	},
	updatedAt: {
		type: Date,
		default: () => new Date(),
	},
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	posts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post",
		},
	],
	invitedUsersEmail: [
		{
			type: String,
		},
		{ toJSON: { virtuals: true } },
		{
			getters: true,
		},
	],
	/* invitedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],*/
});
projectSchema.virtual("usersInvited", {
	ref: "User",
	localField: "invitedUsersEmail",
	foreignField: "email",
	justOne: false,
});
