# Museum of Us — an interactive friendship-day website

A single-page, framework-free interactive greeting: an unopened message, a
knock-knock door, a guided museum tour, a button you were told not to press,
a swipeable memory cleanup, a handwritten letter, a word search and a
friendship renewal agreement — ending with "THAT'S IT. You can leave now."

Everything (text, photos, music, colours, fonts, animation speed) is editable
from the built-in ⚙ settings panel and stored in the browser's Local Storage.
Original code, no dependencies, no build step.

## Files

```
index.html          markup shell (loader, paper card, settings panel)
style.css           all styling, animations and responsive rules
script.js           content defaults, state, scene engine, settings panel
assets/favicon.svg
assets/memory-1..3.jpg   sample memory photos
assets/exhibit-b.jpg     sample exhibit photo
assets/sample-music.mp3  sample background track
LICENSE
```

## Run it

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000     # then visit http://localhost:8000
```

## The flow

| # | Scene | Interaction |
|---|-------|-------------|
| 1 | Unopened message | notification cards drop in, "OPEN IT" |
| 2 | Knock knock | door swings open; the "ABSOLUTELY NOT" button runs away |
| 3 | Museum of Us | three exhibits: plaque, curtain reveal, locked box |
| 4 | Do not press | big red button → diagnostic terminal → verdict |
| 5 | Memory cleanup | swipe or tap DELETE / KEEP through your photos |
| 6 | Interlude | "OKAY. JOKES APART." lines fade in |
| 7 | Envelope | slide a finger across the flap to open it |
| 8 | The letter | handwritten lines appear one by one, with highlights |
| 9 | Word search | reveal the hidden words |
| 10 | Renewal agreement | tick every clause, then "I ACCEPT" → stamp |
| 11 | The end | "THAT'S IT." + replay |

Navigate with the progress dots, the ‹ button, or the ← / → arrow keys.

## Editing it for your person

Open ⚙ and use the tabs:

- **Look** — accent + heart colour, roundness, text size, three fonts, and the
  background/text colour of every single scene.
- **Names** — `{to}` and `{from}` tokens work inside every text field.
- **Intro / Museum / Button / Memories / Letter / Endgame** — every headline,
  button label, plaque, clause and line.
- **Music & FX** — upload an MP3, set volume/autoplay, toggle floating hearts,
  sparkles and confetti, and tune animation speed.

Formatting helpers:

- Letter lines: `==text==` gives a yellow highlight, `~~text~~` a pink one.
- Diagnostic lines: `label :: result`.
- List fields (letter lines, clauses, words, interlude): one item per line.

Uploaded photos and music are stored as data URLs in Local Storage, so they
stay on the device. Use **Export .json** to back up a personalised version and
**Import** to restore it on another device.

## License

MIT — see `LICENSE`.
