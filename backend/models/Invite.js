import mongoose from "mongoose";

//invite user to collab
export const inviteSchema = new mongoose.Schema(
	{
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    //not registered user
		createdForEmail: {
			type: String,
			required: true,
		},
		createdForUserId: {
			type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
		},
		projectId: {
			type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },
	},
);