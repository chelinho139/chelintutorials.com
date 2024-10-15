const axios = require("axios");
const Video = require("../models/Video");
require("dotenv").config();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = "UCZJS-lpC1BhLSdsjAqj1i8A";
const MAX_VIDEOS = 100;
const MAX_RESULTS_PER_PAGE = 50;

// Helper function to fetch videos from YouTube API
async function fetchVideosFromYouTube(nextPageToken = "") {
  const response = await axios.get(
    "https://www.googleapis.com/youtube/v3/search",
    {
      params: {
        part: "snippet",
        channelId: CHANNEL_ID,
        maxResults: MAX_RESULTS_PER_PAGE,
        order: "date",
        type: "video",
        pageToken: nextPageToken,
        key: YOUTUBE_API_KEY,
      },
    }
  );
  return response.data;
}

// Helper function to fetch video details
async function fetchVideoDetails(videoId) {
  const response = await axios.get(
    "https://www.googleapis.com/youtube/v3/videos",
    {
      params: {
        part: "contentDetails,statistics,liveStreamingDetails",
        id: videoId,
        key: YOUTUBE_API_KEY,
      },
    }
  );
  return response.data.items[0];
}

// Helper function to transform video data
function transformVideoData(item, videoDetails) {
  return {
    videoId: item.id.videoId,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnails: item.snippet.thumbnails,
    publishedAt: item.snippet.publishedAt,
    channelId: item.snippet.channelId,
    channelTitle: item.snippet.channelTitle,
    liveBroadcastContent: item.snippet.liveBroadcastContent,
    duration: videoDetails.contentDetails.duration,
    viewCount: videoDetails.statistics.viewCount,
    likeCount: videoDetails.statistics.likeCount,
    dislikeCount: videoDetails.statistics.dislikeCount,
    commentCount: videoDetails.statistics.commentCount,
    liveStreamingDetails: videoDetails.liveStreamingDetails,
  };
}

async function updateVideosFromYouTube() {
  console.log("Fetching videos from YouTube API, key:", YOUTUBE_API_KEY);

  console.log("Updating videos from YouTube API");

  let videoItems = [];
  let nextPageToken = "";

  while (videoItems.length < MAX_VIDEOS) {
    const data = await fetchVideosFromYouTube(nextPageToken);
    videoItems = videoItems.concat(data.items);

    if (!data.nextPageToken || videoItems.length >= MAX_VIDEOS) {
      break;
    }

    nextPageToken = data.nextPageToken;
  }

  const detailedVideoItems = await Promise.all(
    videoItems.slice(0, MAX_VIDEOS).map(async (item) => {
      const videoDetails = await fetchVideoDetails(item.id.videoId);
      return transformVideoData(item, videoDetails);
    })
  );

  await Video.deleteMany({}); // Clear existing videos
  await Video.insertMany(detailedVideoItems);
}

module.exports = updateVideosFromYouTube;
