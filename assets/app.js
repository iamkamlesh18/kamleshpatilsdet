// The UI reads its facts and interview answers from the small files in ../data/.
import { profile } from "../data/profile.js";
import { projects } from "../data/projects.js";
import { fundamentalsAndJava } from "../data/questions-fundamentals-java.js";
import { uiAndBdd } from "../data/questions-ui-bdd.js";
import { apiAndSql } from "../data/questions-api-sql.js";
import { deliveryQuestions } from "../data/questions-delivery.js";
import { interviewQuestions } from "../data/questions-interviews.js";
import { companyQuestions } from "../data/questions-company.js";
import { javaInterviewQuestions } from "../data/questions-java.js";
import { codingQuestions } from "../data/questions-coding.js";
import { learningResources } from "../data/resources.js";
import { grounding } from "../data/grounding.js";

const sourceQuestionGroups = [
  ...fundamentalsAndJava,
  ...uiAndBdd,
  ...apiAndSql,
  ...deliveryQuestions,
  ...interviewQuestions,
  ...javaInterviewQuestions,
  ...companyQuestions
];
const previousQuestionGroups = [
  ...fundamentalsAndJava,
  ...javaInterviewQuestions,
  ...uiAndBdd,
  ...apiAndSql,
  ...deliveryQuestions,
  ...interviewQuestions,
  ...companyQuestions
];
const topicOrder = [
  "Testing fundamentals",
  "Defect management",
  "Agile and process",
  "Java",
  "Java coding practice",
  "Selenium WebDriver",
  "Serenity BDD",
  "Cucumber and Gherkin",
  "TestNG and JUnit",
  "Automation and framework",
  "AI in Quality Engineering",
  "REST Assured and API testing",
  "SQL for testers",
  "CI/CD, Git, and tools",
  "Payments and financial domain",
  "Editor and chat application automation",
  "SDET scenarios",
  "Behavioural and HR",
  "IVR and domain concepts"
];
const mostAskedPatterns = [
  /\btestng\b/i,
  /\bassert(?:ion)?\b/i,
  /\boop\b|object-oriented|object oriented|four pillars/i,
  /overload|overrid/i,
  /smoke testing|sanity testing/i,
  /defect life cycle|severity and priority/i,
  /testing methodologies|types of testing/i,
  /end of a sprint|cannot be completed within the sprint|after developers provide a build/i,
  /automation framework|data-driven testing|manual and what to automate/i,
  /payments domain|two banks communicate|fund transfer/i,
  /serenity.*selenium|serenity provide/i
];

function topicFor(group, question) {
  const topic = group.topic;
  const text = question.question.toLocaleLowerCase();
  if (topic === "Java" || topic.startsWith("Java —")) return "Java";
  if (topic === "Testing fundamentals" || topic.startsWith("Manual testing")) {
    return /severity|defect life cycle/.test(text) ? "Defect management" : "Testing fundamentals";
  }
  if (topic.startsWith("Defect management")) return "Defect management";
  if (topic.startsWith("Agile and testing")) return "Agile and process";
  if (topic.startsWith("Payments")) return "Payments and financial domain";
  if (topic.startsWith("General and behavioral")) return "Behavioural and HR";
  if (topic.startsWith("Other technical")) return "IVR and domain concepts";
  if (topic.startsWith("Selenium")) return "Selenium WebDriver";
  if (topic.startsWith("TestNG")) return "TestNG and JUnit";
  if (topic.startsWith("Framework, build")) return "Automation and framework";
  if (topic.startsWith("BDD")) return "Cucumber and Gherkin";
  if (topic.startsWith("Automation and framework")) {
    if (/testng|assert/.test(text)) return "TestNG and JUnit";
    if (/serenity/.test(text)) return "Serenity BDD";
    return "Automation and framework";
  }
  if (topic === "Common company questions") return "SDET scenarios";
  return topic;
}

function normalizeQuestion(question) {
  return question.toLocaleLowerCase().replace(/[^a-z0-9]+/gu, " ").trim();
}

