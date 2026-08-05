# jcludlum

Personal website for John Ludlum, built with [Quarto](https://quarto.org).

## Structure

```
_quarto.yml           site config: navbar, theme, footer
index.qmd             About page
projects.qmd          Projects page
blog/
  index.qmd           Blog listing page (auto-generated, don't add content here)
  posts/
    2026/
      20260805/
        index.qmd      one folder per post, named by date (YYYYMMDD)
art.qmd                Art page
art-gallery.js         click-to-expand behavior for the Art page galleries
art/                   image assets for Art page entries, one subfolder per series
images/                other site images (About page photo, etc.)
styles.css             custom CSS
```

## Commands

```
quarto preview         # live-reloading local server, opens in browser
quarto render          # builds the static site into _site/
```

`_site/` and `.quarto/` are gitignored — they're build output, not source.

## Adding a blog post

1. Copy an existing post folder, e.g. `blog/posts/2026/20260805/`, to a new
   folder named after the post's date: `blog/posts/2026/YYYYMMDD/`.
2. Edit `index.qmd` inside it: set `title`, `date`, and `categories: [<year>]`.
3. The Blog page (`blog/index.qmd`) picks it up automatically — sorted by
   date, filterable by year via the `categories` tag. No manual list to
   maintain.

For a new year, just start a new folder, e.g. `blog/posts/2027/...`, with
`categories: [2027]`.

## Adding an Art entry

`art.qmd` is a plain page (not a listing) — add content directly, following
the commented example already in the file.

## Publishing

Hosted on GitHub Pages at the repo `jcludlum.github.io`, matching
`website.site-url` in [_quarto.yml](_quarto.yml).

```
quarto publish gh-pages
```

This renders the site and pushes the static output to the `gh-pages` branch.
See [Quarto's publishing guide](https://quarto.org/docs/publishing/) for 
other targets (Netlify, Quarto Pub, etc.).
