import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  selectedFile: String, // This will be a string because we will store the image as a base64 string
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now, // This will automatically create a timestamp
  },
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
