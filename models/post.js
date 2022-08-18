import mongoose from "mongoose";
import dateFormat from 'dateformat'
const now = new Date()



const postSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'User'
  },
  title: String,
  text: String,
  image: String,
  author: String,
  createdAt: {
    type: String,
    default: dateFormat(now)
  },
  likes: {
    type: [String],
    default: [],
  },
});

const PostModal = mongoose.model("Post", postSchema);

export default PostModal;
