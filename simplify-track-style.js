const fs = require('fs');
const path = require('path');
const files = ['track2.html', 'track3.html', 'track4.html', 'track5.html'];

const newStyle = `    <style>
        body {
            font-family: 'Nunito', sans-serif;
            background: linear-gradient(180deg, #faf3eb 0%, #f1e7dc 100%);
            color: #5c4735;
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
            background-image: linear-gradient(#d9c4af 1px, transparent 1px);
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
            text-shadow: 0 1px 2px rgba(255,255,255,0.75);
        }

        @keyframes note-float {
            0% { transform: translateY(0) translateX(0) scale(0.62) rotate(0deg); opacity: 0; }
            30% { opacity: 0.72; }
            100% { transform: translateY(-90px) translateX(var(--drift-x)) scale(1.05) rotate(var(--rot)); opacity: 0; }
        }

        @keyframes reel-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .reels-spinning { animation: reel-spin 5s linear infinite; }
        .reels-spinning-fast { animation: reel-spin 1.8s linear infinite; }

        #sparkle-container { display: none; }
        .coffee-ring { display: none; }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f7e9dc; }
        ::-webkit-scrollbar-thumb { background: #cbb09a; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #b69378; }

        button, .clickable, .group > button {
            min-width: 44px;
            min-height: 44px;
            padding: 10px 14px;
            border-radius: 14px;
            border: none;
            background: #f7e3d5;
            color: #5c4635;
            box-shadow: 0 10px 18px rgba(0,0,0,0.08);
            transition: transform 180ms ease, box-shadow 180ms ease, background-color 180ms ease;
        }
        button:hover, .clickable:hover { transform: translateY(-1px); }
        button:active, .clickable:active { transform: translateY(0); box-shadow: inset 0 2px 8px rgba(0,0,0,0.1); }

        .note-card { transition: none; }

        @media (max-width: 420px) {
            .paper-lines { font-size: 1rem; line-height: 1.75rem; }
            header h1 { font-size: 1.45rem; }
        }

        input[type="range"].volume-slider {
            -webkit-appearance: none;
            appearance: none;
            height: 6px;
            background: linear-gradient(90deg, #e8c6a9, #eed7c7);
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

const monitorCard = `<div class="w-full bg-[#fff7ed] border border-[#e6cfb7] rounded-3xl p-5 shadow-lg relative min-h-[200px] md:min-h-[220px] flex flex-col justify-between text-[#5c4735]">
                <div class="flex justify-between items-center text-[11px] md:text-[12px] text-[#8c6b53] pb-3 border-b border-[#e8d5c0] mb-4">
                    <span>Study Deck Monitor</span>
                    <span id="screen-clock" class="font-semibold text-[#7c5d42]">READY</span>
                </div>
                <div id="screen-terminal" class="flex-grow flex flex-col justify-center space-y-3 text-[12px] md:text-sm leading-relaxed">
                    <div id="state-idle" class="text-center space-y-3 py-2">
                        <p class="text-[#8c6b53] font-semibold text-sm md:text-base">Press play to start your track.</p>
                        <p class="text-[#7a6a55] text-[11px] md:text-[12px] px-2">This deck is here to help you focus and relax while listening.</p>
                    </div>
                    <div id="state-loading" class="hidden space-y-3">
                        <div class="flex justify-between items-center text-[#8c6b53] font-semibold text-xs md:text-sm">LOADING SUCCESS...</div>
                        <div class="w-full bg-[#f3e1d1] rounded-lg h-4 md:h-5 overflow-hidden">
                            <div id="load-bar" class="bg-[#dba471] h-full rounded-md transition-all duration-200 ease-out" style="width: 0%"></div>
                        </div>
                        <div id="status-checks" class="text-[11px] md:text-[12px] space-y-1 text-[#7a6754] h-20 overflow-hidden"></div>
                    </div>
                    <div id="state-success" class="hidden space-y-2 pt-2">
                        <div class="text-center border-b border-[#e8d5c0] pb-2">
                            <h4 class="text-[#8c6b53] text-sm md:text-base font-bold uppercase">Ready to flow</h4>
                        </div>
                        <div class="grid grid-cols-2 gap-y-2 text-[12px] md:text-[13px] mt-2">
                            <span class="text-[#7a6754] font-semibold">Confidence:</span>
                            <span class="text-right text-[#5c4635] font-semibold">100%</span>
                            <span class="text-[#7a6754] font-semibold">Effort Pulse:</span>
                            <span class="text-right text-[#5c4635] font-semibold">Good vibes</span>
                            <span class="text-[#7a6754] font-semibold">Focus boost:</span>
                            <span class="text-right text-[#5c4635] font-semibold">Active</span>
                            <span class="text-[#7a6754] font-semibold">Final note:</span>
                            <span class="text-right text-[#5c4635] font-semibold">You got this.</span>
                        </div>
                    </div>
                </div>
            </div>`;

for (const file of files) {
  const filePath = path.resolve(__dirname, file);
  let html = fs.readFileSync(filePath, 'utf8');

  html = html.replace(/<style>[\s\S]*?<\/style>/, newStyle);
  html = html.replace(/<div id="sparkle-container"[\s\S]*?<\/div>\s*/m, '');
  html = html.replace(/<div class="absolute -left-16 top-1\/2 w-48 h-48 coffee-ring[\s\S]*?<\/div>\s*/g, '');
  html = html.replace(/<div class="absolute -left-12 top-\[53%\] w-40 h-40 coffee-ring[\s\S]*?<\/div>\s*/g, '');
  html = html.replace(/class="w-full bg-\[#5c4738\] rounded-2xl p-4 md:p-6 shadow-2xl border-4 border-\[#3e2e22\] relative transition-all duration-300 hover:shadow-\[0_25px_50px_-12px_rgba\(0,0,0,0\.4\)\]"/g,
                      'class="w-full bg-[#f4e2d5] rounded-3xl p-4 md:p-6 shadow-lg border border-[#e0c3ad] relative"');
  html = html.replace(/id="cassette-body" class="w-full h-40 md:h-48 bg-\[#d4c3b3\] rounded-xl p-3 border-4 border-\[#3e2e22\] relative flex flex-col justify-between overflow-hidden shadow-inner"/g,
                      'id="cassette-body" class="w-full h-40 md:h-48 bg-[#f6eee7] rounded-3xl p-3 border border-[#d8c3b0] relative flex flex-col justify-between overflow-hidden shadow-inner"');
  html = html.replace(/<div class="w-full bg-\[#281c12\] border-4 border-\[#1e140d\] rounded-xl p-4 shadow-xl relative min-h-\[200px\] md:min-h-\[220px\] flex flex-col justify-between font-\['Courier_Prime'\]">[\s\S]*?<\/div>\s*<\/section>/m,
                      monitorCard + '\n        </section>');
  html = html.replace(/hover:shadow-\[0_25px_50px_-12px_rgba\(0,0,0,0\.4\)\]/g, '');
  html = html.replace(/animate-pulse/g, '');
  html = html.replace(/<span class="inline-block w-1\.5 h-1\.5 rounded-full bg-emerald-400 animate-ping"><\/span>/g, '<span class="inline-block w-1\.5 h-1\.5 rounded-full bg-[#c6a57c]"></span>');

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Cleaned design in ${file}`);
}
