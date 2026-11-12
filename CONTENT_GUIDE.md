# Content guide

Read this guide before editing interview material. It records where facts live, how the browser assembles the study book, and which claims must remain carefully qualified.

## Site structure

- [`index.html`](./index.html) contains only the shared page shell and navigation.
- [`assets/app.js`](./assets/app.js) renders the Intro, Projects, SDET & QA Q&A, and Grounding sections.
- [`assets/styles.css`](./assets/styles.css) contains the responsive layout, chakra-inspired accent palette, and typography.
- [`data/profile.js`](./data/profile.js) contains the candidate profile, introduction, skills, certifications, and education.
- [`data/projects.js`](./data/projects.js) contains the four project stories; [`assets/app.js`](./assets/app.js) displays them as Union Bank, Elements, COOP and Smile Portal, then RSA Intact.
- [`data/questions-fundamentals-java.js`](./data/questions-fundamentals-java.js) contains testing fundamentals and core Java.
- [`data/questions-java.js`](./data/questions-java.js) contains additional Java interview questions. They appear in the Java topic inside the main Q&A book, not in a separate tab.
- [`data/questions-coding.js`](./data/questions-coding.js) contains Java coding exercises. They appear under Java coding practice in the same Q&A book.
- [`data/questions-ui-bdd.js`](./data/questions-ui-bdd.js) contains Selenium, Serenity BDD, and Cucumber questions.
- [`data/questions-api-sql.js`](./data/questions-api-sql.js) contains REST/API testing and SQL questions.
- [`data/questions-delivery.js`](./data/questions-delivery.js) contains TestNG, CI/CD, Git, Jira, and Agile questions.
- [`data/questions-interviews.js`](./data/questions-interviews.js) contains SDET scenarios and behavioural questions.
- [`data/questions-company.js`](./data/questions-company.js) preserves supplied company questions and the AI-in-Quality-Engineering answers.
- [`data/resources.js`](./data/resources.js) contains optional YouTube and Google Images searches for topics.
- [`data/grounding.js`](./data/grounding.js) contains the honest ownership and systems-thinking prompts used in the Intro.

The Grounding tab keeps affirmations, a present-tense manifestation exercise, faith, and breathing separate from interview study content. The top navigation includes a breathing shortcut beside Grounding; it opens the meditation panel directly. Returning to Grounding leaves the panel closed, and its timer stops if the user changes sections or closes the panel.

## Editing interview answers

1. Keep one answer per question. Write clear sentences in the `answer` field, as a string or an array of points; the page displays the sentences as spaced bullets in a single answer block.
2. Do not add a separate recall answer beside a second “spoken answer.” Put the useful explanation, example, and caveat into the one answer.
3. Keep the question under the most specific topic. The browser combines Java files under Java, coding exercises under Java coding practice, and repeated topic names into one chapter.
4. Keep every question in the main Q&A book. The “Most asked” filter is a shortcut, not a second question bank. Add or adjust its patterns in `assets/app.js` only when supplied material genuinely repeats or emphasizes a question.
5. Add Java code using the question's optional `code` field. Keep explanation in `answer`; the code is a supporting example, not another answer. Wrap key terms in `**double asterisks**` for bold emphasis; wrap inline keywords in backticks.
6. For a useful side-by-side distinction, add a `comparison` object with `headers` and `rows`; the page renders it as a scrollable accessible table below the answer.
7. Preserve the user's supplied company questions. Do not remove material just to shorten the book; improve organization and wording instead.
8. Keep answers accurate and sayable aloud. Use terms and examples that explain what a concept is for, when it applies, and important trade-offs. Use only confirmed project experience for first-person examples; label illustrative code as illustrative rather than implying it came from a project.
9. Use only facts Kamlesh has supplied. Do not invent responsibilities, tools, certifications, team sizes, or results.

## Project facts and AI proof of concept

- Keep the displayed project order: Union Bank, Elements, COOP and Smile Portal, RSA Intact.
- Preserve verified results: COOP improved test-cycle efficiency by 40%; Elements reduced manual effort by 60%.
- Describe Kamlesh's work as testing and automation work. Do not imply ownership of all team decisions.
- COOP/Smile AI work was a proof of concept: Kamlesh designed the framework shape, supplied requirements and prompts to GitHub Copilot, explored Gherkin, page-object code, and separate JSON dummy data, then reviewed and exercised the output for correctness.
- Do not describe the Copilot proof of concept as a production deployment or claim a measured productivity gain.
- Rovo was used to help understand project context and explore project-owner, Scrum Master, and tester perspectives. Do not claim a quantified time saving or that Rovo made project decisions.
- Keep any future outcomes clearly distinguished between measured results, qualitative observations, and experiments.

## Accuracy and maintenance

- Preserve facts in `data/profile.js` and verify current values before updating time-sensitive details.
- Keep the COOP framework, CI/CD, reusable-component, validation, and AI POC details in its deep dive.
- Learning links are external searches, not endorsements or fixed video recommendations; preserve that distinction.
- Keep data-file comments, imports, and this guide aligned when adding content.
- The Pages workflow publishes only `index.html`, `assets/`, and `data/`. The source notes, this guide, and other repository-only files are not included.

## Preview and deployment

Run `python3 -m http.server 8000` from the repository root and open `http://localhost:8000`; the site uses browser ES modules and should not be opened with `file://`.

Pushing to `main` runs [`.github/workflows/pages.yml`](./.github/workflows/pages.yml). GitHub Pages must use **Settings → Pages → Build and deployment → GitHub Actions** as its source.
