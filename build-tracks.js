const fs = require('fs');
const path = require('path');
const basePath = path.resolve(__dirname, 'index.html');
const base = fs.readFileSync(basePath, 'utf8');
const tracks = [
  {
    file: 'track2.html',
    title: 'Track 02 — About You',
    heading: 'Track 02: About You',
    subtitle: 'A 1975-inspired cassette just for you.',
    audio: './The 1975 - About You (Official).mp3',
    cassetteLabel: 'Track 02: About You',
    cassetteDesc: 'A 1975-inspired cassette just for you.',
    screenTitle: 'ABOUT YOU',
    screenSub: 'A mellow cassette note inspired by The 1975.',
    quote: '“The future belongs to those who believe in the beauty of their dreams.”',
    quoteAuthor: '— Eleanor Roosevelt',
    note: 'This cassette is a small reminder that your best days are ahead — one step, one page, one exam at a time.',
    backLink: './index.html',
    backLabel: 'Back to Track 01',
    nextLink: './track3.html',
    nextLabel: 'Next Track 03',
    nextButtonDest: './track3.html',
  },
  {
    file: 'track3.html',
    title: 'Track 03 — Ghosting',
    heading: 'Track 03: Ghosting',
    subtitle: 'A TXT-inspired cassette full of quiet reflection.',
    audio: './TXT – GHOSTING Lyrics Color Coded_Han_Rom_Eng.mp3',
    cassetteLabel: 'Track 03: Ghosting',
    cassetteDesc: 'A quiet track inspired by TXT.',
    screenTitle: 'GHOSTING',
    screenSub: 'A soft track with steady vibes, inspired by TXT.',
    quote: '“Almost everything you want is on the other side of fear.”',
    quoteAuthor: '— George Addair',
    note: 'Let this second track remind you that courage is a small daily habit.',
    backLink: './track2.html',
    backLabel: 'Back to Track 02',
    nextLink: './track4.html',
    nextLabel: 'Next Track 04',
    nextButtonDest: './track4.html',
  },
  {
    file: 'track4.html',
    title: 'Track 04 — Oceans and Engines',
    heading: 'Track 04: Oceans and Engines',
    subtitle: 'A NIKI-inspired track with dreamy energy.',
    audio: './NIKI - Oceans Engines (Official Lyric Video).mp3',
    cassetteLabel: 'Track 04: Oceans and Engines',
    cassetteDesc: 'Dreamy notes for a thoughtful study moment.',
    screenTitle: 'OCEANS AND ENGINES',
    screenSub: 'A warm, atmospheric cassette inspired by NIKI.',
    quote: '“Success usually comes to those who are too busy to be looking for it.”',
    quoteAuthor: '— Henry David Thoreau',
    note: 'A quiet recharge to help keep momentum alive.',
    backLink: './track3.html',
    backLabel: 'Back to Track 03',
    nextLink: './track5.html',
    nextLabel: 'Next Track 05',
    nextButtonDest: './track5.html',
  },
  {
    file: 'track5.html',
    title: 'Track 05 — Who Knows',
    heading: 'Track 05: Who Knows',
    subtitle: 'A Daniel Caesar-inspired cassette for a mellow finish.',
    audio: './Daniel Caesar - Who Knows (Lyrics).mp3',
    cassetteLabel: 'Track 05: Who Knows',
    cassetteDesc: 'A soulful close inspired by Daniel Caesar.',
    screenTitle: 'WHO KNOWS',
    screenSub: 'A smooth final track with an easy, reflective mood.',
    quote: '“Do what you can, with what you have, where you are.”',
    quoteAuthor: '— Theodore Roosevelt',
    note: 'You’re exactly where you need to be — keep moving forward with small, steady steps.',
    backLink: './track4.html',
    backLabel: 'Back to Track 04',
    nextLink: './index.html',
    nextLabel: 'Track 01 Home',
    nextButtonDest: './index.html',
  },
];

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

