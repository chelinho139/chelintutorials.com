import { useEffect } from "react";
import "./App.css";
import YouTubeChannelVideos from "./YouTubeChannelVideos";

function App() {
  const API_KEY = "AIzaSyB5I0fMWHlFbCH4krG98Mpm2VT3eaC13U4";
  const CHANNEL_ID = "UCZJS-lpC1BhLSdsjAqj1i8A";
  // Load the YouTube platform script dynamically
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/platform.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Cleanup on unmount
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <ul>
            <li>
              <a href="#home" className="active">
                Videos
              </a>
            </li>
            <li>
              <a href="#posts">Posts</a>
            </li>
            <li>
              <a href="#community">Community</a>
            </li>
          </ul>
        </nav>
        {/* YouTube Subscribe Button */}

        <div className="subscribe-button-wrapper">
          <div
            className="g-ytsubscribe"
            data-channelid={CHANNEL_ID}
            data-layout="default"
            data-theme="dark"
            data-count="default"
          ></div>
        </div>
      </header>
      <main>
        <h1>VIDEOS</h1>
        <YouTubeChannelVideos apiKey={API_KEY} channelId={CHANNEL_ID} />
      </main>
    </div>
  );
}

export default App;
