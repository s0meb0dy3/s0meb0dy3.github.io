# Chirpy Starter

[![Gem Version](https://img.shields.io/gem/v/jekyll-theme-chirpy)][gem]&nbsp;
[![GitHub license](https://img.shields.io/github/license/cotes2020/chirpy-starter.svg?color=blue)][mit]

When installing the [**Chirpy**][chirpy] theme through [RubyGems.org][gem], Jekyll can only read files in the folders
`_data`, `_layouts`, `_includes`, `_sass` and `assets`, as well as a small part of options of the `_config.yml` file
from the theme's gem. If you have ever installed this theme gem, you can use the command
`bundle info --path jekyll-theme-chirpy` to locate these files.

The Jekyll team claims that this is to leave the ball in the user’s court, but this also results in users not being
able to enjoy the out-of-the-box experience when using feature-rich themes.

To fully use all the features of **Chirpy**, you need to copy the other critical files from the theme's gem to your
Jekyll site. The following is a list of targets:

```shell
.
├── _config.yml
├── _plugins
├── _tabs
└── index.html
```

To save you time, and also in case you lose some files while copying, we extract those files/configurations of the
latest version of the **Chirpy** theme and the [CD][CD] workflow to here, so that you can start writing in minutes.

## Usage

Check out the [theme's docs](https://github.com/cotes2020/jekyll-theme-chirpy/wiki).

## Blog Workflow

This repository is used as a personal blog based on Jekyll + Chirpy and deployed with GitHub Pages.

### One-time setup

1. Push this repository to GitHub.
2. In GitHub repository settings, open `Settings > Pages` and make sure the site is deployed from `GitHub Actions`.
3. Update site settings in [`_config.yml`](./_config.yml), especially:
   - `title`
   - `description`
   - `url`
   - `baseurl`
   - `social`
   - `avatar`

Notes:

- If the repository name is `<username>.github.io`, usually set:
  - `url: "https://<username>.github.io"`
  - `baseurl: ""`
- If the repository name is a project repo like `my-blog`, usually set:
  - `url: "https://<username>.github.io"`
  - `baseurl: "/my-blog"`

### Writing a new post

Create a Markdown file under [`_posts`](./_posts) using this filename format:

```text
YYYY-MM-DD-title.md
```

Example:

```text
2026-03-28-my-first-post.md
```

Suggested front matter:

```md
---
title: My First Post
date: 2026-03-28 20:00:00 +0800
categories: [blog]
tags: [jekyll, github-pages]
---
```

### Local preview

Run the site locally before publishing:

```bash
bundle install
bundle exec jekyll serve --livereload
```

Then open:

```text
http://127.0.0.1:4000
```

### Publish flow

After confirming the page looks right locally:

```bash
git add .
git commit -m "publish: add new post"
git push origin main
```

### Deployment

This repository already includes a GitHub Actions workflow at
[`/.github/workflows/pages-deploy.yml`](./.github/workflows/pages-deploy.yml).

When you push to `main` or `master`, GitHub Actions will automatically:

1. install dependencies
2. build the Jekyll site
3. deploy it to GitHub Pages

In short:

```text
Write post -> Preview locally -> git push -> GitHub Pages auto deploy
```

## Contributing

This repository is automatically updated with new releases from the theme repository. If you encounter any issues or want to contribute to its improvement, please visit the [theme repository][chirpy] to provide feedback.

## License

This work is published under [MIT][mit] License.

[gem]: https://rubygems.org/gems/jekyll-theme-chirpy
[chirpy]: https://github.com/cotes2020/jekyll-theme-chirpy/
[CD]: https://en.wikipedia.org/wiki/Continuous_deployment
[mit]: https://github.com/cotes2020/chirpy-starter/blob/master/LICENSE
