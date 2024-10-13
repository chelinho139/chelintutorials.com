mock
// Enhanced mock response with more video details
  const mockResponse = {
    items: [
      {
        kind: "youtube#searchResult",
        etag: "etag_value",
        id: {
          kind: "youtube#video",
          videoId: "kUZRDVmIuoI",
        },
        snippet: {
          publishedAt: "2023-10-01T00:00:00Z",
          channelId: "UC_x5XG1OV2P6uZZ5FSM9Ttw",
          title: "Example Video Title",
          description: "This is an example description for the video.",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/kUZRDVmIuoI/default.jpg",
              width: 120,
              height: 90,
            },
            medium: {
              url: "https://i.ytimg.com/vi/kUZRDVmIuoI/mqdefault.jpg",
              width: 320,
              height: 180,

                },
            high: {
              url: "https://i.ytimg.com/vi/kUZRDVmIuoI/hqdefault.jpg",
              width: 480,
              height: 360,
            },
          },
          channelTitle: "Example Channel Title",
          liveBroadcastContent: "none",
        },
      },
      // Add more mock videos if needed
    ],