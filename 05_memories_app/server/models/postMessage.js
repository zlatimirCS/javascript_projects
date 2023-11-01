import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  name: String,
  creator: String,
  tags: [String],
  selectedFile: String, // This will be a string because we will store the image as a base64 string
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now, // This will automatically create a timestamp
  },
  comments: {
    type: [String],
    default: [],
  },
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
