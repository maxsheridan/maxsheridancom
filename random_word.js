// Array of phrases
const phrases = [
  "Your ad [here]",
  "Tiger Paw Design Studio",
  "Kuala Lumpur. Wisconsin.",
];

// Get the div container
const phraseContainer = document.getElementById("phraseContainer");

// Function to display phrases in a loop
function displayPhrases() {
  let index = 0;

  // Display the first phrase
  phraseContainer.textContent = phrases[index];

  // Loop through the phrases
  setInterval(() => {
      index = (index + 1) % phrases.length; // Loop back to the beginning when reaching the end
      phraseContainer.textContent = phrases[index];
  }, 2500); // Change 2000 to the desired interval in milliseconds (2 seconds in this case)
}

// Call the function to start displaying phrases
displayPhrases();
