import mongoose from 'mongoose';
const userSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
		},
		email: {
			type: String,

			max: 50,
		},
		password: {
			type: String,

			min: 8,
		},
		isAvatarImageSet: {
			type: Boolean,
			default: false,
		},
		avatarImage: {
			type: String,
			default: 'photo.png',
		},
		firstName: {
			type: String,
		},
		lastName: {
			type: String,
		},
	},
	{ timeStamps: true }
);

const Users = mongoose.model('Users', userSchema);
export default Users;
