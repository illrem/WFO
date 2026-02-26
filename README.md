# WFO Olympics — GitHub Pages site

This is a small GitHub Pages (Jekyll) site that displays quarterly event results for the "WFO Olympics".

How it works
- Add or update events in `<project>/_data/events.json` (it's a JSON array of competitions). Commit and push to the repository.
- GitHub Pages will rebuild the site automatically.
- Images live in the `images/` folder. Filenames like `2024-04-27-some-photo.jpg` are parsed to extract year/month/day. The site builds an image index at `/assets/images_index.json` and the client selects a pseudo-random image per event matching the event quarter/year.

Notes
- No extra packages are required. The site uses only standard Jekyll/Liquid and client-side JavaScript.
- If you want deterministic image choice instead of random, replace the random logic in `assets/js/main.js` with deterministic selection (hashing the event id).
