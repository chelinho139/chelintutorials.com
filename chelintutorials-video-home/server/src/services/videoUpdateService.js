const updateVideosFromYouTube = require("../utils/videoUpdater");

const safeUpdateVideos = async () => {
  try {
    await updateVideosFromYouTube();
    console.log("Videos updated successfully.");
  } catch (error) {
    console.error("Error updating videos:", error);
  }
};

const startVideoUpdateService = () => {
  // Call the function immediately on server start
  safeUpdateVideos();

  // Set up the interval to update videos every 12 hours
  const TWELVE_HOURS_IN_MS = 12 * 60 * 60 * 1000;
  setInterval(safeUpdateVideos, TWELVE_HOURS_IN_MS);
};

module.exports = startVideoUpdateService;
