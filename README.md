# Kamlesh Patil — Interview Prep

A lightweight, static interview-preparation site for GitHub Pages. The site has no build step or runtime dependencies. Start with the [content guide](./CONTENT_GUIDE.md) before changing personal facts or interview answers.

## Update your prep content

The [profile](./data/profile.js), [project stories](./data/projects.js), and topic-wise question files in `data/` hold the content. The small [`index.html`](./index.html) is only the site shell; presentation and behaviour are in `assets/`.

## Deploy with GitHub Pages

The workflow in [`.github/workflows/pages.yml`](./.github/workflows/pages.yml) deploys the site automatically whenever code is pushed to `main`. It publishes only the page, its assets and data files, and this content guide. In the repository’s **Settings → Pages**, set the build and deployment source to **GitHub Actions**. The first workflow run can also be started manually from the **Actions** tab.
