# Kamlesh Patil — Interview Prep

A static, book-style interview-preparation site for GitHub Pages. The site has no build step or runtime dependencies. It starts with a grounded confidence ritual, puts short recall cues before full spoken answers, separates material into chapters, and uses original SVG diagrams plus optional YouTube and Google Images searches. Start with the [content guide](./CONTENT_GUIDE.md) before changing personal facts or interview answers.

## Update your prep content

The [profile](./data/profile.js), [project stories](./data/projects.js), and topic-wise question files in `data/` hold the content. The small [`index.html`](./index.html) is only the site shell; presentation and behaviour are in `assets/`.

The site has separate **Topics**, **Java**, and **Coding** tabs. Company questions are in [`data/questions-company.js`](./data/questions-company.js); Java interview theory and coding exercises are maintained separately in [`data/questions-java.js`](./data/questions-java.js) and [`data/questions-coding.js`](./data/questions-coding.js). Full answers sit behind recall cues so you can practise saying them before reading.

## Deploy with GitHub Pages

The workflow in [`.github/workflows/pages.yml`](./.github/workflows/pages.yml) deploys the site automatically whenever code is pushed to `main`. It stages and publishes only the page, its assets, and data files. In the repository’s **Settings → Pages**, set the build and deployment source to **GitHub Actions**. The first workflow run can also be started manually from the **Actions** tab.
