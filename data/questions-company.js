// Questions supplied from Prama India, Infosys, Emersion, and other company interview notes.
// Answers are complete speaking guides; personalize project-specific examples before interviews.
export const companyQuestions = [
  {
    topic: "Automation and framework — company questions",
    questions: [
      {
        question: "What is TestNG?",
        answer: "TestNG is a Java testing framework used to organize and run tests. It provides annotations for setup and cleanup, assertions, test grouping, parameterization, dependencies, and parallel execution.\n\nIn UI automation, Selenium performs browser actions while TestNG manages the test lifecycle and execution. Reports and build tools can be integrated around the run."
      },
      {
        question: "What is the syntax of an assertion in TestNG?",
        answer: "A TestNG assertion compares the actual result with the expected result. For example, Assert.assertEquals(actualTitle, expectedTitle, \"Page title should match\"); fails the test and records a useful message when the values differ.\n\nI place assertions at meaningful checkpoints and use messages that explain what behaviour was expected. A failed assertion should make the report easier to diagnose."
      },
      {
        question: "Explain Assert.assertEquals() with an example.",
        answer: "Assert.assertEquals(actual, expected) checks whether the actual value equals the expected value. For example, after a successful sign-in, I can read the page heading and assert that it equals \"Account overview\".\n\nIn TestNG, I can add an optional message such as Assert.assertEquals(actualHeading, \"Account overview\", \"Signed-in page heading should be correct\"). If the comparison fails, the assertion fails the test at that point."
      },
      {
        question: "What major functions have you used in automation testing?",
        answer: "For UI automation, I locate elements, enter values, click controls, navigate between pages, wait for expected conditions, and verify visible results. For API checks, I prepare requests and validate status codes, response fields, and relevant data changes.\n\nAround those actions, I organize tests, manage test data, capture useful reports, and run selected suites through CI. I choose functions that express the user behaviour clearly and keep synchronization and cleanup reliable."
      },
      {
        question: "What is Data-Driven Testing?",
        answer: "Data-driven testing runs the same test logic against multiple input and expected-result sets. The scenario stays stable while the data varies, which is useful for roles, boundary values, and valid or invalid combinations.\n\nData may come from a TestNG DataProvider, JSON, CSV, Excel, or another controlled source. I keep data understandable, avoid sharing mutable records between parallel tests, and make failures show which data row was used."
      },
      {
        question: "What is Keyword-Driven Testing?",
        answer: "Keyword-driven testing describes test actions with a set of named operations such as OpenPage, EnterText, Click, and VerifyText. A test case combines those keywords with parameters, while an execution layer maps each keyword to automation code.\n\nIt can let people describe workflows at a higher level, but it needs careful design, good error messages, and consistent keyword definitions. I would use it when the team benefits from that separation, not add a keyword layer just for its own sake."
      },
      {
        question: "How much data can be stored in JSON?",
        answer: "JSON itself does not define one universal maximum document size. The practical limit depends on the programming language, memory, parser, application, transport, and any API or storage limits.\n\nFor test data, I keep files small, focused, and readable. If a data set grows large, I split it, load it in a streaming way where supported, or use a data store rather than putting an unbounded amount into one JSON file."
      },
      {
        question: "How do you read data from Excel in Java?",
        answer: "A common Java approach is Apache POI. I open the workbook with a file stream, select the sheet and row, read cells with the appropriate cell type or a DataFormatter, and close the workbook and stream with try-with-resources.\n\nI also handle missing files, empty cells, formulas, and type conversion explicitly. For maintainability, I keep the Excel-reading utility separate from test steps and give data rows clear identifiers."
      },
      {
        question: "How do you read a username and password from Excel and use them for login automation?",
        answer: "I would read the required row and named columns with a data utility, then pass the values into a login test or a TestNG DataProvider. The test enters the username and password through the UI and verifies the expected login outcome.\n\nFor real credentials, I would not store secrets in a checked-in spreadsheet. I would use an approved secret store or protected CI variables, keep test accounts least-privileged, and avoid printing passwords in logs or reports."
      },
      {
        question: "How can you create or generate a report in Excel?",
        answer: "For a simple Java-generated spreadsheet, Apache POI can create a workbook, add a sheet, write column headers and test results, format cells if useful, and save the workbook with a file stream.\n\nFor an automation framework, I first use the project's reporting output, such as Serenity, TestNG, or another approved reporter. An Excel export can summarize results, but it should not replace detailed logs and evidence needed to investigate failures."
      },
      {
        question: "What automation tools have you worked with?",
        answer: "My experience includes Selenium WebDriver, Serenity BDD, Cucumber, REST Assured, Postman, BrowserStack, and the Rainbow framework. I have also worked with Java, SQL, YAML, Jira, and GitLab CI/CD as part of testing and delivery.\n\nI choose a tool based on the test layer, application, team skills, reporting needs, and how the suite will run in CI. I distinguish tools I have used directly from tools I have only studied."
      },
      {
        question: "How would you compare Serenity with Selenium?",
        answer: "Selenium WebDriver is primarily a browser-automation API: it locates elements and interacts with browsers. Serenity BDD builds on automation tools and adds reporting and framework capabilities; it can work with Selenium and BDD tools such as Cucumber.\n\nThey are not direct substitutes. Selenium can drive the browser, while Serenity can organize steps and present richer test evidence around an automated scenario."
      },
      {
        question: "What does Serenity provide in addition to Selenium?",
        answer: "Serenity can add structured reports, step-level outcomes, screenshots and evidence, reusable step libraries, and support for readable BDD scenarios and page-oriented patterns. These features help a team understand both what ran and where it failed.\n\nSelenium itself provides browser interactions and does not by itself provide the same complete reporting and test organization. The exact Serenity features depend on how the project is configured."
      },
      {
        question: "How do you generate a detailed automation report?",
        answer: "I use the reporting framework already integrated into the project. For Serenity, I run the tests through the build and test runner, generate the Serenity report from the results, and publish the report or artifacts in CI so the team can review steps, outcomes, and available screenshots.\n\nA useful report has clear scenario and step names, failure details, and enough evidence to reproduce the issue. I avoid adding sensitive data to screenshots or logs."
      },
      {
        question: "How do you decide what to keep manual and what to automate?",
        answer: "I automate checks that are repeated, have stable expectations, protect important risks, and are likely to provide ongoing value. I consider setup and data cost, test stability, feedback speed, and the effort needed to maintain the check.\n\nExploratory testing, one-time investigations, usability judgments, and rapidly changing flows may be more effective manually. I use automation to support thoughtful testing, not as a replacement for tester judgment."
      }
    ]
  },
  {
    topic: "Editor and chat application automation",
    questions: [
      {
        question: "How would you approach automation testing of a text editor or chat editor?",
        answer: "I would first clarify the supported behaviours and editor technology: plain text or rich text, drafts, autosave, attachments, formatting, collaboration, and any message delivery rules. I would divide coverage into UI behaviour, persistence or API checks, and integration behaviour.\n\nI would automate stable user journeys such as composing, editing, saving, reopening, and sending text. For rich-text editors, I would inspect accessible controls and resulting content rather than depend on fragile internal DOM details. I would also cover keyboard interaction and use isolated accounts and test data."
      },
      {
        question: "What extra scenarios would you test for a text editor?",
        answer: "I would cover empty content, long text, punctuation, Unicode and emoji, copy/paste, whitespace, line breaks, formatting combinations, undo and redo, and the editor's size or character limits. I would check autosave timing, refresh and recovery, navigation with unsaved edits, and whether formatting is preserved after reopening.\n\nFor a chat editor, I would add send-on-Enter versus new-line behaviour, duplicate submission, slow or failed delivery, retry behaviour, attachment limits, and message order. I would include keyboard accessibility and safe handling of pasted content where those are requirements."
      }
    ]
  },
  {
    topic: "Manual testing — company questions",
    questions: [
      {
        question: "How do you perform manual testing?",
        answer: "I start by understanding the story, acceptance criteria, users, dependencies, and risks. I clarify gaps with the team, design scenarios and test data, and select suitable techniques such as boundary-value analysis or equivalence partitioning.\n\nI validate the environment and build, execute the tests, compare actual behaviour with expected results, record reproducible defects, and retest fixes. I communicate coverage, outstanding risks, and results so the team can make informed decisions."
      },
      {
        question: "What types of testing are you aware of and involved in?",
        answer: "Testing can be grouped in several ways. Functional testing checks what the software does; non-functional testing checks qualities such as performance, usability, compatibility, and reliability. Test levels include unit, integration, system, and acceptance testing.\n\nMy hands-on work includes manual and functional testing, regression, smoke, sanity, UAT, integration, end-to-end, exploratory, mobile, cross-browser, API, and database validation. I select the type that answers the requirement or risk being investigated."
      },
      {
        question: "What kinds of testing do you personally perform?",
        answer: "My work has included functional, manual, regression, smoke, sanity, UAT, integration, end-to-end, exploratory, mobile, cross-browser, API, and backend-data testing. The balance depends on the project and the change being delivered.\n\nFor example, a small fix may need focused sanity checks plus related regression coverage, while a larger customer workflow may need end-to-end, API, and database validation."
      },
      {
        question: "What is smoke testing?",
        answer: "Smoke testing is a quick, broad check of a new build's critical functions. It asks whether the build is stable enough to continue with more detailed testing.\n\nIt is not exhaustive regression testing. The smoke suite should be small, reliable, and focused on the most important paths."
      },
      {
        question: "How do you perform smoke testing?",
        answer: "I confirm the build and environment, then execute a small agreed set of critical checks: for example, the application opens, a user can authenticate, key pages load, and a core transaction can proceed through its basic path.\n\nI record failures with enough evidence to reproduce them. If a critical smoke check fails, I alert the team and avoid spending time on deeper testing until the build is understood or corrected."
      },
      {
        question: "What is sanity testing?",
        answer: "Sanity testing is focused testing of a specific change or fix and its nearby behaviour. It helps confirm that the change appears to work before broader regression is considered.\n\nFor example, after correcting a payment validation rule, I check the corrected boundary and the related success or error path. The exact scope should be based on the change and its dependencies."
      }
    ]
  },
  {
    topic: "Defect management — company questions",
    questions: [
      {
        question: "What is the defect life cycle?",
        answer: "A common defect flow is New, triaged or Assigned, In Progress, Fixed, Ready for Retest, Verified, and Closed. If the behaviour is still wrong, the defect can be Reopened; a team may also use Deferred, Rejected, or Duplicate states.\n\nThe exact workflow varies by organization. I make reports actionable with steps, expected and actual results, environment, severity, and evidence, then follow the team's status and retest process."
      },
      {
        question: "What is the difference between severity and priority?",
        answer: "Severity describes how serious the impact of a defect is on users or the system. Priority describes how soon the team should address it, taking business urgency and release context into account.\n\nA severe issue can block a critical user flow. A cosmetic issue may be low severity but still receive high priority if it affects an important release or customer commitment. I share evidence and align the decision with the team."
      }
    ]
  },
  {
    topic: "Agile and testing methodologies — company questions",
    questions: [
      {
        question: "Which testing methodologies are you aware of and involved in?",
        answer: "I have worked in Agile Scrum delivery and used risk-based and requirements-based test design. I use exploratory testing where learning about the behaviour is valuable, and I apply techniques such as equivalence partitioning and boundary-value analysis to design focused cases.\n\nThe right approach depends on the product, risk, and delivery model. Methodology is not a checklist; it should help the team get useful feedback and meet its quality goals."
      },
      {
        question: "Which methodology do you follow in your project?",
        answer: "My project teams have followed Agile Scrum, with testing planned and carried out within the sprint. I review stories and acceptance criteria, clarify questions, design and execute tests, automate suitable checks, and share defects and progress with the team.\n\nI also support regression and UAT as needed. I would describe the actual ceremonies and release process of the specific project rather than assume every Scrum team works identically."
      },
      {
        question: "Which Agile or Scrum meetings do you attend?",
        answer: "Depending on the team, I attend sprint planning, daily stand-ups, backlog refinement, sprint reviews or demos, and retrospectives. QA participates by clarifying acceptance criteria, raising risks and dependencies, sharing test progress, and helping the team learn from the sprint.\n\nI contribute to the meetings needed for delivery and follow the team's agreed process; the names or frequency can vary."
      },
      {
        question: "What happens at the end of a Sprint?",
        answer: "The team reviews completed work against its Definition of Done and demonstrates accepted increments in the sprint review. It discusses what went well and what could improve in the retrospective, then carries unfinished work forward through the agreed backlog process.\n\nQA shares test results, defects, coverage, and remaining risks. A sprint ending does not automatically make incomplete or unverified work done."
      },
      {
        question: "What happens if a task cannot be completed within the Sprint?",
        answer: "I raise the blocker early, explain what remains, what is preventing completion, and the quality or delivery impact. The team and product owner decide whether to reduce scope, remove a blocker, or return the unfinished work to the backlog for re-planning.\n\nI do not mark incomplete testing as complete. I document what was and was not verified and communicate any residual risk."
      },
      {
        question: "As QA, what do you do after developers provide a build?",
        answer: "I first confirm the build version, release notes, deployment status, environment, and any known changes. I check that test data and dependencies are available, then run smoke tests to decide whether the build is stable enough for deeper testing.\n\nIf it passes, I test the changed requirements, relevant integrations, and regression risks. I report defects clearly, retest fixes, and share coverage and remaining risk with the team."
      }
    ]
  },
  {
    topic: "Payments and financial domain — company questions",
    questions: [
      {
        question: "What areas have you worked on in the payments domain?",
        answer: "My supplied experience includes banking workflows involving cards, digital channels, loans, retail banking, and commercial-card modules. I have tested user workflows, APIs, and database consistency and supported UAT.\n\nI would be precise in an interview about which payment flows I personally tested. I would not claim to have worked on a payment rail or settlement service unless that was part of my actual assignment."
      },
      {
        question: "How does backend communication happen between financial institutions during a payment?",
        answer: "At a high level, the channel sends a payment request to its bank's services. The bank validates the request, account and authorization rules, and then routes it through the relevant payment network or clearing arrangement to the receiving institution.\n\nThe institutions exchange messages through their agreed network and protocols, process acceptance or rejection, and later reconcile or settle according to that rail's rules. The exact path, timing, and message format depend on the country, payment type, and network."
      },
      {
        question: "How do two banks communicate during a fund transfer?",
        answer: "They generally do not connect through a tester-facing browser flow directly. The sending bank submits a payment instruction through a recognized payment scheme, clearing system, or network. That system routes a standardized message to the receiving bank, which validates and processes the instruction.\n\nThe sending channel then receives status through the bank's services. A QA engineer validates the documented contract, acknowledgements, statuses, error paths, duplicate handling, and consistency of records without assuming every rail uses the same protocol."
      },
      {
        question: "What happens in the backend when money moves between two banks?",
        answer: "A simplified transfer begins with authentication and validation of the payer, payee, amount, limits, and available funds. The sending bank records the instruction and sends it through the relevant payment mechanism. The receiving bank validates the incoming instruction and credits or otherwise processes it according to the scheme rules.\n\nThe payment may be immediate or may involve later clearing and settlement. Systems need traceable references, status transitions, reconciliation, and safe handling of timeouts and retries so a repeated request does not incorrectly create a duplicate transfer."
      }
    ]
  },
  {
    topic: "General and behavioral — company questions",
    questions: [
      {
        question: "What are your strengths as a member of a testing team?",
        answer: "My strengths are careful analysis, clear communication, and a collaborative approach to quality. I work to turn requirements into understandable test coverage, share reproducible defect evidence, and validate both customer workflows and supporting API or database behaviour.\n\nI also value reusable automation and learning from the team. I support a positive outcome without confusing quality ownership with blame or claiming work that belonged to others."
      },
      {
        question: "How do you remember or retain project information?",
        answer: "I build a simple mental map of the project: its business goal, main user journeys, important components, data, dependencies, and risks. I connect new details to that map instead of trying to memorize disconnected facts.\n\nI keep concise notes and revisit them using active recall: explain a flow without looking, check what I missed, then repeat later. For interviews, I practise a few truthful project stories with context, my contribution, actions, and result."
      }
    ]
  },
  {
    topic: "Other technical topics — company questions",
    questions: [
      {
        question: "What is IVR?",
        answer: "IVR means Interactive Voice Response. It is a telephony system that interacts with callers using recorded prompts, keypad tones, or speech recognition and routes them to information or the appropriate service.\n\nTesting can cover prompt clarity, keypad and speech paths, invalid input, timeouts, retries, language choices, handoff to an agent, and integration with account or ticket systems. Tests should use approved test numbers and avoid exposing real customer information."
      }
    ]
  },
  {
    topic: "Selenium interview questions",
    questions: [
      {
        question: "What is Selenium?",
        answer: "Selenium is a suite of tools for automating web browsers. Selenium WebDriver lets test code find elements and perform browser interactions such as typing, clicking, and navigation.\n\nSelenium is for browser-based web applications; it is not a general desktop or native-mobile automation tool. I combine it with a test framework, reporting, and suitable application interfaces for a complete automation solution."
      },
      {
        question: "What is WebDriver?",
        answer: "WebDriver is the browser-automation API that test code uses to control a browser. A driver implementation, such as ChromeDriver, communicates the requested browser actions to the corresponding browser.\n\nI can declare a variable using the WebDriver interface and instantiate a browser-specific implementation, which keeps much of the test code independent of one browser."
      },
      {
        question: "What locators are available in Selenium?",
        answer: "Selenium supports ID, name, class name, tag name, link text, partial link text, CSS selector, and XPath locators. A locator should identify the intended element reliably.\n\nI prefer stable IDs or clear CSS selectors where possible. I use XPath when a relationship or condition makes it useful, and avoid selectors tied to fragile layout details."
      },
      {
        question: "Why are explicit waits usually preferred to Thread.sleep()?",
        answer: "Thread.sleep() pauses for a fixed duration regardless of whether the page is already ready. It slows fast runs and can still fail when an operation takes longer than the guessed delay.\n\nAn explicit wait polls for a specific condition and continues as soon as it is satisfied, up to a timeout. It gives more targeted synchronization and clearer intent."
      },
      {
        question: "What is the difference between getWindowHandle() and getWindowHandles()?",
        answer: "getWindowHandle() returns the handle for the current browser window or tab. getWindowHandles() returns the handles for all open windows or tabs in the session.\n\nI use the set of handles when an action opens another tab, identify the intended window, and switch to it. I do not depend on window order unless the application contract makes that safe."
      },
      {
        question: "What is JavascriptExecutor?",
        answer: "JavascriptExecutor is a Selenium interface that lets a test execute JavaScript in the browser context. It can be useful for specific tasks such as scrolling or reading a browser-side value.\n\nI do not use JavaScript to bypass an ordinary user interaction by default. If a normal click fails, I first investigate waits, overlays, element state, and possible usability problems."
      },
      {
        question: "How do you perform mouse hover, right-click, double-click, or drag-and-drop?",
        answer: "Selenium's Actions API supports complex pointer and keyboard interactions. I create an Actions instance, describe the sequence—such as moveToElement, contextClick, doubleClick, or dragAndDrop—and call perform() to execute it.\n\nI verify the resulting application behaviour and account for whether the browser and element support that interaction reliably."
      },
      {
        question: "What are browser options and what is a headless browser?",
        answer: "Browser options configure a browser before the driver starts. Depending on the browser, options can select headless execution, preferences, download settings, or certificate behaviour.\n\nA headless browser runs without a visible window, which is useful in many CI environments. I still verify the browser version and supported flags and keep local and CI configurations as consistent as practical."
      },
      {
        question: "How do isDisplayed(), isEnabled(), and isSelected() differ?",
        answer: "isDisplayed() checks whether an element is displayed. isEnabled() checks whether an enabled control can accept interaction. isSelected() checks selected state for controls such as checkboxes, radio buttons, and options.\n\nI choose the check that matches the expected behaviour. Presence alone does not prove that a control is visible, enabled, or selected."
      },
      {
        question: "How do you read text and attributes from an element?",
        answer: "getText() returns the element's visible text according to WebDriver. getAttribute(name) reads an attribute or, depending on the driver and property, the corresponding current property value; Selenium also provides getDomAttribute() and getDomProperty() for more explicit distinctions in modern versions.\n\nFor an input, I check the value property when I need the current entered value. I assert the information relevant to the user-visible requirement."
      },
      {
        question: "What are common Selenium exceptions?",
        answer: "NoSuchElementException means the locator found no matching element. StaleElementReferenceException means the old element reference no longer belongs to the current DOM. TimeoutException means a wait condition was not met before its deadline.\n\nElementClickInterceptedException indicates another element blocked the click, and ElementNotInteractableException means the target cannot currently be interacted with. I use the exception and page evidence to find the cause rather than masking it with a generic retry."
      },
      {
        question: "What is the difference between close() and quit()?",
        answer: "close() closes the current browser window. quit() ends the WebDriver session and closes every window opened by that session.\n\nTest cleanup usually calls quit() so browser processes and session resources do not remain after the test. I put cleanup in the framework's appropriate teardown path."
      },
      {
        question: "What is Selenium Grid?",
        answer: "Selenium Grid distributes WebDriver tests across multiple browser and machine combinations. It helps teams run compatible suites in parallel and cover a browser matrix.\n\nParallel execution can reduce feedback time, but tests still need isolated data and thread-safe drivers. I use Grid when the project needs distributed browser coverage."
      }
    ]
  },
  {
    topic: "TestNG interview questions",
    questions: [
      {
        question: "What is the general order of TestNG annotations?",
        answer: "A typical lifecycle is @BeforeSuite, @BeforeTest, @BeforeClass, @BeforeMethod, @Test, @AfterMethod, @AfterClass, @AfterTest, and @AfterSuite. The exact execution can depend on the suite and configuration.\n\nI confirm lifecycle behaviour from the project's suite rather than relying on memory alone. Setup and cleanup should be placed at the correct scope."
      },
      {
        question: "What is a TestNG DataProvider?",
        answer: "A DataProvider supplies multiple sets of arguments to a test method, so the same test logic can run for each data row. It is one way to implement data-driven testing.\n\nFor example, it can provide several username and password combinations. I keep sensitive credentials out of source code and make each row's test result identifiable."
      },
      {
        question: "How do you set test priority in TestNG?",
        answer: "TestNG's priority attribute can influence the ordering of test methods, for example @Test(priority = 1). Lower values are generally scheduled before higher ones within the applicable ordering rules.\n\nI avoid using priority to create dependencies between tests. Each test should be independent where possible, and explicit dependencies or setup are clearer when ordering is genuinely required."
      },
      {
        question: "How do you skip a TestNG test?",
        answer: "A test can be disabled with @Test(enabled = false), or skipped conditionally by throwing TestNG's SkipException when a documented precondition is not met.\n\nI include a clear reason for a conditional skip and make sure it does not conceal a failure that should instead fail the test."
      },
      {
        question: "What is testng.xml used for?",
        answer: "testng.xml configures a TestNG suite. It can select test classes, groups, parameters, listeners, and parallel execution settings.\n\nA well-maintained suite file helps run appropriate subsets locally and in CI. I review its configuration when tests are unexpectedly omitted or executed in an unexpected way."
      },
      {
        question: "What is the difference between @Factory and @DataProvider?",
        answer: "@DataProvider supplies different argument sets to a test method, usually running the same test method once per data set. @Factory creates test-class instances, often using data to configure each instance.\n\nI use a DataProvider for parameterizing test cases and a Factory when distinct test instances are the more natural model."
      },
      {
        question: "What are TestNG groups?",
        answer: "Groups label tests so a suite can select related sets, such as smoke or regression checks. They can support different local and CI runs without duplicating test code.\n\nI keep group names consistent with the team's test strategy and avoid a large set of overlapping labels that no one maintains."
      }
    ]
  },
  {
    topic: "Framework, build, and reporting questions",
    questions: [
      {
        question: "How would you describe the framework used in your project?",
        answer: "I describe the actual structure I worked with rather than naming a generic framework as if it were the project design. For COOP, I can explain the Java-based UI and API automation, Serenity BDD, Selenium, reusable components, SQL validation, and GitLab CI/CD reporting.\n\nI would then walk through how a scenario is selected, how its steps call page or API helpers, how data and configuration are supplied, and how the result reaches the report. I would distinguish my contributions from the team's overall design."
      },
      {
        question: "What is Maven and why is it used?",
        answer: "Maven is a Java build and project-management tool. The pom.xml file describes project configuration, dependencies, plugins, and build tasks.\n\nMaven can resolve dependencies, compile code, run tests, and package outputs consistently on a developer machine or CI agent. The project still needs sensible dependency versions and build configuration."
      },
      {
        question: "What is a Maven dependency?",
        answer: "A dependency is a library or component a project needs, such as Selenium or TestNG. Maven reads dependency coordinates and version information from the pom.xml and obtains the artifact from configured repositories.\n\nI use reviewed versions and avoid adding duplicate or unnecessary libraries. Dependency scope also matters because test-only libraries should not be shipped as production code."
      },
      {
        question: "What is Jenkins used for?",
        answer: "Jenkins is an automation server that can run build and test jobs after code changes, on a schedule, or through another trigger. A pipeline can check out code, build it, run selected tests, and publish results.\n\nIn my described project experience, GitLab CI/CD was used. I can explain Jenkins as a tool and its general purpose, but I distinguish it from the CI system I personally used in that project."
      },
      {
        question: "How do you manage QA, staging, and other test environments?",
        answer: "I keep environment-specific values such as base URLs and non-secret settings in configuration that can be selected for a run. Credentials belong in a protected secret store or CI variables, not in checked-in config.\n\nI confirm the selected environment, version, dependencies, and test data before execution. I also make the environment visible in reports so results can be interpreted correctly."
      },
      {
        question: "How do you manage test data?",
        answer: "I separate test data from test logic and use the project's approved source, such as generated records, fixtures, JSON, CSV, or a controlled test database. I give tests identifiable data and avoid accidental dependency on shared mutable records.\n\nFor parallel runs, data should be isolated or safely partitioned. Secrets and real customer data must be handled under the project's security and privacy rules."
      }
    ]
  },
  {
    topic: "BDD interview questions",
    questions: [
      {
        question: "What is BDD?",
        answer: "Behaviour-Driven Development is a collaborative approach for describing expected software behaviour using examples that product, development, and testing teammates can discuss together.\n\nA good BDD scenario expresses meaningful behaviour rather than implementation steps. The shared examples can guide development and form executable checks when the team uses an automation tool."
      },
      {
        question: "What is Cucumber?",
        answer: "Cucumber is a tool that can execute scenarios written in Gherkin by matching the steps to step-definition code. It is commonly used to connect readable examples with automation.\n\nCucumber is most useful when the team collaborates on those examples and keeps them understandable. It is not automatically beneficial if feature files simply duplicate technical test scripts."
      },
      {
        question: "What is Gherkin syntax?",
        answer: "Gherkin is a structured language for describing features and scenarios using keywords such as Feature, Scenario, Given, When, and Then. Given describes context, When describes an action, and Then describes the expected outcome.\n\nFor example: Given I am on the sign-in page; When I enter valid credentials; Then I see the account overview. The scenario should express behaviour clearly."
      },
      {
        question: "What is the difference between a feature file and a step definition?",
        answer: "A feature file contains readable Gherkin features and scenarios, usually saved with a .feature extension. It describes the expected behaviour using Given, When, and Then steps.\n\nA step definition is code that matches a Gherkin step and performs the required setup, action, or verification. Keeping the feature about behaviour and the step definition about implementation improves readability."
      }
    ]
  }
];
