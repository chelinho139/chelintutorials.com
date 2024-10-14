import { useEffect } from "react";

function Community() {
  useEffect(() => {
    // Create the script element dynamically
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;

    // Set the required attributes for the Telegram group chat widget
    script.setAttribute("data-telegram-chat", "https://t.me/chelintutorials");
    script.setAttribute("data-size", "large"); // Options: 'large' or 'small'
    script.setAttribute("data-color", "E22F38"); // Button color
    script.setAttribute("data-dark", "1"); // Enable dark mode

    // Append the script to the chat widget container
    const widgetContainer = document.getElementById("telegram-chat-widget");
    widgetContainer.appendChild(script);

    // Cleanup the script when component unmounts
    return () => {
      widgetContainer.removeChild(script);
    };
  }, []);

  useEffect(() => {
    // Create the script element dynamically
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;

    // Set the required attributes for the Telegram widget
    script.setAttribute("data-telegram-post", "chelinquestions/15");
    script.setAttribute("data-width", "100%");
    script.setAttribute("data-color", "E22F38");
    script.setAttribute("data-dark", "1");
    script.setAttribute("data-dark-color", "F95C54");

    // Append the script to the widget container
    const widgetContainer = document.getElementById("telegram-widget");
    widgetContainer.appendChild(script);

    // Cleanup the script when component unmounts
    return () => {
      widgetContainer.removeChild(script);
    };
  }, []);

  return (
    <div>
      <h1>COMMUNITY</h1>
      <div
        id="telegram-chat-widget"
        className="telegram-chat-widget-container"
      />

      <div id="telegram-widget" className="telegram-widget-container" />
    </div>
  );
}

export default Community;
