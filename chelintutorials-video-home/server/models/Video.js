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
  duration: { type: String }, // ISO 8601 duration format
  viewCount: { type: Number },
  likeCount: { type: Number },
  dislikeCount: { type: Number },
  commentCount: { type: Number },
  liveStreamingDetails: {
    actualStartTime: { type: Date },
    actualEndTime: { type: Date },
    scheduledStartTime: { type: Date },
    scheduledEndTime: { type: Date },
    concurrentViewers: { type: Number },
    activeLiveChatId: { type: String },
  },
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
