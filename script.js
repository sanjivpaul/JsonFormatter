document.addEventListener("DOMContentLoaded", () => {
  // Load saved theme from localStorage and apply it
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    document.getElementById("themeToggleButton").textContent =
      "Switch to Light Mode";
  } else {
    document.body.classList.remove("dark-mode");
    document.getElementById("themeToggleButton").textContent =
      "Switch to Dark Mode";
  }

  const formatButton = document.getElementById("formatButton");
  const copyButton = document.getElementById("copyButton");
  const jsonInput = document.getElementById("jsonInput");
  const formattedJson = document.getElementById("formattedJson");
  const indentationSelect = document.getElementById("indentation");
  const themeToggleButton = document.getElementById("themeToggleButton");

  // Function to format JSON
  function formatJson() {
    const jsonString = jsonInput.value;
    const indentation = parseInt(indentationSelect.value);

    try {
      const parsedJson = JSON.parse(jsonString);
      const formatted = JSON.stringify(parsedJson, null, indentation);
      formattedJson.textContent = formatted;
      formattedJson.classList.remove("invalid");
    } catch (e) {
      formattedJson.textContent =
        "Invalid JSON input. Please check the syntax.";
      formattedJson.classList.add("invalid");
    }
  }

  // Format JSON when the user clicks the "Format JSON" button
  formatButton.addEventListener("click", formatJson);

  // Automatically format when the user pastes JSON into the textarea
  jsonInput.addEventListener("input", formatJson);

  // Copy formatted JSON to clipboard
  copyButton.addEventListener("click", () => {
    const text = formattedJson.textContent;
    if (text && text !== "Invalid JSON input. Please check the syntax.") {
      navigator.clipboard.writeText(text).then(
        () => {
          alert("Formatted JSON copied to clipboard!");
        },
        () => {
          alert("Failed to copy to clipboard.");
        }
      );
    } else {
      alert("There is no valid formatted JSON to copy.");
    }
  });

  // Toggle Dark/Light Mode
  themeToggleButton.addEventListener("click", () => {
    const body = document.body;
    const container = document.querySelector(".container");
    const textarea = document.querySelector("textarea");
    const pre = document.querySelector("pre");
    const buttons = document.querySelectorAll("button");
    const select = document.querySelector("select");

    // Toggle dark mode class on body and relevant elements
    body.classList.toggle("dark-mode");
    container.classList.toggle("dark-mode");
    textarea.classList.toggle("dark-mode");
    pre.classList.toggle("dark-mode");
    buttons.forEach((button) => button.classList.toggle("dark-mode"));
    select.classList.toggle("dark-mode");

    // Toggle the text of the button
    if (body.classList.contains("dark-mode")) {
      themeToggleButton.textContent = "Switch to Light Mode";
      // Save the theme in localStorage as dark
      localStorage.setItem("theme", "dark");
    } else {
      themeToggleButton.textContent = "Switch to Dark Mode";
      // Save the theme in localStorage as light
      localStorage.setItem("theme", "light");
    }
  });
});
