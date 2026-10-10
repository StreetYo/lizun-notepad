# Notepad for Lizun

A note in the [Lizun](https://github.com/StreetYo/Lizun) island: open the island, click the field and
write. The text is saved as you type and is there the next time you open the island.

## Install

In Lizun, open Settings > Widgets > Add a widget, paste this link and press Install:

```
https://github.com/StreetYo/lizun-notepad
```

To install a fixed version, use the link of a release instead, for example
`https://github.com/StreetYo/lizun-notepad/releases/tag/v1.0.0`.

## Using it

- Click the field to type. The island stays open while you write and gives the keyboard back to
  your app when you press Esc or click outside the field.
- The note is saved a moment after you stop typing and when you leave the field. If saving
  fails, the widget says "Not saved" in its header.
- Up to 20,000 characters.

Settings (Settings > Widgets > Notepad): text size, monospace font, spell checking.

## Permissions

| Permission | Why |
|---|---|
| `storage` | Keeps the note. It stays on this computer, in Lizun's own storage. |

No network access.

## Development

The widget is plain HTML, CSS and JavaScript with no build step:

| File | What it is |
|---|---|
| `manifest.json` | Id, size, permission, settings and their Russian translation |
| `index.html` | Page shown in the island |
| `main.js` | Loads and saves the note, applies settings and language |
| `style.css` | Look, built on the island theme (`--lz-*` variables from `/__sdk/lizun.css`) |

To try changes, choose this folder in Settings > Widgets > Add a widget, or copy it to
`%APPDATA%\app.lizun.desktop\widgets\lizun.notepad\` and press Reload. How widgets work:
[Writing a Lizun widget](https://github.com/StreetYo/Lizun/blob/master/docs/widgets.md).

To release a version, raise `version` in `manifest.json`, then tag and publish a GitHub release
(`v1.0.1`).
