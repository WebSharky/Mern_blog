import mongoose from "mongoose";
import dateFormat from 'dateformat'
const now = new Date()



const userSchema = mongoose.Schema({
  login: {
    type: String,
    required: [true, 'Please give a login'],
    unique: true
  },
  nickname: {
    type: String,
    required: [true, 'Please give a nickname ( visible to others users)'],
    unique: true
  },
  description: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: [true, 'Please give a valid email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please add a password']
  },
},
{
    timestamps: true
});

const UserModal = mongoose.model("User", userSchema);

export default UserModal;