const questionGroupsByTopic = new Map();
const questionOccurrences = new Map();
for (const group of sourceQuestionGroups) {
  for (const question of group.questions) {
    const topic = topicFor(group, question);
    if (!questionGroupsByTopic.has(topic)) questionGroupsByTopic.set(topic, { topic, questions: [] });
    const questions = questionGroupsByTopic.get(topic).questions;
    const key = `${topic}:${normalizeQuestion(question.question)}`;
    questionOccurrences.set(key, (questionOccurrences.get(key) || 0) + 1);
    const existing = questions.find(item => normalizeQuestion(item.question) === normalizeQuestion(question.question));
    if (existing) {
      existing.answer = question.answer.length > existing.answer.length ? question.answer : existing.answer;
      existing.code ||= question.code;
      continue;
    }
    questions.push({ ...question, topic });
  }
}

const codingGroup = {
  topic: "Java coding practice",
  questions: codingQuestions.map(question => ({ ...question, topic: "Java coding practice" }))
};
questionGroupsByTopic.set(codingGroup.topic, codingGroup);

const allQuestionGroups = topicOrder
  .map(topic => questionGroupsByTopic.get(topic))
  .filter(Boolean);
for (const group of allQuestionGroups) {
  for (const question of group.questions) {
    const key = `${group.topic}:${normalizeQuestion(question.question)}`;
    question.mostAsked = (questionOccurrences.get(key) || 0) > 1 ||
      mostAskedPatterns.some(pattern => pattern.test(question.question));
  }
}
const content = document.querySelector("#content");
const tabs = document.querySelector("#tabs");
const masteredKey = "kamlesh-interview-prep-mastered-v4";
const previousMasteredKey = "kamlesh-interview-prep-mastered-v3";
const tabNames = [
  ["intro", "Intro"],
  ["projects", "Projects"],
  ["questions", "SDET & QA Q&A"],
  ["grounding", "Grounding"]
];
let activeTopic = null;
let mostAskedOnly = true;
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
    const saved = localStorage.getItem(masteredKey);
    if (saved) return JSON.parse(saved);

    const previous = JSON.parse(localStorage.getItem(previousMasteredKey) || "{}");
    const migrated = {};
    previousQuestionGroups.forEach((group, groupIndex) => {
      group.questions.forEach((question, questionIndex) => {
        if (!previous[`${groupIndex}-${questionIndex}`]) return;
        const newGroupIndex = allQuestionGroups.findIndex(group => group.questions.some(item =>
          normalizeQuestion(item.question) === normalizeQuestion(question.question)
        ));
        if (newGroupIndex < 0) return;
        const newQuestionIndex = allQuestionGroups[newGroupIndex].questions.findIndex(item =>
          normalizeQuestion(item.question) === normalizeQuestion(question.question)
        );
        migrated[`${newGroupIndex}-${newQuestionIndex}`] = true;
      });
    });
    if (Object.keys(migrated).length) localStorage.setItem(masteredKey, JSON.stringify(migrated));
    return migrated;
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

function renderChips(items) {
  return `<ul class="chips">${items.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function renderAnswerPoints(answer) {
  const points = Array.isArray(answer) ? answer : answer.split(/\n\s*\n/u);
  return `<ul class="answer-points">${points.filter(Boolean).map(point => `<li>${escapeHtml(point)}</li>`).join("")}</ul>`;
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
      <h2>Tell me about yourself</h2>
    </header>
    <section class="book-card intro-answer">
      ${renderAnswerPoints(profile.intro)}
    </section>
    <details class="book-card">
      <summary>Skills, certifications, and education</summary>
      <h3 class="subheading">Core expertise</h3>
      ${renderChips(profile.expertise)}
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
    <details class="project${project.featured ? " featured" : ""}">
      <summary>${escapeHtml(project.name)}<small>${escapeHtml(project.domain)}</small></summary>
      ${optionalFacts}
      <section class="project-answer">
        <h3 class="subheading">My testing and automation work</h3>
        ${renderAnswerPoints(project.spokenAnswer)}
      </section>
      <p class="project-result"><span>Result</span><strong>${escapeHtml(project.result)}</strong></p>
      <h3 class="subheading">Tools</h3>
      ${renderChips(project.tools)}
      ${deepDive}
    </details>`;
}

