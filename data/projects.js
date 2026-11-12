// Project stories use only supplied experience and results. Add evidence before changing metrics.
export const projects = [
  {
    name: "COOP — Retail COOP and Smile Portal",
    domain: "Retail banking · BFSI",
    featured: true,
    spokenAnswer: [
      "I worked on the Retail COOP and Smile Portal account, where I built and maintained UI and API automation. I designed an end-to-end framework and added UI and API suites to the CI/CD process.",
      "I also created reusable test components and worked with the team on defect triage and SQL validation. Reusing the common components helped us improve test-cycle efficiency by 40%."
    ],
    tools: ["Java", "Serenity BDD", "Selenium", "REST Assured", "SQL", "GitLab CI/CD"],
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
        title: "Challenges and details to personalize",
        points: [
          "For flaky UI checks, use stable locators and condition-based explicit waits instead of fixed delays.",
          "For data or environment issues, explain how controlled test data and clear environment checks helped isolate the cause.",
          "Add only personal, verifiable details here: suite size, pipeline duration, defects found, and team contribution."
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
