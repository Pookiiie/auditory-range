# Auditory Range

A listening journal for *1001 Albums You Must Hear Before You Die* (2013 edition), in book order.

Open the site, then on iPhone use **Share → Add to Home Screen** to install it as an app.

## How it works

- `index.html` is the whole app (no build step, no dependencies).
- `catalog.json` holds the 1001 albums (dates, labels, genres and so on, from Wikipedia).
- `t/` and `c/` hold cover art, packed several images per file. `w/` holds track listings and Wikipedia sections.
- `sw.js` lets the app work offline. `manifest.webmanifest` and the icons make it installable.

## Your notes

Notes are **not** in this repository. They live on each device and sync to `notes.json` in the private
repository `auditory-range-data`, via the GitHub API and a fine-grained access token you paste into
**Sync and backup → Settings** once per device. Each album's edit has a timestamp. When two devices
disagree, the newer edit wins for that album.

`notes.json` is plain JSON you can read anywhere. Its commit history is a full backup of every change.
