# Kamlesh Patil — Interview Prep

A static, book-style interview-preparation site for GitHub Pages. It brings QA, SDET, Java, and coding questions together in one searchable Q&A book, with one bullet-based answer per question. Optional diagrams and learning searches help explain topics. Read the [content guide](./CONTENT_GUIDE.md) before changing personal facts or interview answers.

## Update your prep content

The [profile](./data/profile.js), [project stories](./data/projects.js), and topic-wise question files in `data/` hold the content. The small [`index.html`](./index.html) is only the site shell; presentation and behaviour are in `assets/`.

The main sections are **Intro**, **Projects**, **SDET & QA Q&A**, and **Grounding**. A separate breathing shortcut beside Grounding opens its meditation panel directly. Affirmations and a present-tense manifestation exercise stay in Grounding. Java theory and coding are topics inside the Q&A section. Company questions and AI-in-testing examples are in [`data/questions-company.js`](./data/questions-company.js); Java interview theory and coding exercises are maintained in [`data/questions-java.js`](./data/questions-java.js) and [`data/questions-coding.js`](./data/questions-coding.js).

## Deploy with GitHub Pages

The workflow in [`.github/workflows/pages.yml`](./.github/workflows/pages.yml) deploys the site automatically whenever code is pushed to `main`. It stages and publishes only the page, its assets, and data files. In the repository’s **Settings → Pages**, set the build and deployment source to **GitHub Actions**. The first workflow run can also be started manually from the **Actions** tab.
