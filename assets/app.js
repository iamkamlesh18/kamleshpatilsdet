// The UI reads its facts and interview answers from the small files in ../data/.
import { profile } from "../data/profile.js";
import { projects } from "../data/projects.js";
import { fundamentalsAndJava } from "../data/questions-fundamentals-java.js";
import { uiAndBdd } from "../data/questions-ui-bdd.js";
import { apiAndSql } from "../data/questions-api-sql.js";
import { deliveryQuestions } from "../data/questions-delivery.js";
import { interviewQuestions } from "../data/questions-interviews.js";
import { learningResources } from "../data/resources.js";
import { grounding } from "../data/grounding.js";

const questionGroups = [
  ...fundamentalsAndJava,
  ...uiAndBdd,
  ...apiAndSql,
  ...deliveryQuestions,
  ...interviewQuestions
];
const content = document.querySelector("#content");
const tabs = document.querySelector("#tabs");
const masteredKey = "kamlesh-interview-prep-mastered-v3";
const tabNames = [
  ["intro", "Intro"],
  ["projects", "Projects"],
  ["questions", "SDET Q&A"]
];
let activeTopic = null;
let mastered = loadMastered();
let breathTimer;

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function loadMastered() {
  try {
    return JSON.parse(localStorage.getItem(masteredKey) || "{}");
  } catch (error) {
    console.warn("Interview progress could not be loaded.", error);
    return {};
  }
}

function saveMastered() {
  try {
    localStorage.setItem(masteredKey, JSON.stringify(mastered));
  } catch (error) {
    console.warn("Interview progress could not be saved.", error);
  }
}

function renderParagraphs(paragraphs) {
  return paragraphs.map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join("");
}

