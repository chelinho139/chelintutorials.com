function handleInput(e) {
  if (e.key === "Enter") {
    const inputField = document.getElementById("inputField");
    const command = inputField.value.trim().toLowerCase();
    const output = document.getElementById("output");

    // Clear input field after enter
    inputField.value = "";

    let response = "";
    switch (command) {
      case "rainbow":
        response = "Look, a rainbow!";
        break;
      case "hello":
        response = "Hello, world!";
        break;
      case "time":
        response = "Current time is: " + new Date().toLocaleTimeString();
        break;
      case "date":
        response = "Current date is: " + new Date().toLocaleDateString();
        break;
      case "random":
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        response = "Random number from 1 to 100: " + randomNumber;
        break;
      case "random 10":
        const randomNumber10 = Math.floor(Math.random() * 10) + 1;
        response = "Random number from 1 to 10: " + randomNumber10;
        break;

      case "vishi":
        response = "i see you VGKen";
        break;
      case "pupi":
        response = "pupi.net";
        break;
      case "you can inspect files":
        response = "Good for you" + "👍";
        break;
      default:
        response = "";
    }

    output.textContent +=
      (output.textContent ? "\n" : "") +
      "chelin@tutorials:~$ " +
      command +
      (response ? "\n" + response : "");

    // Scroll to the bottom of the output
    output.scrollTop = output.scrollHeight;
  }
}

document.getElementById("inputField").focus();
