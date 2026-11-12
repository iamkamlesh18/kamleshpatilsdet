// Project stories use only supplied experience and results. Add evidence before changing metrics.
export const projects = [
  {
    name: "COOP and Smile Portal",
    domain: "Retail banking · BFSI",
    featured: true,
    spokenAnswer: [
      "I worked as a tester and automation engineer across the COOP and Smile Portal work. I designed and maintained an end-to-end automation framework, added UI and API suites to CI/CD, and created reusable test components.",
      "I also supported defect triage and SQL validation. Reusing common components helped improve test-cycle efficiency by 40%.",
      "Separately, I explored AI-assisted automation in a proof of concept. I created the framework structure and test approach first, then used GitHub Copilot with a clear requirement and prompt to generate a Gherkin scenario, page-object code, and separate JSON test data. I reviewed and exercised the output against dummy data to check whether it followed the framework and worked correctly. This was an evaluation, not a claim that generated tests were deployed to production.",
      "I used Atlassian Rovo to help understand project context and explore requirements from project-owner, Scrum Master, and tester perspectives. The aim was to see whether repetitive analysis could be reduced so the team could focus on higher-value work; I treated Rovo's output as a starting point for human review, not as a decision or a measured saving."
    ],
    tools: ["Java", "Serenity BDD", "Selenium", "REST Assured", "SQL", "GitLab CI/CD", "GitHub Copilot (POC)", "Atlassian Rovo (Jira exploration)"],
    result: "Improved test-cycle efficiency by 40% through reusable test components.",
    deepDive: [
      {
        title: "How the framework is organized",
        points: [
          "Gherkin feature files describe the business behaviour in readable scenarios.",
          "Step definitions connect each Given, When, and Then step to automation code.",
          "Page objects and reusable components hold common page interactions such as login, navigation, and table actions.",
          "Shared utilities handle configuration, test data, and waits; Serenity creates the execution report."
        ]
      },
      {
        title: "Suites and CI/CD",
        points: [
          "The coverage includes end-to-end UI, API, functional, regression, and sanity checks.",
          "Tags select the appropriate scenarios for a run.",
          "The GitLab pipeline runs the selected suites and publishes the Serenity report so the team can review outcomes."
        ]
      },
      {
        title: "Reusable components and data validation",
        points: [
          "Common login, navigation, and table actions are shared so a change can be maintained in one place.",
          "SQL checks help confirm that information shown in the UI and API matches the stored backend data."
        ]
      },
      {
        title: "AI-assisted automation proof of concept",
        points: [
          "I created the framework structure and decided how generated work should fit into it before asking Copilot to assist.",
          "I supplied a new requirement, a deliberate prompt, and dummy data so the proof of concept could be checked without using real customer information.",
          "I evaluated a flow from requirement to Gherkin, page-object code, and separate JSON test data.",
          "I reviewed the generated files against the requirement and framework, then exercised the proof of concept to check correctness.",
          "This was an experiment to evaluate usefulness and quality, not a production deployment or a measured productivity result."
        ]
      },
      {
        title: "Using Rovo to explore project work",
        points: [
          "I used Rovo to help me understand project context and look at work through project-owner, Scrum Master, and tester perspectives.",
          "The goal was to identify repetitive analysis that AI assistance might reduce, leaving people more time for important testing and decisions.",
          "I treated the output as a draft for human review; I did not treat the tool as a replacement for project ownership or QA judgement."
        ]
      }
    ]
  },
  {
    name: "Union Bank",
    domain: "Retail banking · Capital markets · BFSI",
    modules: ["Empower", "Digital Channels", "Commercial Card", "Unified Case Management"],
    spokenAnswer: [
      "I worked across four Union Bank modules: Empower, Digital Channels, Commercial Card, and Unified Case Management. I used BRDs and mapping documents to create test cases, scenarios, and requirements traceability.",
      "I automated loan, card, and digital-banking workflows, validated APIs and database records, and supported UAT sign-off across Agile sprints."
    ],
    tools: ["Java", "Selenium WebDriver", "Cucumber BDD", "REST Assured", "SQL", "Jira"],
    result: "Supported requirement coverage across multiple Agile sprints and UAT sign-offs."
  },
  {
    name: "Elements",
    domain: "Fleet management",
    workflows: ["Vehicle tracking", "Maintenance", "Asset management"],
    spokenAnswer: [
      "On Elements, I tested vehicle tracking, maintenance, and asset-management workflows. I built configurable test flows with the Rainbow framework and validated the end-to-end workflows.",
      "I also created data-driven regression packs. This reduced manual testing effort by 60%, and I was recognized for framework ownership and defect-free UAT delivery."
    ],
    tools: ["Rainbow framework", "YAML", "Java", "REST Assured", "Postman"],
    result: "Reduced manual effort by 60% with data-driven regression packs; recognized for framework ownership and defect-free UAT delivery."
  },
  {
    name: "RSA Intact",
    domain: "Insurance · Financial services",
    spokenAnswer: [
      "For RSA Intact, I tested insurance features with a requirements-first approach. I clarified requirements with the team, then designed scenarios and test cases from requirements and acceptance criteria.",
      "I performed functional and regression testing, documented and retested defects, and created automation for repeatable checks. I collaborated with developers and business teammates throughout the Agile development and release cycle."
    ],
    tools: ["Requirements review", "Test design", "Functional and regression testing", "Automation", "Agile Scrum"],
    result: "Supported requirement-based testing, repeatable automation, and clear feedback throughout the development cycle."
  }
];
