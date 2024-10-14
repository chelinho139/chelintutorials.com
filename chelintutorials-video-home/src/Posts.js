import React from "react";
import { useEffect } from "react";

function Posts() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://substack.com/embedjs/embed.js";

    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <h1>POSTS</h1>
      {/* Add a class to the parent div to apply flexbox */}
      <div className="posts-container">
        <div className="substack-post-embed">
          <p lang="en">
            > 2/ untold truths of entrepreneurship by Marcelo Cavazzoli
          </p>
          <p>
            There are some things that aren’t often talked about when it comes
            to entrepreneurship. These are the untold truths of being an
            entrepreneur.
          </p>
          <a
            data-post-link
            href="https://limoncito.substack.com/p/2-untold-truths-of-entrepreneurship"
          >
            Read on Substack
          </a>
        </div>

        <div className="substack-post-embed">
          <p lang="en">> 1/ the serving tray theory by Marcelo Cavazzoli</p>
          <p>A framework on how to launch products with viral go-to-markets.</p>
          <a
            data-post-link
            href="https://limoncito.substack.com/p/1-the-serving-tray-theory"
          >
            Read on Substack
          </a>
        </div>
        <div class="substack-post-embed">
          <p lang="en">> 0/ welcome message pt2 by Marcelo Cavazzoli</p>
          <p>okay, now it's for real.</p>
          <a
            data-post-link
            href="https://limoncito.substack.com/p/0-welcome-message-pt2"
          >
            Read on Substack
          </a>
        </div>
      </div>
    </div>
  );
}

export default Posts;
