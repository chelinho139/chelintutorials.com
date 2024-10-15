const response = await axios.get(
  `https://www.googleapis.com/youtube/v3/search`,
  {
    params: {
      part: "snippet",
      channelId: channelId,
      maxResults: 50,
      order: "date",
      type: "video",
      videoDuration: activeTab === "shorts" ? "short" : undefined,
      eventType: activeTab === "livestreams" ? "completed" : undefined,
      key: apiKey,
      pageToken: nextPageToken,
    },
  }
);

let videoItems = response.data.items;

if (activeTab === "videos") {
  const videoIds = videoItems.map((item) => item.id.videoId).join(",");
  const detailsResponse = await axios.get(
    `https://www.googleapis.com/youtube/v3/videos`,
    {
      params: {
        part: "contentDetails",
        id: videoIds,
        key: apiKey,
      },
    }
  );

  const videoDurations = {};
  detailsResponse.data.items.forEach((item) => {
    videoDurations[item.id] = item.contentDetails.duration;
  });

  videoItems = videoItems.filter((video) => {
    const duration = videoDurations[video.id.videoId];
    const durationInSeconds = parseDuration(duration);
    return durationInSeconds > 60; // Filter out videos shorter than 1 minute
  });
}