for (const t of tracks) {
  let out = base;
  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${t.title}</title>`);
  out = out.replace(/<h1[^>]*>[\s\S]*?<\/h1>/, `<h1 class="text-3xl md:text-5xl font-['EB_Garamond'] italic font-bold text-[#4a3b2c]">${t.heading}</h1>`);
  out = out.replace(/<p class="text-\[#8c6b53\] mt-2 text-lg md:text-xl">[\s\S]*?<\/p>/, `<p class="text-[#8c6b53] mt-2 text-lg md:text-xl">${t.subtitle}</p>`);
  out = out.replace(/<h3 class="font-\['EB_Garamond'\] font-bold text-\[#4a3b2c\] italic text-sm md:text-base tracking-wide leading-tight">[\s\S]*?<\/h3>/, `<h3 class="font-['EB_Garamond'] font-bold text-[#4a3b2c] italic text-sm md:text-base tracking-wide leading-tight">${t.cassetteLabel}</h3>`);
  out = out.replace(/<p class="text-\[8px\] md:text-\[10px\] uppercase font-\['Courier_Prime'\] text-\[#8c6b53\] tracking-wider md:tracking-widest mt-0\.5">[\s\S]*?<\/p>/, `<p class="text-[8px] md:text-[10px] uppercase font-['Courier_Prime'] text-[#8c6b53] tracking-wider md:tracking-widest mt-0.5">${t.cassetteDesc}</p>`);
  out = out.replace(/<p class="mb-4">[\s\S]*?<\/p>\s*<p class="text-right text-base md:text-lg font-semibold">[\s\S]*?<\/p>/, `<p class="mb-4">${t.quote}</p>\n                    <p class="text-right text-base md:text-lg font-semibold">${t.quoteAuthor}</p>`);
  out = out.replace(/<p class="text-sm uppercase tracking-wider font-\['Courier_Prime'\]">[\s\S]*?<\/p>\s*<p class="mt-2 text-\[13px\]">[\s\S]*?<\/p>/, `<p class="text-sm uppercase tracking-wider font-['Courier_Prime']">Track note</p>\n                        <p class="mt-2 text-[13px]">${t.note}</p>`);
  out = out.replace(/<source src="[^"]+" type="audio\/mpeg">/, `<source src="${t.audio}" type="audio/mpeg">`);
  out = out.replace(/function goToNextCassette\(\) \{[\s\S]*?\}/, `function goToNextCassette() {\n            window.location.href = "${t.nextButtonDest}";\n        }`);
  out = out.replace(/<a href="[^"]+" class="inline-flex items-center justify-center rounded-2xl bg-\[#e6c4a8\] border border-\[#c5a188\] px-4 py-3 text-sm font-semibold text-\[#5c4738\] shadow-sm hover:bg-\[#e9caae\] transition">[\s\S]*?<\/a>/, `<a href="${t.backLink}" class="inline-flex items-center justify-center rounded-2xl bg-[#e6c4a8] border border-[#c5a188] px-4 py-3 text-sm font-semibold text-[#5c4738] shadow-sm hover:bg-[#e9caae] transition">${t.backLabel}</a>`);
  out = out.replace(/<a href="[^"]+" class="inline-flex items-center justify-center rounded-2xl bg-\[#c7d8dc\] border border-\[#97a9af\] px-4 py-3 text-sm font-semibold text-\[#334048\] shadow-sm hover:bg-\[#dae7ea\] transition">[\s\S]*?<\/a>/, `<a href="${t.nextLink}" class="inline-flex items-center justify-center rounded-2xl bg-[#c7d8dc] border border-[#97a9af] px-4 py-3 text-sm font-semibold text-[#334048] shadow-sm hover:bg-[#dae7ea] transition">${t.nextLabel}</a>`);
  out = out.replace(/A Cup of Confidence — Good Luck Bestie!/, t.title);
  out = out.replace(/Track 01: Good Luck/g, t.cassetteLabel);
  out = out.replace(/Recorded Especially For You/g, t.cassetteDesc);
  out = out.replace(/Track 01 Home/g, t.nextLabel);
  out = out.replace(/Back to Track 01/g, t.backLabel);
  out = out.replace(/Next Track 03/g, t.nextLabel);
  out = out.replace(/GOOD LUCK/g, 'GOOD LUCK');
  fs.writeFileSync(path.resolve(__dirname, t.file), out, 'utf8');
  console.log('Wrote', t.file);
}
