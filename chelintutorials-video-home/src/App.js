import React from "react";
import "./App.css";
import YouTubeChannelVideos from "./YouTubeChannelVideos";

function App() {
  const API_KEY = "AIzaSyB5I0fMWHlFbCH4krG98Mpm2VT3eaC13U4";
  const CHANNEL_ID = "UCZJS-lpC1BhLSdsjAqj1i8A";

  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#episodes" className="active">
                Episodes
              </a>
            </li>
            <li>
              <a href="#events">Events</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
          </ul>
        </nav>
        <button className="subscribe-btn">Subscribe</button>
      </header>
      <main>
        <h1>Episodes</h1>
        <YouTubeChannelVideos apiKey={API_KEY} channelId={CHANNEL_ID} />
      </main>
    </div>
  );
}

export default App;
