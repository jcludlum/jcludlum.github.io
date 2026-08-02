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
      welcome/
        index.qmd      one folder per post
art.qmd                Art page
styles.css             custom CSS
```

## Commands

```
quarto preview         # live-reloading local server, opens in browser
quarto render          # builds the static site into _site/
```

`_site/` and `.quarto/` are gitignored — they're build output, not source.

## Adding a blog post

1. Copy `blog/posts/2026/welcome/` to a new folder, e.g. `blog/posts/2026/my-new-post/`.
2. Rename the folder to a URL-friendly slug (this becomes part of the post's URL).
3. Edit `index.qmd` inside it: set `title`, `date`, and `categories: [<year>]`.
4. The Blog page (`blog/index.qmd`) picks it up automatically — sorted by
   date, filterable by year via the `categories` tag. No manual list to
   maintain.

For a new year, just start a new folder, e.g. `blog/posts/2027/...`, with
`categories: [2027]`.

## Adding an Art entry

`art.qmd` is a plain page (not a listing) — add content directly, following
the commented example already in the file.

## Before going live

- Replace placeholders: `Your Name`, `your-username`, `you@example.com` in
  [_quarto.yml](_quarto.yml) and [index.qmd](index.qmd).
- Update `website.site-url` in `_quarto.yml` to the real deployed URL (needed
  for the RSS feed to generate correct links).
- [Quarto's publishing guide](https://quarto.org/docs/publishing/) covers
  GitHub Pages, Netlify, Quarto Pub, etc. — `quarto publish gh-pages` is the
  simplest option if hosting on GitHub Pages.
