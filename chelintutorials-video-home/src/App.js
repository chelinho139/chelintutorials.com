import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import YouTubeChannelVideos from "./components/Home";
import Posts from "./components/Posts"; // Import the new Posts component
import Community from "./components/Community"; // Import the new Community component

function App() {
  const CHANNEL_ID = "UCZJS-lpC1BhLSdsjAqj1i8A";

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/platform.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <ul className="nav-list">
              <li className="nav-item">
                <NavLink to="/" exact>
                  <img src="logo512.png" alt="Logo" className="logo" />
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/" exact activeClassName="active">
                  Videos
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/posts" activeClassName="active">
                  Posts
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/community" activeClassName="active">
                  Community
                </NavLink>
              </li>
            </ul>
          </nav>
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
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <h1>VIDEOS</h1>
                  <YouTubeChannelVideos />
                </>
              }
            />
            <Route path="/posts" element={<Posts />} />
            <Route path="/community" element={<Community />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