function renderProjects() {
  const projectOrder = ["Union Bank", "Elements", "COOP and Smile Portal", "RSA Intact"];
  const orderedProjects = projectOrder
    .map(name => projects.find(project => project.name === name))
    .filter(Boolean);
  return `
    <header class="chapter-heading">
      <h2>Project experience</h2>
    </header>
    ${orderedProjects.map(renderProject).join("")}`;
}

function countQuestions() {
  return allQuestionGroups.reduce((total, group) => total + group.questions.length, 0);
}

function renderLearningLinks(topic) {
  const resource = learningResources[topic];
  if (!resource) return "";
  const videoUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(resource.youtube)}`;
  const imageUrl = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(resource.images)}`;
  return `
    <aside class="learning-links" aria-label="Optional learning resources">
      <div><strong>Learn this topic</strong><span>${escapeHtml(resource.description)}</span></div>
      <a href="${videoUrl}" target="_blank" rel="noopener noreferrer">Videos <span aria-hidden="true">↗</span></a>
      <a href="${imageUrl}" target="_blank" rel="noopener noreferrer">Diagrams <span aria-hidden="true">↗</span></a>
    </aside>`;
}

function renderQuestion(question) {
  return `
    <article class="question-row">
      <label class="progress-check" title="Mark this question as practiced">
        <input type="checkbox" aria-label="I can explain this question" data-question-key="${question.key}"${mastered[question.key] ? " checked" : ""}>
        <span aria-hidden="true">✓</span>
      </label>
      <details class="question">
        <summary>
          <span>${escapeHtml(question.question)}</span>
          ${question.mostAsked ? '<span class="question-star" aria-label="Frequently asked">★</span>' : ""}
        </summary>
        <div class="question-answer answer-content">${renderAnswerPoints(question.answer)}</div>
        ${question.code ? `
          <details class="code-fold">
            <summary>View Java example</summary>
            <pre><code>${escapeHtml(question.code)}</code></pre>
          </details>` : ""}
      </details>
    </article>`;
}

function renderTopicBar() {
  return `
    <nav class="topic-nav" aria-label="SDET and QA interview topics">
      <button type="button" class="topic-chip" data-most-asked aria-pressed="${mostAskedOnly && activeTopic === null}">★ Most asked</button>
      <button type="button" class="topic-chip" data-topic-all aria-pressed="${!mostAskedOnly && activeTopic === null}">All questions</button>
      ${allQuestionGroups.map(group => `
        <button type="button" class="topic-chip" data-topic="${escapeHtml(group.topic)}" aria-pressed="${activeTopic === group.topic}">${escapeHtml(group.topic)}</button>
      `).join("")}
    </nav>`;
}

function renderQuestionList(searchText) {
  const query = searchText.trim().toLocaleLowerCase();
  const visibleGroups = allQuestionGroups.map((group, groupIndex) => ({
    ...group,
    questions: group.questions.map((question, questionIndex) => ({
      ...question,
      key: `${groupIndex}-${questionIndex}`
    })).filter(question =>
      (activeTopic === null || question.topic === activeTopic) &&
      (!mostAskedOnly || query || question.mostAsked) &&
      `${question.question} ${question.answer}`.toLocaleLowerCase().includes(query)
    )
  })).filter(group => group.questions.length);
  const panel = document.querySelector("#question-panel");
  const progress = document.querySelector("#question-progress");
  if (!panel || !progress) return;

  panel.innerHTML = visibleGroups.length
    ? visibleGroups.map(group => `
        <section class="question-chapter" aria-label="${escapeHtml(group.topic)}">
          ${activeTopic === null ? `<h2>${escapeHtml(group.topic)}</h2>` : ""}
          ${activeTopic === group.topic && group.topic === "Java" ? renderJavaTree() : ""}
          ${activeTopic === group.topic ? renderLearningLinks(group.topic) : ""}
          ${group.questions.map(renderQuestion).join("")}
        </section>`).join("")
    : '<p class="empty">No questions match. Try a different topic or search term.</p>';

  updateProgress();
}

