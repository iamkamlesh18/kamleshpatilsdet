// Common SDET and behavioural interview prompts. Tailor examples to the role and your own evidence.
export const interviewQuestions = [
  {
    topic: "Common company questions",
    questions: [
      {
        question: "How would you test a login page?",
        answer: "First, I would clarify the requirements: supported login methods, validation rules, account lockout behaviour, session rules, and accessibility expectations. Then I would cover a valid login, incorrect credentials, empty fields, boundary-length inputs, and relevant error messages.\n\nI would also check keyboard and cross-browser behaviour, session handling, and the related API or backend behaviour where appropriate. I would prioritize the critical user journey and high-risk cases, use controlled test accounts, and automate stable regression checks. I would not test security controls by making assumptions; I would follow the approved test scope."
      },
      {
        question: "How do you decide what to automate?",
        answer: "I look first for checks that are repeated often, have clear expected results, and protect important or high-risk user journeys. I consider how stable the application and test data are, how long the manual check takes, how quickly automation can provide feedback, and what it will cost to maintain.\n\nI automate suitable regression checks and leave exploratory testing, one-off investigations, or rapidly changing behaviour to a person when that is more effective. The goal is useful, trustworthy feedback, not the largest possible number of automated tests."
      },
      {
        question: "How do you investigate a flaky automated test?",
        answer: "I reproduce the failure and compare successful and failed runs. I review the test report, logs, screenshots, timing, test data, and environment to determine whether the cause is in the product, the automation, shared state, or the test environment.\n\nFor UI timing issues, I use condition-based waits and stable locators instead of fixed sleeps. For data problems, I isolate or reset test data. After making a focused correction, I run the test repeatedly and watch whether the failure rate improves. I avoid simply adding retries because retries can hide a real defect."
      },
      {
        question: "How would you design an automation framework?",
        answer: "I would begin with the application risks, team skills, test layers, reporting needs, and how the suite will run in CI. I would separate scenario intent from page or API interactions, reusable helpers, test data, and environment configuration.\n\nI would add clear setup and cleanup, useful reports, selective suite execution, and safe handling of parallel tests if the project needs it. I would start with the smallest design that supports the real use cases, then evolve it based on maintenance and feedback rather than over-engineering at the start."
      },
      {
        question: "A defect escaped to production. What would you do?",
        answer: "I would first work with the team to understand the customer impact, reproduce the issue where possible, and support the agreed mitigation. After the fix, I would help verify the behaviour and check related areas.\n\nThen I would review how the issue escaped: perhaps a requirement was unclear, a scenario was missing, or an environment difference mattered. I would focus on improving coverage or the process without blaming an individual, and add a targeted regression check when it provides lasting value."
      },
      {
        question: "How do you prioritize testing when time is limited?",
        answer: "I start with the changed areas, customer impact, business risk, dependencies, and the likelihood and consequence of failure. I make sure critical user journeys and high-severity failure modes receive attention before lower-risk details.\n\nI choose focused checks that provide the most useful information in the available time, and I tell stakeholders what has and has not been tested. Making residual risk visible helps the team make an informed release decision instead of implying that limited testing proves there is no risk."
      }
    ]
  },
  {
    topic: "Behavioural and HR",
    questions: [
      {
        question: "Why are you looking to leave Capgemini?",
        answer: "I am grateful for the experience I have gained at Capgemini. I have worked across banking, insurance, and other project areas and have developed my testing and automation skills while collaborating with delivery teams.\n\nI am now looking for a role where I can take greater ownership of quality and automation, contribute to the way testing is planned, and continue to grow technically. I am focusing on the kind of work I want to do next rather than speaking negatively about my current employer."
      },
      {
        question: "What is your biggest achievement?",
        answer: "One achievement I am proud of is the COOP work, where reusable test components helped improve test-cycle efficiency by 40%. I contributed to UI and API automation, the framework, CI/CD suites, defect triage, and SQL validation.\n\nOn the Elements fleet-management project, data-driven regression packs reduced manual effort by 60%. I would explain the baseline and how those percentages were measured if asked, and I would use the example most relevant to the role."
      },
      {
        question: "How do you handle a disagreement with a developer?",
        answer: "I keep the conversation focused on observable behaviour. I share the steps to reproduce the issue, the expected and actual results, and relevant logs or screenshots. I listen to the developer’s explanation and check whether we may have interpreted the requirement differently.\n\nIf the expected behaviour is still unclear, I involve the product owner or business analyst and agree on the requirement before deciding the next step. The aim is to understand and resolve the issue together, not to win an argument."
      },
      {
        question: "What is your notice period?",
        answer: "My recorded notice period is 90 days. I would confirm my current contractual notice period and any applicable release options before giving this answer in an interview."
      },
      {
        question: "What is one area you are working to improve?",
        answer: "I want to make my documentation of automation patterns more consistent. When I am focused on implementing a framework component, I can sometimes leave its usage notes until later.\n\nI am improving this by writing short notes as I build each component, including its purpose, setup, and an example. That makes the framework easier for teammates to use and easier for me to maintain."
      }
    ]
  }
];
