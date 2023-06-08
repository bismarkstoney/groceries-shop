import mongoose  from ('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  auth0Id: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  roles:{type: String,
          enum:['Seller', 'Admin', 'user'],
          default: 'user'
        },
         
}
);

// Create the user model
const User = mongoose.model('User', userSchema);
export default  User;
