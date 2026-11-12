// Test framework execution, CI/CD, collaboration, and Agile process questions.
export const deliveryQuestions = [
  {
    topic: "TestNG and JUnit",
    questions: [
      {
        question: "Which TestNG annotations have you used?",
        answer: "TestNG provides configuration annotations at different scopes. @BeforeSuite and @AfterSuite run around a suite; @BeforeClass and @AfterClass run around a test class; and @BeforeMethod and @AfterMethod run around individual test methods. @Test marks a test method.\n\nI use setup and cleanup at the narrowest sensible scope so tests remain isolated. The exact lifecycle and annotation ordering should be clear from the suite configuration, especially when tests run in parallel."
      },
      {
        question: "What is the difference between hard and soft assertions?",
        answer: "A hard assertion stops the current test at the first failed assertion. It is useful when continuing would make later checks invalid or confusing.\n\nA soft assertion records failures and reports them when assertAll is called, allowing several independent checks to run in one test. I use soft assertions only when collecting those results is useful, and I make sure assertAll is called so failures cannot be accidentally ignored."
      },
      {
        question: "How do you run TestNG tests in parallel?",
        answer: "TestNG can run tests, classes, or methods in parallel through suite XML settings such as the parallel mode and thread-count. Before enabling parallel execution, I check that test data, browser or API clients, and shared state are safe for concurrent use.\n\nIf tests share mutable resources, I isolate those resources or keep the affected tests sequential. Parallelism should reduce feedback time without making failures nondeterministic."
      }
    ]
  },
  {
    topic: "CI/CD, Git, and tools",
    questions: [
      {
        question: "What is CI/CD?",
        answer: "Continuous Integration means developers integrate changes frequently and use automated checks, such as builds and tests, to find problems early. Continuous Delivery keeps the software in a releasable state, while Continuous Deployment can automatically release every qualifying change to production.\n\nPeople use the terms differently, so I clarify what a particular team means. In either case, automated feedback and a reliable release process are central."
      },
      {
        question: "How does GitLab CI support your project testing?",
        answer: "In the project workflow described in my experience, GitLab CI runs UI and API suites on relevant commits or merges and publishes test reports as artifacts. The results give the team feedback about whether the change meets the agreed checks.\n\nA failing check should be investigated and understood before a merge is treated as safe. I would describe the exact trigger, gating rule, and stages based on the actual pipeline rather than assume every project uses the same configuration."
      },
      {
        question: "Explain common Git terms.",
        answer: "A commit records a snapshot of changes. A branch gives work an independent line of development. A merge combines changes from branches, while a rebase replays commits on a different base and can create a cleaner history when used according to the team’s workflow.\n\nA pull request is a request to review and integrate a branch. I use the team’s conventions, keep changes focused, and resolve conflicts carefully so unrelated work is not lost."
      },
      {
        question: "How do you use Jira with Xray or Zephyr?",
        answer: "Jira is used to manage work such as stories and defects. Xray and Zephyr add test-management capabilities: teams can organize test cases, connect them to requirements, record executions, and review results.\n\nI use those links to make coverage and test status visible. I keep test cases current when requirements change and report defects with clear reproduction steps and evidence."
      }
    ]
  },
  {
    topic: "Agile and process",
    questions: [
      {
        question: "What is your role during a Scrum sprint?",
        answer: "I review stories and acceptance criteria with the team, raise questions during refinement, and design test cases for the agreed behaviour. As implementation progresses, I perform functional testing, automate appropriate checks, report defects, and retest fixes.\n\nI also support regression and UAT before a release. I share risks and test progress during the sprint so quality is a team activity rather than a final step owned only by QA."
      },
      {
        question: "What is Definition of Done?",
        answer: "Definition of Done is a shared checklist that describes the conditions a team expects before calling work complete. Depending on the team, that may include reviewed code, passing relevant tests, updated documentation, and acceptance criteria being met.\n\nIt should be agreed by the team and applied consistently. It is different from a story’s acceptance criteria, which describe the specific behaviour expected for that story."
      },
      {
        question: "What do you do when a requirement is unclear?",
        answer: "I raise the ambiguity during refinement or with the product owner or business analyst and explain why it affects test design or expected behaviour. I record the question and any temporary assumption so the team can see what remains unresolved.\n\nI confirm the answer before relying on it, then update the scenarios and test cases. This avoids silently turning an assumption into a requirement and reduces rework later."
      }
    ]
  }
];
