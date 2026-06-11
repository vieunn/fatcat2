const fs = require('fs');
const path = require('path');
const files = ['track2.html', 'track3.html', 'track4.html', 'track5.html'];
const simpleStyle = `    <style>
        body {
            font-family: 'Nunito', sans-serif;
            background: linear-gradient(180deg, #f7efe7 0%, #f0e3d7 100%);
            color: #5c4635;
            overflow-x: hidden;
            padding-top: calc(1.5rem + env(safe-area-inset-top));
            padding-bottom: calc(1.5rem + env(safe-area-inset-bottom));
            padding-left: calc(1rem + env(safe-area-inset-left));
            padding-right: calc(1rem + env(safe-area-inset-right));
        }

        button, .clickable {
            touch-action: manipulation;
        }

        .paper-lines {
            background-image: linear-gradient(#dcc8b7 1px, transparent 1px);
            background-size: 100% 1.8rem;
            line-height: 1.9rem;
        }

        .floating-note {
            position: absolute;
            pointer-events: none;
            font-size: 14px;
            animation: note-float 4s ease-out forwards;
            z-index: 15;
            color: #7b5d45;
            text-shadow: 0 1px 2px rgba(255,255,255,0.65);
        }

        @keyframes note-float {
            0% {
                transform: translateY(0) translateX(0) scale(0.62) rotate(0deg);
                opacity: 0;
            }
            30% {
                opacity: 0.72;
            }
            100% {
                transform: translateY(-90px) translateX(var(--drift-x)) scale(1.05) rotate(var(--rot));
                opacity: 0;
            }
        }

        @keyframes reel-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .reels-spinning { animation: reel-spin 5s linear infinite; }
        .reels-spinning-fast { animation: reel-spin 1.8s linear infinite; }

        #sparkle-container {
            opacity: 0.14;
            pointer-events: none;
        }
        .sparkle-particle {
            position: absolute;
            pointer-events: none;
            z-index: 5;
            animation: sparkle-float 8s linear forwards;
            filter: blur(0.5px);
            opacity: 0.18;
        }

        @keyframes sparkle-float {
            0% { transform: translateY(100vh) translateX(0) scale(0); opacity: 0; }
            50% { opacity: 0.45; }
            100% { transform: translateY(-10vh) translateX(var(--drift)) scale(1) rotate(360deg); opacity: 0; }
        }

        .coffee-ring {
            border: 1.5px solid rgba(139, 94, 60, 0.12);
            border-radius: 50%;
            filter: blur(1px);
        }

        ::-webkit-scrollbar {
            width: 6px;
        }
        ::-webkit-scrollbar-track { background: #f4e5d9; }
        ::-webkit-scrollbar-thumb {
            background: #c8aa8d;
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover { background: #ad8b72; }

        button, .clickable, .group > button {
            min-width: 44px;
            min-height: 44px;
            padding: 10px 12px;
            border-radius: 14px;
            border: none;
            background: #f0dfd0;
            color: #5c4635;
            box-shadow: 0 8px 18px rgba(0,0,0,0.08);
            transition: transform 180ms ease, box-shadow 180ms ease, background-color 180ms ease;
        }
        button:hover, .clickable:hover { transform: translateY(-2px); }
        button:active, .clickable:active { transform: translateY(0); box-shadow: inset 0 2px 6px rgba(0,0,0,0.12); }

        .note-card {
            transition: none;
        }

        @media (max-width: 420px) {
            .paper-lines { font-size: 1rem; line-height: 1.75rem; }
            header h1 { font-size: 1.45rem; }
            #btn-play { padding-top: 12px; padding-bottom: 12px; }
        }

        input[type="range"].volume-slider {
            -webkit-appearance: none;
            appearance: none;
            height: 6px;
            background: linear-gradient(90deg, #e6b98a, #f2d1c0);
            border-radius: 999px;
            outline: none;
        }
        input[type="range"].volume-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 16px;
            height: 16px;
            background: #6a4e3a;
            border-radius: 50%;
            box-shadow: 0 2px 6px rgba(0,0,0,0.24);
            cursor: pointer;
        }
        input[type="range"].volume-slider::-moz-range-thumb {
            width: 16px;
            height: 16px;
            background: #6a4e3a;
            border-radius: 50%;
            cursor: pointer;
        }
    </style>`;

for (const file of files) {
  const filePath = path.resolve(__dirname, file);
  let html = fs.readFileSync(filePath, 'utf8');

  html = html.replace(/<style>[\s\S]*?<\/style>/, simpleStyle);
  html = html.replace(/hover:rotate-1 hover:scale-\[1\.01\]/g, '');
  html = html.replace(/<div class="absolute -right-4 -top-3 w-5 h-5 text-pink-400 animate-pulse text-sm md:text-base">❤️<\/div>/g, '');
  html = html.replace(/<div class="w-full bg-\[#fbf9f4\] rounded-xl shadow-2xl p-5 md:p-8 border border-\[#e1d5c9\] relative transform transition-all duration-300 hover:rotate-1 hover:scale-\[1\.01\]">/g,
                           '<div class="w-full bg-[#fbf9f4] rounded-xl shadow-2xl p-5 md:p-8 border border-[#e1d5c9] relative note-card">');

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Updated design in ${file}`);
}
