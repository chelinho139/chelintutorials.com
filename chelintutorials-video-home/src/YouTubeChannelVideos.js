import React, { useState, useEffect } from "react";
import axios from "axios";

const YouTubeChannelVideos = ({ apiKey, channelId }) => {
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("videos");

  useEffect(() => {
    setVideos([]);
    setNextPageToken("");
    fetchVideos();
    // fetchVideos();
  }, [channelId, apiKey, activeTab]);

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

  // const fetchVideos = async () => {
  //   if (loading) return;
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(
  //       `https://www.googleapis.com/youtube/v3/search`,
  //       {
  //         params: {
  //           part: "snippet",
  //           channelId: channelId,
  //           maxResults: 50,
  //           order: "date",
  //           type: "video",
  //           videoDuration: activeTab === "shorts" ? "short" : undefined,
  //           eventType: activeTab === "livestreams" ? "completed" : undefined,
  //           key: apiKey,
  //           pageToken: nextPageToken,
  //         },
  //       }
  //     );

  //     let videoItems = response.data.items;

  //     if (activeTab === "videos") {
  //       const videoIds = videoItems.map((item) => item.id.videoId).join(",");
  //       const detailsResponse = await axios.get(
  //         `https://www.googleapis.com/youtube/v3/videos`,
  //         {
  //           params: {
  //             part: "contentDetails",
  //             id: videoIds,
  //             key: apiKey,
  //           },
  //         }
  //       );

  //       const videoDurations = {};
  //       detailsResponse.data.items.forEach((item) => {
  //         videoDurations[item.id] = item.contentDetails.duration;
  //       });

  //       videoItems = videoItems.filter((video) => {
  //         const duration = videoDurations[video.id.videoId];
  //         const durationInSeconds = parseDuration(duration);
  //         return durationInSeconds > 60; // Filter out videos shorter than 1 minute
  //       });
  //     }

  //     setVideos((prevVideos) => [...prevVideos, ...videoItems]);
  //     setNextPageToken(response.data.nextPageToken || "");
  //   } catch (error) {
  //     console.error("Error fetching videos:", error);
  //     if (error.response) {
  //       console.error("Response data:", error.response.data);
  //       console.error("Response status:", error.response.status);
  //       console.error("Response headers:", error.response.headers);
  //     } else if (error.request) {
  //       console.error("No response received:", error.request);
  //     } else {
  //       console.error("Error message:", error.message);
  //     }
  //     setVideos([]);
  //     setNextPageToken("");
  //   }
  //   setLoading(false);
  // };

  // const parseDuration = (duration) => {
  //   const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  //   const hours = parseInt(match[1]) || 0;
  //   const minutes = parseInt(match[2]) || 0;
  //   const seconds = parseInt(match[3]) || 0;
  //   return hours * 3600 + minutes * 60 + seconds;
  // };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setVideos([]);
    setNextPageToken("");
  };

  return (
    <div className="youtube-video-list">
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
      <div className="video-grid">
        {videos.map((video) => (
          <a
            key={video.id.videoId}
            href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="video-item"
          >
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
            />
            <h3>{video.snippet.title}</h3>
            <p>{video.snippet.description}</p>
          </a>
        ))}
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
