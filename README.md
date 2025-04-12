# [tarot](https://yunru.se/tarot)

[![A screenshot of the Tarot site in action](screenshot.png)](https://yunru.se/tarot)

A small little site for drawing Tarot cards, or quickly sharing those you've drawn.
Cards can be saved quickly as an image; you can share the URL, too.

## Development

A GitHub Action renders a daily tarot, `https://yunru.se/tarot/daily.json`, at midnight UTC. This is unrelated to the website, but may be convenient for developing an application; default card images can be found at `https://yunru.se/tarot/cards/color/{card.png}`.

As the `gh-pages` contains these daily commits, please see the [`develop`](https://github.com/yunruse/tarot/tree/develop) branch for actual developmental commits!

## Credit

This project is [public domain under CC0](https://creativecommons.org/public-domain/cc0/); do what you want with it!

Scans of [Pamela Colman Smith's famous cards](https://en.wikipedia.org/wiki/Rider–Waite_Tarot), as interpreted by Waite and published by Rider (aka the Rider-Waite-Smith deck) were sourced from [lucielalles](https://luciellaes.itch.io/rider-waite-smith-tarot-cards-cc0).

Interpretations stored in `interpretations.json` are NOT public domain as they include excerpts from content that may be copyrighted:
- Key to the Tarot by Arthur Edward Waite
- [Labyrinthos](https://labyrinthos.co/) by Tina Gong