function renderChips(items) {
  return `<ul class="chips">${items.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function renderRecallList(points, className = "recall-list") {
  return `<ol class="${className}">${points.map(point => `<li>${escapeHtml(point)}</li>`).join("")}</ol>`;
}

function renderRecallDiagram(items, className = "") {
  const wrapDetail = text => {
    const words = text.split(/\s+/u);
    const lines = [];
    let line = "";
    for (const word of words) {
      if (line && `${line} ${word}`.length > 58) {
        lines.push(line);
        line = word;
      } else {
        line = line ? `${line} ${word}` : word;
      }
    }
    if (line) lines.push(line);
    return lines;
  };
  const rows = items.map((item, index) => {
    const y = 8 + index * 68;
    const connector = index ? `<path class="diagram-arrow" d="M210 ${y - 10}v7m-4 -4 4 4 4 -4"/>` : "";
    const details = wrapDetail(item.detail).slice(0, 2).map((line, lineIndex) =>
      `<text class="diagram-detail" x="62" y="${y + 36 + lineIndex * 12}">${escapeHtml(line)}</text>`
    ).join("");
    return `${connector}
      <rect class="diagram-node" x="10" y="${y}" width="400" height="59" rx="12"/>
      <circle class="diagram-number" cx="36" cy="${y + 29}" r="14"/>
      <text class="diagram-number-text" x="36" y="${y + 34}" text-anchor="middle">${index + 1}</text>
      <text class="diagram-title" x="62" y="${y + 18}">${escapeHtml(item.title)}</text>
      ${details}`;
  }).join("");
  return `
    <figure class="diagram ${className}">
      <svg viewBox="0 0 420 ${items.length * 68 + 8}" role="img" aria-labelledby="recall-map-title recall-map-description">
        <title id="recall-map-title">Introduction recall path</title>
        <desc id="recall-map-description">Six steps: who I am, experience, domains, toolkit, day-to-day work, and continuous learning.</desc>
        ${rows}
      </svg>
      <figcaption>Follow the numbered path: ${items.map(item => escapeHtml(item.title)).join(" → ")}.</figcaption>
    </figure>`;
}

function renderCoopDiagram() {
  const layers = [
    ["Business examples", "Gherkin features · clear behaviour"],
    ["Automation steps", "Step definitions · connect story to code"],
    ["Reusable UI", "Page objects · shared components"],
    ["Checks and evidence", "Selenium · REST Assured · SQL"],
    ["Feedback", "GitLab CI/CD · Serenity report"]
  ];
  const markup = layers.map(([title, detail], index) => {
    const y = 12 + index * 61;
    const link = index ? `<path class="diagram-arrow" d="M210 ${y - 13}v8m-4 -4 4 4 4 -4"/>` : "";
    return `${link}<rect class="diagram-node" x="10" y="${y}" width="400" height="47" rx="11"/>
      <text class="diagram-title" x="28" y="${y + 19}">${escapeHtml(title)}</text>
      <text class="diagram-detail" x="28" y="${y + 36}">${escapeHtml(detail)}</text>`;
  }).join("");
  return `<figure class="diagram coop-diagram">
    <svg viewBox="0 0 420 315" role="img" aria-labelledby="coop-map-title coop-map-description">
      <title id="coop-map-title">COOP automation flow</title>
      <desc id="coop-map-description">Business examples flow through automation steps and reusable UI components to UI, API, and database checks, then CI feedback and Serenity reports.</desc>
      ${markup}
    </svg>
    <figcaption>A simple way to explain how a behaviour becomes a useful test result.</figcaption>
  </figure>`;
}

function renderSystemViewDiagram() {
  const layers = [
    ["User and business goal", "What value or outcome is needed?"],
    ["Interface and client", "Web · mobile · upstream caller"],
    ["API and business services", "Contracts · rules · validation"],
    ["Data and integrations", "Database · external services · queues"],
    ["Operations and feedback", "Logs · monitoring · CI/CD · support"]
  ];
  const nodes = layers.map(([title, detail], index) => {
    const y = 16 + index * 62;
    const arrow = index ? `<path class="diagram-arrow" d="M235 ${y - 13}v9m-5 -5 5 5 5 -5"/>` : "";
    return `${arrow}
      <rect class="diagram-node" x="14" y="${y}" width="442" height="48" rx="11"/>
      <text class="diagram-title" x="30" y="${y + 19}">${escapeHtml(title)}</text>
      <text class="diagram-detail" x="30" y="${y + 36}">${escapeHtml(detail)}</text>`;
  }).join("");
  return `<figure class="diagram architecture-diagram">
    <svg viewBox="0 0 640 330" role="img" aria-labelledby="system-view-title system-view-description">
      <title id="system-view-title">A high-level system view for interview answers</title>
      <desc id="system-view-description">Trace a user and business goal through interface, API and business services, data and integrations, and operations. Quality thinking cuts across every layer.</desc>
      ${nodes}
      <path class="quality-bracket" d="M480 26h16v286h-16"/>
      <text class="quality-label" x="516" y="130">QUALITY</text>
      <text class="quality-detail" x="516" y="152">Requirements</text>
      <text class="quality-detail" x="516" y="171">Risk</text>
      <text class="quality-detail" x="516" y="190">Test data</text>
      <text class="quality-detail" x="516" y="209">Evidence</text>
      <text class="quality-detail" x="516" y="228">Feedback</text>
    </svg>
    <figcaption>Think top to bottom for the system flow; think across the layers for quality.</figcaption>
  </figure>`;
}

function renderIntro() {
  const skills = profile.skillAreas.map(area => `
    <details class="question">
      <summary>${escapeHtml(area.title)}</summary>
      ${renderChips(area.skills)}
    </details>`).join("");

  return `
    ${renderOwnershipGuide()}
    <header class="chapter-heading">
      <p class="section-label">Chapter 01 · Your introduction</p>
      <h2>A good answer is a path, not a paragraph to memorize.</h2>
      <p>Remember six ideas in order. Then speak naturally in your own words.</p>
    </header>
    <section id="intro-recall" class="book-card" tabindex="-1">
      <h3 class="subheading">Your six-step recall map</h3>
      ${renderRecallDiagram(profile.introRecall)}
    </section>
    <details class="book-card answer-fold">
      <summary>Read the full spoken introduction</summary>
      <div class="spoken-answer answer-content">${renderParagraphs(profile.intro)}</div>
    </details>
    <section class="book-card">
      <h3 class="subheading">At a glance</h3>
      <dl class="facts">
        <div class="fact"><dt>Role</dt><dd>${escapeHtml(profile.role)}</dd></div>
        <div class="fact"><dt>Experience</dt><dd>${escapeHtml(profile.experience)}</dd></div>
        <div class="fact"><dt>At Capgemini</dt><dd>${escapeHtml(profile.experienceDates)}</dd></div>
        <div class="fact"><dt>Based in</dt><dd>${escapeHtml(profile.location)}</dd></div>
        <div class="fact"><dt>Domains</dt><dd>${escapeHtml(profile.domains.join(" · "))}</dd></div>
      </dl>
      <h3 class="subheading">Looking ahead</h3>
      <p>${escapeHtml(profile.nextRole)}. Open to ${escapeHtml(profile.workPreferences.join(", "))} opportunities.</p>
    </section>
    <details class="book-card">
      <summary>Skills, certifications, and education</summary>
      <h3 class="subheading">Core expertise</h3>
      ${renderChips(profile.expertise)}
      <h3 class="subheading">Day-to-day responsibilities</h3>
      ${renderChips(profile.responsibilities)}
      <h3 class="subheading">Certifications and training</h3>
      <ul class="points">${profile.certifications.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      <h3 class="subheading">Education</h3>
      <p>${escapeHtml(profile.education)}</p>
      <h3 class="subheading">Languages</h3>
      ${renderChips(profile.languages)}
      <h3 class="subheading">More skills and tools</h3>
      ${skills}
      <h3 class="subheading">Ways of working and interests</h3>
      ${renderChips([...profile.workingStyle, ...profile.interests])}
    </details>`;
}

function renderOwnershipGuide() {
  return `
    <details class="book-card ownership-guide">
      <summary>Speak with ownership · See the system like a lead</summary>
      <p class="section-label">A lead's point of view</p>
      <h3 class="subheading">Explain the whole system, then your part in it</h3>
      <p>Speaking with ownership does not mean pretending to know everything. It means making your reasoning visible: start with the goal, trace the flow, name the boundaries, explain the risk, and show the evidence.</p>
      ${renderSystemViewDiagram()}
      <ol class="ownership-steps">
        ${grounding.ownershipSteps.map(step => `<li><strong>${escapeHtml(step.title)}</strong><span>${escapeHtml(step.detail)}</span></li>`).join("")}
      </ol>
      <h4>Useful opening lines</h4>
      <ul class="speaking-prompts">${grounding.speakingPrompts.map(line => `<li>${escapeHtml(line)}</li>`).join("")}</ul>
      <p class="honesty-note">${escapeHtml(grounding.honestyNote)}</p>
    </details>`;
}

function renderProject(project) {
  const optionalFacts = [
    project.modules ? `<h3>Modules</h3>${renderChips(project.modules)}` : "",
    project.workflows ? `<h3>Workflows</h3>${renderChips(project.workflows)}` : ""
  ].join("");
  const deepDive = project.deepDive ? `
    <details class="deep-dive">
      <summary>Open the COOP framework deep dive</summary>
      <h3 class="subheading">Framework, at a glance</h3>
      ${renderCoopDiagram()}
      ${project.deepDive.map(section => `
        <section class="detail-section">
          <h4>${escapeHtml(section.title)}</h4>
          <ul class="points">${section.points.map(point => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
        </section>
      `).join("")}
    </details>` : "";

  return `
    <details class="project${project.featured ? " featured" : ""}"${project.featured ? " open" : ""}>
      <summary>${escapeHtml(project.name)}<small>${escapeHtml(project.domain)}</small></summary>
      ${optionalFacts}
      <div class="project-summary">
        <div><h3 class="subheading">Recall points</h3>${renderRecallList(project.recall)}</div>
        <div class="project-result"><span>Result</span><strong>${escapeHtml(project.result)}</strong></div>
      </div>
      <details class="answer-fold">
        <summary>Read the full spoken answer</summary>
        <div class="spoken-answer answer-content">${renderParagraphs(project.spokenAnswer)}</div>
      </details>
      <h3 class="subheading">Tools I used</h3>
      ${renderChips(project.tools)}
      ${deepDive}
    </details>`;
}

function renderProjects() {
  return `
    <header class="chapter-heading">
      <p class="section-label">Chapter 02 · Project stories</p>
      <h2>Tell the story. Show your contribution. Finish with the result.</h2>
      <p>Remember the short outline first. Expand the spoken answer when you want to rehearse it.</p>
    </header>
    ${projects.map(renderProject).join("")}`;
}

function countQuestions() {
  return questionGroups.reduce((total, group) => total + group.questions.length, 0);
}

function firstSentence(paragraph) {
  if ("Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter("en", { granularity: "sentence" });
    return segmenter.segment(paragraph)[Symbol.iterator]().next().value.segment.trim();
  }
  return paragraph.match(/^.*?[.!?](?=\s|$)/u)?.[0] || paragraph;
}

function recallPoints(question) {
  if (question.recall?.length) return question.recall;
  return question.answer.split(/\n\s*\n/u).map(firstSentence).filter(Boolean);
}

function renderLearningLinks(topic) {
  const resource = learningResources[topic];
  if (!resource) return "";
  const videoUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(resource.youtube)}`;
  const imageUrl = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(resource.images)}`;
  return `
    <aside class="learning-links" aria-label="Optional learning resources">
      <div><strong>Go a little deeper</strong><span>${escapeHtml(resource.description)}</span></div>
      <a href="${videoUrl}" target="_blank" rel="noopener noreferrer">YouTube lessons <span aria-hidden="true">↗</span></a>
      <a href="${imageUrl}" target="_blank" rel="noopener noreferrer">Google Images <span aria-hidden="true">↗</span></a>
    </aside>`;
}

function renderQuestion(question) {
  const recall = recallPoints(question);
  return `
    <article class="question-row">
      <label class="progress-check" title="Mark this question as practiced">
        <input type="checkbox" aria-label="I can explain this question" data-question-key="${question.key}"${mastered[question.key] ? " checked" : ""}>
        <span aria-hidden="true">✓</span>
      </label>
      <details class="question">
        <summary>${escapeHtml(question.question)}</summary>
        <div class="answer-layout">
          <section class="answer-recall answer-content">
            <h4>Quick recall</h4>
            ${renderRecallList(recall)}
          </section>
          <details class="answer-fold">
            <summary>Read the full spoken answer</summary>
            <div class="spoken-answer answer-content">${renderParagraphs(question.answer.split(/\n\s*\n/u))}</div>
          </details>
        </div>
      </details>
    </article>`;
}

function renderChapterIndex() {
  return `
    <section class="book-card">
      <div class="chapter-intro">
        <div>
          <p class="section-label">Choose a chapter</p>
          <h2>The SDET question book</h2>
          <p>One topic at a time. Read the recall points, say your answer aloud, then open the full explanation.</p>
        </div>
        <svg class="pyramid-diagram" viewBox="0 0 220 180" role="img" aria-labelledby="pyramid-title pyramid-description">
          <title id="pyramid-title">A balanced testing pyramid</title>
          <desc id="pyramid-description">A broad base of fast unit checks, a middle layer of API and integration checks, and a smaller top layer of end-to-end user interface checks.</desc>
          <path class="pyramid-base" d="M22 155 63 97h94l41 58z"/>
          <path class="pyramid-middle" d="m68 91 33-47h18l33 47z"/>
          <path class="pyramid-top" d="m105 38 5-18 5 18z"/>
          <text x="110" y="139" text-anchor="middle">Many fast checks</text>
          <text x="110" y="82" text-anchor="middle">API & integration</text>
          <text x="110" y="34" text-anchor="middle">UI</text>
        </svg>
        <p class="diagram-note">Many fast unit checks → focused API and integration checks → a smaller set of full UI journeys.</p>
      </div>
      <div class="chapter-grid">
        ${questionGroups.map((group, index) => `
          <button class="chapter-tile" type="button" data-topic="${escapeHtml(group.topic)}">
            <span class="chapter-number">${String(index + 1).padStart(2, "0")}</span>
            <strong>${escapeHtml(group.topic)}</strong>
            <span>${escapeHtml(learningResources[group.topic]?.description || "Review key ideas and practise a clear answer.")}</span>
            <small>${group.questions.length} questions · Open chapter →</small>
          </button>`).join("")}
      </div>
    </section>
    <section class="book-card study-method">
      <h3 class="subheading">A simple way to study</h3>
      <ol class="study-steps">
        <li><strong>Preview.</strong> Read the chapter title and the question.</li>
        <li><strong>Recall.</strong> Say the quick points from memory before opening the full answer.</li>
        <li><strong>Explain.</strong> Use the full answer to fill gaps; put it in your own words.</li>
        <li><strong>Repeat.</strong> Tick a question when you can answer it clearly without reading.</li>
      </ol>
      <p class="muted">The diagrams in this book are original SVG illustrations. Optional image searches open Google Images; learning searches open YouTube. External results can change over time.</p>
    </section>`;
}

function renderQuestionList(searchText) {
  const query = searchText.trim().toLocaleLowerCase();
  const questions = questionGroups.flatMap((group, groupIndex) =>
    group.questions.map((question, questionIndex) => ({
      ...question,
      topic: group.topic,
      key: `${groupIndex}-${questionIndex}`
    }))
  ).filter(question =>
    (activeTopic === null || question.topic === activeTopic) &&
    `${question.question} ${question.answer}`.toLocaleLowerCase().includes(query)
  );
  const panel = document.querySelector("#question-panel");
  const progress = document.querySelector("#question-progress");
  if (!panel || !progress) return;

  if (activeTopic === null && !query) {
    panel.innerHTML = renderChapterIndex();
  } else {
    const heading = query && activeTopic === null
      ? `<h2>Search results</h2><p class="muted">Matching questions from every chapter.</p>`
      : `<h2>${escapeHtml(activeTopic)}</h2><p class="muted">Read the question, recall the points, then expand the spoken answer.</p>${renderLearningLinks(activeTopic)}`;
    panel.innerHTML = `
      <section class="chapter-view">
        <button class="back-button" type="button" data-return-to-chapters>← All chapters</button>
        <header class="chapter-heading">${heading}</header>
        ${questions.length
          ? questions.map(renderQuestion).join("")
          : '<p class="empty">No question matches. Try another word or chapter.</p>'}
      </section>`;
  }

  updateProgress();
}

function updateProgress() {
  const progress = document.querySelector("#question-progress");
  if (!progress) return;
  const masteredCount = questionGroups.reduce((total, group, groupIndex) =>
    total + group.questions.reduce((count, _, questionIndex) =>
      count + (mastered[`${groupIndex}-${questionIndex}`] ? 1 : 0), 0), 0);
  progress.innerHTML = `
    <span>${masteredCount} of ${countQuestions()} questions practised</span>
    <progress max="${countQuestions()}" value="${Math.min(masteredCount, countQuestions())}" aria-label="Questions practised"></progress>`;
}

function renderQuestions() {
  return `
    <header class="chapter-heading">
      <p class="section-label">Chapter 03 · The question book</p>
      <h2>Short cues first. Full explanations when you need them.</h2>
      <p>Choose one chapter or search the whole book. Every question has recall points before the longer spoken answer.</p>
    </header>
    <section class="book-card study-controls">
      <label class="sr-only" for="question-search">Search questions and answers</label>
      <input id="question-search" class="search" type="search" placeholder="Search all questions and answers">
      <p id="question-progress" class="progress" aria-live="polite"></p>
    </section>
    <div id="question-panel"></div>`;
}

function render() {
  const requestedTab = window.location.hash.slice(1);
  const activeTab = tabNames.some(([key]) => key === requestedTab) ? requestedTab : "intro";
  tabs.innerHTML = tabNames.map(([key, label]) => `
    <button type="button" data-tab="${key}"${activeTab === key ? ' aria-current="page"' : ""}>${label}</button>
  `).join("");
  content.innerHTML = activeTab === "projects"
    ? renderProjects()
    : activeTab === "questions"
      ? renderQuestions()
      : renderIntro();

  if (activeTab === "questions") renderQuestionList("");
}

tabs.addEventListener("click", event => {
  const button = event.target.closest("button[data-tab]");
  if (button) window.location.hash = button.dataset.tab;
});

document.addEventListener("input", event => {
  if (event.target.id === "question-search") {
    activeTopic = null;
    renderQuestionList(event.target.value);
  }
});

document.addEventListener("change", event => {
  const key = event.target.dataset.questionKey;
  if (!key) return;
  mastered[key] = event.target.checked;
  saveMastered();
  updateProgress();
});

document.addEventListener("click", event => {
  if (event.target.closest("[data-start-study]")) {
    if (window.location.hash !== "#intro") window.location.hash = "intro";
    window.setTimeout(() => {
      document.querySelector("#intro-recall")?.scrollIntoView({ behavior: "smooth", block: "start" });
      document.querySelector("#intro-recall")?.focus({ preventScroll: true });
    }, 0);
    return;
  }
  if (event.target.closest("[data-start-breathing]")) {
    document.querySelector("#breath-toggle").click();
    return;
  }
  const topicButton = event.target.closest("[data-topic]");
  if (topicButton) {
    activeTopic = topicButton.dataset.topic;
    const search = document.querySelector("#question-search");
    if (search) search.value = "";
    renderQuestionList(document.querySelector("#question-search")?.value || "");
    return;
  }
  if (event.target.closest("[data-return-to-chapters]")) {
    activeTopic = null;
    document.querySelector("#question-search").value = "";
    renderQuestionList("");
    return;
  }
  if (document.body.classList.contains("recall")) {
    const answer = event.target.closest(".answer-content, .spoken-answer");
    if (answer) answer.classList.toggle("revealed");
  }
});

window.addEventListener("hashchange", render);

document.querySelector("#recall-toggle").addEventListener("click", event => {
  const enabled = document.body.classList.toggle("recall");
  event.currentTarget.setAttribute("aria-pressed", String(enabled));
});

document.querySelector("#theme-toggle").addEventListener("click", () => {
  const root = document.documentElement;
  const isDark = root.dataset.theme
    ? root.dataset.theme === "dark"
    : window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme = isDark ? "light" : "dark";
});

function stopBreathing() {
  window.clearTimeout(breathTimer);
  document.querySelector("#breathing").hidden = true;
  document.querySelector("#breath-toggle").setAttribute("aria-expanded", "false");
}

document.querySelector("#breath-toggle").addEventListener("click", () => {
  const panel = document.querySelector("#breathing");
  const button = document.querySelector("#breath-toggle");
  if (!panel.hidden) {
    stopBreathing();
    return;
  }

  panel.hidden = false;
  button.setAttribute("aria-expanded", "true");
  const instruction = document.querySelector("#breathing-instruction");
  const orb = document.querySelector(".breathing-orb");
  const steps = [];
  for (let breath = 1; breath <= 3; breath += 1) {
    steps.push([`Deep breath ${breath} of 3: inhale`, 4, true]);
    steps.push(["Release through your mouth and nose", 4, false]);
  }
  for (let second = 0; second < 60; second += 10) {
    steps.push(["Inhale for 4 seconds", 4, true]);
    steps.push(["Exhale for 6 seconds", 6, false]);
  }

  let step = 0;
  function advance() {
    if (step === steps.length) {
      instruction.textContent = "One minute complete. You are ready.";
      breathTimer = window.setTimeout(stopBreathing, 3000);
      return;
    }
    const [text, duration, inhale] = steps[step];
    step += 1;
    instruction.textContent = text;
    orb.style.transition = `transform ${duration}s ease-in-out`;
    orb.style.transform = inhale ? "scale(1)" : "scale(.6)";
    breathTimer = window.setTimeout(advance, duration * 1000);
  }

  orb.style.transition = "none";
  orb.style.transform = "scale(.6)";
  void orb.offsetWidth;
  advance();
});

render();
