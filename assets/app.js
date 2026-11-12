// The UI reads its facts and interview answers from the small files in ../data/.
import { profile } from "../data/profile.js";
import { projects } from "../data/projects.js";
import { fundamentalsAndJava } from "../data/questions-fundamentals-java.js";
import { uiAndBdd } from "../data/questions-ui-bdd.js";
import { apiAndSql } from "../data/questions-api-sql.js";
import { deliveryQuestions } from "../data/questions-delivery.js";
import { interviewQuestions } from "../data/questions-interviews.js";

const questionGroups = [
  ...fundamentalsAndJava,
  ...uiAndBdd,
  ...apiAndSql,
  ...deliveryQuestions,
  ...interviewQuestions
];
const content = document.querySelector("#content");
const tabs = document.querySelector("#tabs");
const masteredKey = "kamlesh-interview-prep-mastered-v2";
const tabNames = [
  ["intro", "Intro"],
  ["projects", "Projects"],
  ["questions", "SDET Q&A"]
];
let activeTopic = "All";
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

function renderIntro() {
  const skills = profile.skillAreas.map(area => `
    <details class="question">
      <summary>${escapeHtml(area.title)}</summary>
      ${renderChips(area.skills)}
    </details>`).join("");

  return `
    <p class="section-label">01 / Profile</p>
    <section class="card">
      <h2>Tell me about yourself</h2>
      <div class="spoken-answer">${renderParagraphs(profile.intro)}</div>
      <h3>Key points to remember</h3>
      <div class="facts">
        <div class="fact"><strong>Role</strong>${escapeHtml(profile.role)}</div>
        <div class="fact"><strong>Experience</strong>${escapeHtml(profile.experience)}</div>
        <div class="fact"><strong>At Capgemini</strong>${escapeHtml(profile.experienceDates)}</div>
        <div class="fact"><strong>Based in</strong>${escapeHtml(profile.location)}</div>
        <div class="fact"><strong>Domains</strong>${escapeHtml(profile.domains.join(" · "))}</div>
      </div>
      <h3>Looking ahead</h3>
      <p>${escapeHtml(profile.nextRole)}. Open to ${escapeHtml(profile.workPreferences.join(", "))} opportunities.</p>
      <h3>Core expertise</h3>
      ${renderChips(profile.expertise)}
      <h3>Day-to-day responsibilities</h3>
      ${renderChips(profile.responsibilities)}
    </section>
    <details class="card">
      <summary>Certifications, education, and languages</summary>
      <h3>Certifications and training</h3>
      <ul class="points">${profile.certifications.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
      <h3>Education</h3>
      <p>${escapeHtml(profile.education)}</p>
      <h3>Languages</h3>
      ${renderChips(profile.languages)}
      <h3>Ways of working</h3>
      ${renderChips(profile.workingStyle)}
      <h3>Outside the sprint</h3>
      ${renderChips(profile.interests)}
    </details>
    <details class="card">
      <summary>More skills and tools</summary>
      ${skills}
    </details>`;
}

function renderProject(project) {
  const optionalFacts = [
    project.modules ? `<h3>Modules</h3>${renderChips(project.modules)}` : "",
    project.workflows ? `<h3>Workflows</h3>${renderChips(project.workflows)}` : ""
  ].join("");
  const deepDive = project.deepDive ? `
    <div class="deep-dive">
      <h3>COOP deep dive</h3>
      ${project.deepDive.map(section => `
        <h3>${escapeHtml(section.title)}</h3>
        <ul class="points">${section.points.map(point => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
      `).join("")}
    </div>` : "";

  return `
    <details class="project${project.featured ? " featured" : ""}"${project.featured ? " open" : ""}>
      <summary>${escapeHtml(project.name)}<small>${escapeHtml(project.domain)}</small></summary>
      ${optionalFacts}
      <h3>Spoken answer</h3>
      <div class="spoken-answer">${renderParagraphs(project.spokenAnswer)}</div>
      <h3>Tools</h3>
      ${renderChips(project.tools)}
      <h3>Result</h3>
      <p>${escapeHtml(project.result)}</p>
      ${deepDive}
    </details>`;
}

function renderProjects() {
  return `
    <p class="section-label">02 / Project stories</p>
    <p class="muted">Start with the spoken answer. Open a project for its tools, result, and follow-up details.</p>
    ${projects.map(renderProject).join("")}`;
}

function countQuestions() {
  return questionGroups.reduce((total, group) => total + group.questions.length, 0);
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
    (activeTopic === "All" || question.topic === activeTopic) &&
    `${question.question} ${question.answer}`.toLocaleLowerCase().includes(query)
  );
  const list = document.querySelector("#question-list");
  const progress = document.querySelector("#question-progress");
  if (!list || !progress) return;

  list.innerHTML = questions.length
    ? questions.map(question => `
      <div class="question-row">
        <input type="checkbox" aria-label="Mark as mastered" data-question-key="${question.key}"${mastered[question.key] ? " checked" : ""}>
        <details class="question">
          <summary>${escapeHtml(question.question)}</summary>
          <div class="question-answer answer-content">${renderParagraphs(question.answer.split("\n\n"))}</div>
        </details>
      </div>`).join("")
    : '<p class="empty">No question matches. Try another word or topic.</p>';

  const masteredCount = Object.values(mastered).filter(Boolean).length;
  progress.textContent = `${masteredCount} of ${countQuestions()} questions marked for review complete · ${questions.length} shown`;
}

function renderQuestions() {
  const topics = ["All", ...questionGroups.map(group => group.topic)];
  return `
    <p class="section-label">03 / Topic-wise practice</p>
    <p class="muted">Open a question to read a complete answer. The checkbox tracks your practice progress in this browser.</p>
    <label class="sr-only" for="question-search">Search questions and answers</label>
    <input id="question-search" class="search" type="search" placeholder="Search questions and answers">
    <div class="filters" aria-label="Filter by topic">
      ${topics.map(topic => `<button type="button" data-topic="${escapeHtml(topic)}" aria-pressed="${topic === activeTopic}">${escapeHtml(topic)}</button>`).join("")}
    </div>
    <p id="question-progress" class="progress" aria-live="polite"></p>
    <div id="question-list"></div>`;
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

  if (activeTab === "questions") {
    const filters = document.querySelector(".filters");
    filters.addEventListener("click", event => {
      const button = event.target.closest("button[data-topic]");
      if (!button) return;
      activeTopic = button.dataset.topic;
      filters.querySelectorAll("button").forEach(item => {
        item.setAttribute("aria-pressed", String(item === button));
      });
      renderQuestionList(document.querySelector("#question-search").value);
    });
    renderQuestionList("");
  }
}

tabs.addEventListener("click", event => {
  const button = event.target.closest("button[data-tab]");
  if (button) window.location.hash = button.dataset.tab;
});

document.addEventListener("input", event => {
  if (event.target.id === "question-search") renderQuestionList(event.target.value);
});

document.addEventListener("change", event => {
  const key = event.target.dataset.questionKey;
  if (!key) return;
  mastered[key] = event.target.checked;
  saveMastered();
  renderQuestionList(document.querySelector("#question-search")?.value || "");
});

document.addEventListener("click", event => {
  if (!document.body.classList.contains("recall")) return;
  const answer = event.target.closest(".answer-content, .spoken-answer");
  if (answer) answer.classList.toggle("revealed");
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
