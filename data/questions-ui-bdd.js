// UI automation, Serenity, and BDD questions. Keep answers practical and experience-aligned.
export const uiAndBdd = [
  {
    topic: "Selenium WebDriver",
    questions: [
      {
        question: "Which Selenium locators do you use?",
        answer: "Selenium supports ID, name, class name, tag name, link text, partial link text, CSS selectors, and XPath. I prefer a stable unique ID or a clear CSS selector when the application provides one.\n\nI use XPath when I need to express a relationship or condition that is difficult to represent otherwise. I avoid brittle selectors tied to changing layout details and work with the team to add stable test attributes when that is practical."
      },
      {
        question: "What is the difference between implicit and explicit waits?",
        answer: "An implicit wait applies a general polling timeout to element lookups throughout the WebDriver session. An explicit wait waits for a specific condition, such as an element becoming visible or clickable, and is usually easier to reason about for a particular action.\n\nI prefer explicit waits for targeted synchronization. Mixing implicit and explicit waits can make the total wait time difficult to predict, so I use a consistent wait strategy and avoid fixed sleeps except when there is a specific justified reason."
      },
      {
        question: "What is the Page Object Model?",
        answer: "The Page Object Model represents a page or meaningful UI component as an object. That object owns the locators and actions for that part of the application, while the test describes the scenario and expected outcome.\n\nThis separation keeps tests easier to read and helps localize UI changes. I still keep assertions and business intent clear in the test rather than turning a page object into a large collection of unrelated helper methods."
      },
      {
        question: "How do you handle dropdowns, alerts, frames, and windows?",
        answer: "For a standard HTML select element, Selenium’s Select helper lets me choose by visible text, value, or index. For a browser alert, I switch to the alert and read its text, accept it, or dismiss it as the scenario requires.\n\nFor an iframe, I switch into the frame before locating its elements and return to the default content afterwards. For multiple windows or tabs, I capture the window handles, identify the intended one, switch to it, and then return or close it as needed."
      },
      {
        question: "What causes StaleElementReferenceException?",
        answer: "This exception means the element reference was found earlier, but the page has since replaced or re-rendered that element. The old reference no longer points to the current DOM element.\n\nI first check whether the application is still updating or whether the test is acting too early. I then wait for the relevant state and locate the element again. I avoid retry loops that simply hide a real timing or product problem."
      },
      {
        question: "When would you use JavascriptExecutor?",
        answer: "I use JavascriptExecutor for specific browser-side tasks that WebDriver does not provide conveniently, such as scrolling or reading a value that is useful for diagnosis. I do not make JavaScript clicks my first solution when a normal WebDriver click fails.\n\nA failed normal click can reveal an overlay, an incorrect wait, or a real usability issue. I investigate that cause first so the test continues to reflect how a user interacts with the application."
      }
    ]
  },
  {
    topic: "Serenity BDD",
    questions: [
      {
        question: "What is Serenity BDD?",
        answer: "Serenity BDD is a test automation and reporting library that works with tools such as Selenium, Cucumber, and JUnit. It records test steps and outcomes and can include screenshots and other evidence in its reports.\n\nThe reports help the team understand what a scenario did and where it failed. I use that reporting to make test results useful to both technical teammates and people reviewing the business behaviour."
      },
      {
        question: "What are the main benefits of Serenity?",
        answer: "Serenity provides detailed reports that connect scenario steps with outcomes and evidence such as screenshots. This helps with failure investigation and gives the team living documentation that can be compared with the test code.\n\nIt also supports reusable step libraries, page objects, and the Screenplay pattern. I choose the patterns that suit the project and keep the report readable, rather than adopting every feature without a clear benefit."
      },
      {
        question: "What is the difference between @Step and @Steps?",
        answer: "@Step marks a method so Serenity can report it as a named test step. It helps turn lower-level automation calls into a readable description of what the test is doing.\n\n@Steps is used to inject a step-library object so its step methods can be reused. In an interview, I would explain that the annotations serve different roles: one describes reportable behaviour, and the other helps provide the step library."
      },
      {
        question: "Where do you configure Serenity?",
        answer: "A Serenity project commonly keeps configuration in serenity.conf, using HOCON format. Project settings can include the browser, base URL, timeouts, and other environment-specific values.\n\nI keep environment values outside the test logic and avoid committing secrets. The exact configuration depends on the project, so I check the repository’s existing setup before adding another source of configuration."
      },
      {
        question: "How do you run Serenity tests in CI/CD?",
        answer: "In our described workflow, Maven runs the selected Serenity tests as part of the GitLab CI pipeline. The pipeline can choose suites by tags, report whether they passed, and publish the generated Serenity reports as artifacts.\n\nWhen a run fails, the team uses the report and available logs or screenshots to investigate. I would describe only pipeline stages and triggers that match the actual project configuration."
      }
    ]
  },
  {
    topic: "Cucumber and Gherkin",
    questions: [
      {
        question: "What do Given, When, and Then mean?",
        answer: "Given describes the starting context or preconditions. When describes the action or event being tested. Then describes the expected outcome.\n\nFor example, Given a customer with an eligible account, When the customer submits a valid transfer, Then the transfer confirmation is shown and the expected record is created. I keep scenarios focused on behaviour instead of writing every implementation detail into the steps."
      },
      {
        question: "What is a Scenario Outline?",
        answer: "A Scenario Outline is a parameterized Gherkin scenario that runs once for each row in its Examples table. It is useful when the same behaviour needs to be checked with different values, such as several valid and invalid loan amounts.\n\nI use it when the examples make the variations easy to understand. If the cases have very different behaviour, separate scenarios can be clearer than one large outline."
      },
      {
        question: "What are Background and hooks?",
        answer: "A Background section contains common Given steps that run before each scenario in a feature. It is useful for shared business context, but too many background steps can make individual scenarios harder to understand.\n\nHooks such as @Before and @After run setup or cleanup code around scenarios, for example preparing a browser or releasing resources. I keep technical setup in hooks and business context in readable feature steps."
      },
      {
        question: "Why use Cucumber tags?",
        answer: "Tags label scenarios or features with useful groups such as @smoke or @regression. A runner can use those tags to select a suitable subset for local work or a CI pipeline.\n\nI keep the tag scheme consistent and meaningful. Tags should help the team choose tests; they should not become an unmaintained list of overlapping labels."
      }
    ]
  }
];
