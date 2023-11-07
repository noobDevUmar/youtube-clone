import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    des: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    views: {
      type: String,
      required: true,
      default: 0,
    },
    tags: {
      type: [Stirng],
      default: [],
    },
    likes: {
      type: [Stirng],
      default: [],
    },
    dislikes: {
      type: [Stirng],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Video", VideoSchema);