function updateTopicButtons() {
  document.querySelectorAll(".topic-nav button").forEach(button => {
    button.setAttribute("aria-pressed", String(
      button.hasAttribute("data-most-asked")
        ? mostAskedOnly && activeTopic === null
        : button.hasAttribute("data-topic-all")
          ? !mostAskedOnly && activeTopic === null
          : button.dataset.topic === activeTopic
    ));
  });
}

function updateProgress() {
  const progress = document.querySelector("#question-progress");
  if (!progress) return;
  const masteredCount = allQuestionGroups.reduce((total, group, groupIndex) =>
    total + group.questions.reduce((count, _, questionIndex) =>
      count + (mastered[`${groupIndex}-${questionIndex}`] ? 1 : 0), 0), 0);
  progress.innerHTML = `
    <span>${masteredCount} of ${countQuestions()} questions practised</span>
    <progress max="${countQuestions()}" value="${Math.min(masteredCount, countQuestions())}" aria-label="Questions practised"></progress>`;
}

function renderQuestions() {
  return `
    <header class="chapter-heading">
      <h2>SDET &amp; QA interview questions</h2>
    </header>
    <section class="study-controls">
      <label class="sr-only" for="question-search">Search questions and answers</label>
      <input id="question-search" class="search" type="search" placeholder="Search questions and answers">
      ${renderTopicBar()}
      <p id="question-progress" class="progress" aria-live="polite"></p>
    </section>
    <div id="question-panel"></div>`;
}

function renderJavaTree() {
  return `<figure class="java-tree">
    <svg viewBox="0 0 760 250" role="img" aria-labelledby="java-tree-title java-tree-desc">
      <title id="java-tree-title">Java object-oriented programming concept tree</title>
      <desc id="java-tree-desc">OOP branches into encapsulation, inheritance, polymorphism, and abstraction. Polymorphism branches into overloading and overriding.</desc>
      <path class="tree-line" d="M380 56v32M380 88H105v36M380 88H285v36M380 88H475v36M380 88H655v36M475 168v26h-90M475 194h102"/>
      <rect class="tree-root" x="290" y="12" width="180" height="44" rx="8"/><text x="380" y="39" text-anchor="middle">OBJECT-ORIENTED JAVA</text>
      <rect class="tree-branch" x="24" y="124" width="162" height="52" rx="8"/><text x="105" y="146" text-anchor="middle">Encapsulation</text><text class="tree-note" x="105" y="163" text-anchor="middle">protect state</text>
      <rect class="tree-branch" x="204" y="124" width="162" height="52" rx="8"/><text x="285" y="146" text-anchor="middle">Inheritance</text><text class="tree-note" x="285" y="163" text-anchor="middle">reuse / specialize</text>
      <rect class="tree-branch" x="394" y="124" width="162" height="44" rx="8"/><text x="475" y="151" text-anchor="middle">Polymorphism</text>
      <rect class="tree-branch" x="574" y="124" width="162" height="52" rx="8"/><text x="655" y="146" text-anchor="middle">Abstraction</text><text class="tree-note" x="655" y="163" text-anchor="middle">hide details</text>
      <rect class="tree-leaf" x="308" y="194" width="154" height="42" rx="8"/><text x="385" y="220" text-anchor="middle">Overloading</text>
      <rect class="tree-leaf" x="500" y="194" width="154" height="42" rx="8"/><text x="577" y="220" text-anchor="middle">Overriding</text>
    </svg>
    <figcaption>One tree to recall the four pillars—and the two forms of polymorphism.</figcaption>
  </figure>`;
}

