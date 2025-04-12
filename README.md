# [tarot](https://yunru.se/tarot)

[![A screenshot of the Tarot site in action](screenshot.png)](https://yunru.se/tarot)

A small little site for drawing Tarot cards, or quickly sharing those you've drawn.
Cards can be saved quickly as an image; you can share the URL, too.

## Development

A GitHub Action renders a daily tarot, `https://yunru.se/tarot/daily.json`, at midnight UTC. This is unrelated to the website, but may be convenient for developing an application; default card images can be found at `https://yunru.se/tarot/cards/{style}/{card.code}.png`.

Styles include:

- `bw`: slightly variable size around 800x1400; about 200 KB
- `color`: 300x527; about 300 KB (used on the website by default)
- `color1910`: 1111x1919; about 850 KB

As the `gh-pages` branch contains daily commits, please see the [`develop`](https://github.com/yunruse/tarot/tree/develop) branch for actual developmental commits!

## Credit

This project is [public domain under CC0](https://creativecommons.org/public-domain/cc0/); do what you want with it!

Historical (assumed public domain) scans of [Pamela Colman Smith's famous cards](https://en.wikipedia.org/wiki/Rider–Waite_Tarot), as interpreted by Waite and published by Rider (aka the Rider-Waite-Smith deck), were sourced from:
- `color`: [lucielalles](https://luciellaes.itch.io/rider-waite-smith-tarot-cards-cc0)
- other styles: [Fafner_1908](https://www.reddit.com/r/tarot/comments/8vrxjp/links_to_high_resolutions_scans_of_the_original/)

Interpretations stored in `interpretations.json` are NOT public domain as they include excerpts from content that may be copyrighted:
- **Key to the Tarot** by Arthur Edward Waite
- **[Labyrinthos](https://labyrinthos.co/)** by Tina Gong
