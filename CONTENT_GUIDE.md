# Content guide

This is the human and AI reference for keeping the interview-prep site accurate. Read this file before changing the site.

## What goes where

- [`index.html`](./index.html) is a small page shell. Keep personal details and interview answers out of it.
- [`assets/styles.css`](./assets/styles.css) controls presentation only.
- [`assets/app.js`](./assets/app.js) renders the page, tabs, search, recall mode, progress, and breathing timer.
- [`data/profile.js`](./data/profile.js) contains the introduction, skills, certifications, education, and other personal facts.
- [`data/projects.js`](./data/projects.js) contains the spoken project answers, tools, results, and the COOP deep dive.
- [`data/questions-fundamentals-java.js`](./data/questions-fundamentals-java.js) contains testing fundamentals and Java.
- [`data/questions-ui-bdd.js`](./data/questions-ui-bdd.js) contains Selenium, Serenity BDD, and Cucumber.
- [`data/questions-api-sql.js`](./data/questions-api-sql.js) contains API testing and SQL.
- [`data/questions-delivery.js`](./data/questions-delivery.js) contains TestNG, CI/CD, Git, Jira, and Agile.
- [`data/questions-interviews.js`](./data/questions-interviews.js) contains common company interview and behavioural questions.
- [`data/resources.js`](./data/resources.js) contains YouTube and Google Images search links for each learning chapter.
- The always-visible manifestation and affirmation ritual is plain HTML in [`index.html`](./index.html), so it remains visible even before JavaScript loads.
- [`data/grounding.js`](./data/grounding.js) contains honest ownership and systems-thinking prompts for the speaking guide.
- [`README.md`](./README.md) explains the project and deployment.

The original interview-prep notes supplied with the project are kept separately as a reference. The Pages workflow does not publish those source notes, this guide, or other repository-only files.

## Writing or updating content

1. Keep the candidate's voice natural, first-person, and easy to say aloud. Write complete answers rather than fragments.
2. Keep every question answer point-first. The page shows concise recall bullets first and places the full spoken explanation inside a separate expandable subsection.
3. Keep the key idea first, then add an example, practical use, or caveat. Use paragraph breaks (`\n\n`) to make those parts easier to scan.
4. Use only facts Kamlesh has supplied. Do not invent employers, responsibilities, tools, certifications, team sizes, or results.
5. Preserve verified project results: COOP improved test-cycle efficiency by 40%; Elements reduced manual effort by 60%. Do not change the meaning of either figure.
6. Keep each project's recall points, spoken answer, tools, and result separate. COOP has extra framework, CI/CD, reuse, data-validation, and troubleshooting depth.
7. Put each question under its existing topic. Each question file exports an array of topic objects; every topic has a name and a list of `{ question, answer }` records. Optional `recall` arrays can override the automatic first-sentence recall cues.
8. Add or update topic learning searches in `data/resources.js`. These open Google Images or YouTube search results, not embedded third-party media; the book's diagrams are original inline SVG.
9. Leave the short comments at the top of data files in place. They explain the file's purpose to future editors and AI tools.
10. If an answer depends on current personal details, such as notice period or years of experience, confirm it with Kamlesh before changing it.
11. Keep imports in `assets/app.js` in sync when adding a new data file, and keep the GitHub Pages upload paths in `.github/workflows/pages.yml` in sync if adding site assets.
12. Keep the static opening ritual in `index.html` visible without JavaScript. Keep confidence guidance encouraging and grounded: affirm preparation and honest communication, not guaranteed interview outcomes. Make it clear that leadership-style system thinking does not mean claiming work or authority the candidate did not have.

## Preview and publish

For a local preview, run `python3 -m http.server 8000` from the repository root and open `http://localhost:8000`. The JavaScript uses browser modules, so preview over HTTP rather than opening `index.html` directly.

Push changes to `main` to run the GitHub Pages workflow. The repository's Pages source must be set to **GitHub Actions**. The workflow copies `index.html`, `assets/`, and `data/` into a clean `_site/` directory, then publishes that directory. Source resume notes, this guide, and other repository-only files are not included in the site artifact.
