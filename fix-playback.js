const fs = require('fs');
const path = require('path');
const files = ['track2.html', 'track3.html', 'track4.html', 'track5.html'];
const replacements = [
  {
    old: `        // Initialize sparkles and play music automatically if permitted on user action
        window.onload = function () {
            startFloatingSparkles();
        };`,
    new: `        // Initialize sparkles and play music automatically if permitted on user action
        window.onload = function () {
            if (document.getElementById("sparkle-container")) {
                startFloatingSparkles();
            }
        };`
  },
  {
    old: `        function startFloatingSparkles() {
            const container = document.getElementById("sparkle-container");
            const colors = ["#fbcfe8", "#fef3c7", "#fdf6e2", "#fcd34d", "#f472b6"];`,
    new: `        function startFloatingSparkles() {
            const container = document.getElementById("sparkle-container");
            if (!container) return;
            const colors = ["#fbcfe8", "#fef3c7", "#fdf6e2", "#fcd34d", "#f472b6"];`
  },
  {
    old: `        function burstSparkles(count) {
            const container = document.getElementById("sparkle-container");
            const colors = ["#fbcfe8", "#fef3c7", "#fcd34d", "#f472b6"];`,
    new: `        function burstSparkles(count) {
            const container = document.getElementById("sparkle-container");
            if (!container) return;
            const colors = ["#fbcfe8", "#fef3c7", "#fcd34d", "#f472b6"];`
  },
  {
    old: `            // Trigger actual audio player
            if (soundEnabled) {
                audioPlayer.play().catch(err => console.log("Audio load sequence trigger warning: ", err));
            }`,
    new: `            // Trigger actual audio player
            if (soundEnabled) {
                audioPlayer.load();
                audioPlayer.play().catch(err => console.log("Audio load sequence trigger warning: ", err));
            }`
  }
];

for (const file of files) {
  const filePath = path.resolve(__dirname, file);
  let html = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  for (const {old, new: replacement} of replacements) {
    if (html.includes(old)) {
      html = html.replace(old, replacement);
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`Patched ${file}`);
  } else {
    console.warn(`No matches found for ${file}`);
  }
}
