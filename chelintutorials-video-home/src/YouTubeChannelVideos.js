import React, { useState, useEffect } from "react";

const YouTubeChannelVideos = ({ channelId }) => {
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("videos");

  useEffect(() => {
    setVideos([]);
    setNextPageToken("");
    fetchVideos();
    // fetchVideos();
  }, [channelId, activeTab]);

  const fetchVideos = async () => {
    try {
      const response = await fetch("/api/youtube/videos");
      const data = await response.json();
      console.log("response JSON", data); // Log the parsed data
      if (data.items) {
        setVideos(data.items); // Set videos to the items array
      } else {
        setVideos([]); // Set videos to an empty array if no items
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
      setVideos([]); // Ensure videos is reset to an empty array on error
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setVideos([]);
    setNextPageToken("");
  };

  return (
    <div className="youtube-video-list">
      <div className="header">
        <div className="tabs">
          <button
            className={activeTab === "videos" ? "active" : ""}
            onClick={() => handleTabChange("videos")}
          >
            Videos
          </button>
          <button
            className={activeTab === "livestreams" ? "active" : ""}
            onClick={() => handleTabChange("livestreams")}
          >
            Livestreams
          </button>
          <button
            className={activeTab === "shorts" ? "active" : ""}
            onClick={() => handleTabChange("shorts")}
          >
            Shorts
          </button>
        </div>
        {/* <button className="subscribe-btn">Subscribe</button> */}
      </div>
      <div className="video-grid">
        {videos.map((video) => {
          const videoId = video.videoId;
          if (!videoId) return null; // Skip rendering if videoId is undefined

          return (
            <a
              key={videoId}
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="video-item"
            >
              <img src={video.thumbnails.medium.url} alt={video.title} />
              <h3>{video.title}</h3>
              <p>{video.description}</p>
            </a>
          );
        })}
      </div>
      {loading && <div className="loading">Loading...</div>}
      {nextPageToken && !loading && (
        <button onClick={fetchVideos} className="load-more">
          Load More
        </button>
      )}
    </div>
  );
};

export default YouTubeChannelVideos;
