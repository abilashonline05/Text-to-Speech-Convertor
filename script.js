// script.js

const convertBtn = document.getElementById("convert-btn");
const textInput = document.getElementById("text-input");
const audioPlayer = document.getElementById("audio-player");
const historyList = document.getElementById("history-list");

convertBtn.addEventListener("click", async () => {
  const text = textInput.value.trim();

  if (!text) {
    alert("Please enter some text to convert.");
    return;
  }

  convertBtn.disabled = true;
  convertBtn.textContent = "Converting...";

  try {
    // Send text to backend
    const response = await fetch("http://localhost:5000/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();

    if (data.audioUrl) {
      // Play the received audio
      audioPlayer.src = data.audioUrl;
      audioPlayer.play();

      // Add to history
      const li = document.createElement("li");
      li.textContent = text;
      historyList.prepend(li);
    } else {
      alert("Failed to generate speech. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong. Check the console for details.");
  } finally {
    convertBtn.disabled = false;
    convertBtn.textContent = "Convert to Speech";
  }
});