function renderGrounding() {
  return `
    <header class="chapter-heading">
      <h2>Grounding</h2>
    </header>
    <section class="grounding-card">
      <p class="grounding-label">Manifestation · intention</p>
      <h3>I arrive prepared, calm, and ready to learn.</h3>
      <p>I picture myself listening carefully, taking a breath, and explaining what I know with clarity. I pair that intention with the real work of preparation and practice.</p>
    </section>
    <section class="grounding-card">
      <p class="grounding-label">Faith and gratitude</p>
      <ul class="grounding-list">
        <li>I am blessed and a child of God; my faith gives me strength, humility, and courage.</li>
        <li>My ancestors' blessings are with me. I remember their love, lessons, and strength.</li>
        <li>My Kuldevi's blessings guide and protect me; I carry gratitude, humility, and courage.</li>
        <li>I bow in gratitude to every force and deity I hold sacred, with awareness and a clear conscience.</li>
      </ul>
    </section>
    <section class="grounding-card">
      <p class="grounding-label">Affirmations · confidence and recall</p>
      <ul class="grounding-list">
        <li>I can pause, think, and speak honestly about what I know and what I did.</li>
        <li>My awareness is steady. I can observe, understand, and choose my next step.</li>
        <li>My memory is strong. I understand what I study, organize it clearly, and recall it through focused practice.</li>
        <li>I can understand and remember what I learn, one idea at a time.</li>
        <li>I can rise above technical detail and see the whole system, like Garuda or Hansa from a high vantage point.</li>
      </ul>
    </section>
    <details class="meditation-panel">
      <summary>Breathing meditation · 3 deep breaths, then 1 minute</summary>
      <p>Take three comfortable deep breaths, releasing gently through your mouth and nose. Then breathe in for 4 seconds and out for 6 seconds for one minute. Keep the breath comfortable; pause if you feel unwell.</p>
      <button id="breath-toggle" type="button" aria-pressed="false">Start breathing guide</button>
      <section id="breathing" class="breathing" aria-live="polite" hidden>
        <div class="breathing-orb" aria-hidden="true"></div>
        <p id="breathing-instruction">Ready when you are.</p>
      </section>
    </details>`;
}

function render() {
  stopBreathing();
  const requestedTab = window.location.hash.slice(1);
  const activeTab = tabNames.some(([key]) => key === requestedTab) ? requestedTab : "intro";
  activeTopic = null;
  mostAskedOnly = activeTab === "questions";
  tabs.innerHTML = tabNames.map(([key, label]) => `
    <button type="button" data-tab="${key}"${activeTab === key ? ' aria-current="page"' : ""}>${label}</button>
  `).join("");
  content.innerHTML = activeTab === "projects"
    ? renderProjects()
    : activeTab === "questions"
      ? renderQuestions()
      : activeTab === "grounding"
        ? renderGrounding()
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
    mostAskedOnly = false;
    updateTopicButtons();
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
  if (event.target.closest("#breath-toggle")) {
    toggleBreathing();
    return;
  }
  const topicButton = event.target.closest("[data-topic]");
  if (topicButton) {
    activeTopic = topicButton.dataset.topic;
    mostAskedOnly = false;
    updateTopicButtons();
    const search = document.querySelector("#question-search");
    if (search) search.value = "";
    renderQuestionList("");
    return;
  }
  if (event.target.closest("[data-most-asked]")) {
    activeTopic = null;
    mostAskedOnly = true;
    document.querySelector("#question-search").value = "";
    updateTopicButtons();
    renderQuestionList("");
    return;
  }
  if (event.target.closest("[data-topic-all]")) {
    activeTopic = null;
    mostAskedOnly = false;
    document.querySelector("#question-search").value = "";
    updateTopicButtons();
    renderQuestionList("");
    return;
  }
  if (document.body.classList.contains("recall")) {
    const answer = event.target.closest(".answer-content");
    if (answer) answer.classList.toggle("revealed");
  }
});

window.addEventListener("hashchange", render);
document.addEventListener("toggle", event => {
  if (event.target.matches(".meditation-panel") && !event.target.open) stopBreathing();
}, true);

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
  breathTimer = undefined;
  const panel = document.querySelector("#breathing");
  const button = document.querySelector("#breath-toggle");
  if (panel) panel.hidden = true;
  if (button) {
    button.setAttribute("aria-pressed", "false");
    button.textContent = "Start breathing guide";
  }
}

function toggleBreathing() {
  const panel = document.querySelector("#breathing");
  const button = document.querySelector("#breath-toggle");
  if (!panel || !button) return;
  if (!panel.hidden) {
    stopBreathing();
    return;
  }

  panel.hidden = false;
  button.setAttribute("aria-pressed", "true");
  button.textContent = "Stop breathing guide";
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
}

render();
