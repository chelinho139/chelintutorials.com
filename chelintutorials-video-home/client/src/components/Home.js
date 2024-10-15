import React, { useState, useEffect, useMemo, useCallback } from "react";

const parseDuration = (duration) => {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const hours = match[1] ? parseInt(match[1].replace("H", "")) : 0;
  const minutes = match[2] ? parseInt(match[2].replace("M", "")) : 0;
  const seconds = match[3] ? parseInt(match[3].replace("S", "")) : 0;
  return hours * 3600 + minutes * 60 + seconds;
};

const YouTubeChannelVideos = () => {
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("videos");

  const fetchVideos = useCallback(async (pageToken = "", signal) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/videos/videos?pageToken=${pageToken}`,
        { signal }
      );
      const data = await response.json();
      if (data.items) {
        setVideos((prevVideos) => [...prevVideos, ...data.items]);
        setNextPageToken(data.nextPageToken);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Error fetching videos:", error);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    // Fetch videos only on component mount
    fetchVideos("", signal);

    return () => {
      controller.abort();
    };
  }, []);

  const filteredVideos = useMemo(() => {
    return videos
      .filter((video) => {
        const durationInSeconds = parseDuration(video.duration);
        if (activeTab === "shorts") {
          return durationInSeconds <= 60;
        } else if (activeTab === "livestreams") {
          return video.liveStreamingDetails;
        } else if (activeTab === "videos") {
          return !video.liveStreamingDetails && durationInSeconds > 60;
        }
        return true;
      })
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  }, [videos, activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
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
      </div>
      <div className="video-grid">
        {filteredVideos.map((video) => {
          const videoId = video.videoId;
          if (!videoId) return null;

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
        <button
          className="load-more"
          onClick={() => fetchVideos(nextPageToken)}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default YouTubeChannelVideos;
