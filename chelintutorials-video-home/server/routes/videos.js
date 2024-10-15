/* eslint-disable @typescript-eslint/no-require-imports */
const express = require("express");
const Video = require("../models/Video");

const router = express.Router();

const RESPONSE_VIDEO_LIMIT = 20; // Define the number of videos to respond with

router.get("/videos", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const pageToken = parseInt(req.query.pageToken) || 0; // Get the page token from query params
  const skip = pageToken * RESPONSE_VIDEO_LIMIT; // Calculate the number of documents to skip

  try {
    const videos = await Video.find()
      .skip(skip)
      .limit(RESPONSE_VIDEO_LIMIT + 1); // Fetch one extra to check if more pages exist
    const hasNextPage = videos.length > RESPONSE_VIDEO_LIMIT; // Determine if there is a next page

    if (hasNextPage) {
      videos.pop(); // Remove the extra video used for checking
    }

    return res.json({
      items: videos,
      nextPageToken: hasNextPage ? pageToken + 1 : null,
    });
  } catch (error) {
    console.error("Error fetching videos from database", error);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
});

module.exports = router;
