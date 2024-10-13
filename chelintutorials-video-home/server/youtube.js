/* eslint-disable @typescript-eslint/no-require-imports */
const express = require("express");
const axios = require("axios");
const Video = require("./models/Video");
require("dotenv").config();

const router = express.Router();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = "UCZJS-lpC1BhLSdsjAqj1i8A";

router.get("/videos", async (req, res) => {
  console.log("/videos");

  try {
    // Check if videos are already in the database
    const videos = await Video.find();
    if (videos.length > 0) {
      return res.json({ items: videos });
    }

    // If not, fetch from YouTube API
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          channelId: CHANNEL_ID,
          maxResults: 10,
          order: "date",
          type: "video",
          key: YOUTUBE_API_KEY,
        },
      }
    );

    // Save videos to the database
    const videoItems = response.data.items.map((item) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnails: item.snippet.thumbnails,
      publishedAt: item.snippet.publishedAt,
      channelId: item.snippet.channelId,
      channelTitle: item.snippet.channelTitle,
      liveBroadcastContent: item.snippet.liveBroadcastContent,
    }));

    await Video.insertMany(videoItems);

    res.json({ items: videoItems });
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
});

module.exports = router;
