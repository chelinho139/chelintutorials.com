const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  videoId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String },
  thumbnails: {
    default: { url: String, width: Number, height: Number },
    medium: { url: String, width: Number, height: Number },
    high: { url: String, width: Number, height: Number },
  },
  publishedAt: { type: Date },
  channelId: { type: String },
  channelTitle: { type: String },
  liveBroadcastContent: { type: String },
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
