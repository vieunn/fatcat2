const fs = require('fs');
const path = require('path');
const notes = [
  {
    file: 'track2.html',
    title: 'Track 02: About You',
    quote: '“The future belongs to those who believe in the beauty of their dreams.”',
    author: '— Eleanor Roosevelt',
    note: 'A small reminder that your best days are ahead — one step, one page, one exam at a time.',
  },
  {
    file: 'track3.html',
    title: 'Track 03: Ghosting',
    quote: '“Almost everything you want is on the other side of fear.”',
    author: '— George Addair',
    note: 'Let this quiet track remind you that courage is a small daily habit.',
  },
  {
    file: 'track4.html',
    title: 'Track 04: Oceans and Engines',
    quote: '“Success usually comes to those who are too busy to be looking for it.”',
    author: '— Henry David Thoreau',
    note: 'A calm, thoughtful recharge to keep your momentum alive.',
  },
  {
    file: 'track5.html',
    title: 'Track 05: Who Knows',
    quote: '“Do what you can, with what you have, where you are.”',
    author: '— Theodore Roosevelt',
    note: 'You’re exactly where you need to be — keep moving forward with steady steps.',
  },
];

const letterBlock = (quote, author, note) => `
        <!-- RIGHT SIDE: TRACK NOTE + DAILY QUOTE -->
        <section class="lg:col-span-7 w-full relative px-1 max-w-xl mx-auto">
            <div class="w-full bg-[#fbf9f4] rounded-xl shadow-2xl p-5 md:p-8 border border-[#e1d5c9] relative transform transition-all duration-300 hover:rotate-1 hover:scale-[1.01]">
                <div class="w-full relative">
                    <div class="text-[#8c6b53] font-['Courier_Prime'] text-[9px] md:text-xs mb-4 md:mb-6">
                        <p class="font-bold">DAILY NOTE</p>
                        <p class="text-[10px] mt-1">A small dose of quiet encouragement for your study session.</p>
                    </div>

                    <div class="paper-lines p-6 rounded-3xl bg-[#fff8f0] text-[#3d2f21] font-['Caveat'] text-lg md:text-xl leading-relaxed shadow-sm space-y-5">
                        <div class="text-sm uppercase tracking-widest text-[#8c6b53] font-['Courier_Prime']">Track note</div>
                        <p>${note}</p>
                        <div class="text-xs text-[#7b6a54] uppercase tracking-[0.2em] font-semibold">Daily quote</div>
                        <blockquote class="text-xl md:text-2xl font-['Caveat'] italic text-[#4a3b2c]">${quote}</blockquote>
                        <p class="text-right text-sm md:text-base font-semibold text-[#8c6b53]">${author}</p>
                    </div>
                </div>
            </div>
        </section>
`;

for (const item of notes) {
  const filePath = path.resolve(__dirname, item.file);
  let html = fs.readFileSync(filePath, 'utf8');
  html = html.replace(/<!-- RIGHT SIDE: HANDWRITTEN-STYLE STATIONERY LETTER -->[\s\S]*?<!-- Footnotes footer page info -->/, `${letterBlock(item.quote, item.author, item.note)}
    <!-- Footnotes footer page info -->`);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Updated ${item.file}`);
}
