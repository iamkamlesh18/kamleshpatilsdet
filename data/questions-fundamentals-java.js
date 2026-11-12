// Core testing and Java interview questions. Answers are written to be spoken aloud.
export const fundamentalsAndJava = [
  {
    topic: "Testing fundamentals",
    questions: [
      {
        question: "What is the difference between smoke and sanity testing?",
        answer: "Smoke testing is a broad, quick check of the most important functions in a new build. Its purpose is to decide whether the build is stable enough for deeper testing.\n\nSanity testing is narrower. After a small change or fix, I check the affected area and its closely related behaviour. For example, after a loan-calculation fix, I would verify the calculation and a few connected loan flows."
      },
      {
        question: "What is regression testing?",
        answer: "Regression testing checks that existing behaviour still works after a change, such as a new feature, a bug fix, or a configuration update. I select tests based on what changed, what depends on it, and the risk to important user journeys.\n\nI automate stable, frequently repeated regression checks so the team gets faster feedback, while I keep investigating unexpected results rather than treating a passing test count as proof of quality."
      },
      {
        question: "What is the difference between verification and validation?",
        answer: "Verification asks, “Are we building the product right?” It checks whether work products meet their specifications, often through reviews, walkthroughs, and inspections.\n\nValidation asks, “Are we building the right product?” It checks the working software against user needs and intended use. In practice, I use both: review requirements and designs early, then validate the implemented behaviour with tests."
      },
      {
        question: "What is the difference between severity and priority?",
        answer: "Severity describes the impact of a defect on the system or user. A defect that prevents customers from submitting a payment would usually have high severity.\n\nPriority describes how soon the team should address it, based on urgency, business impact, release timing, and dependencies. A low-severity wording issue on a critical release screen might still receive high priority. I provide evidence and let the team agree on both."
      },
      {
        question: "Explain equivalence partitioning and boundary value analysis.",
        answer: "Equivalence partitioning divides inputs into groups that should behave in the same way. Instead of testing every value, I select representative values from valid and invalid groups.\n\nBoundary value analysis focuses on the edges of those groups because errors often occur there. If an age must be at least 18, I would consider 17, 18, and 19, and also test any upper limit if one exists. Together, the techniques give useful coverage with a manageable number of tests."
      },
      {
        question: "Describe a typical defect life cycle.",
        answer: "A defect is usually reported as New, reviewed and Assigned, then investigated and Fixed by the development team. I retest the fix in a suitable build and verify related behaviour. If the expected result is correct, the defect is Closed; if it still fails or causes a regression, it is Reopened.\n\nTeams may use different status names, so I follow the project workflow and make each report reproducible with clear steps, expected and actual results, environment details, and evidence."
      }
    ]
  },
  {
    topic: "Java",
    questions: [
      {
        question: "What are the four pillars of object-oriented programming?",
        answer: [
          {
            heading: "Encapsulation",
            points: [
              { label: "Definition", text: "Keep an object's data and the methods that manage it together, and control how other code can access that state." },
              { label: "Keyword and purpose", text: "Use `private` for internal fields, then expose only the operations callers need. This protects the object's valid state and hides implementation details." },
              { label: "COOP / Smile example", text: "In my Copilot proof of concept, I reviewed generated page-object code to see whether page interactions were behind reusable methods. I evaluated this as a proof of concept; I do not present generated code as a production deployment.", type: "example" }
            ]
          },
          {
            heading: "Inheritance",
            points: [
              { label: "Definition", text: "A child class acquires and can specialize behaviour from a parent class." },
              { label: "Keyword and purpose", text: "Java uses `extends`. Use inheritance for a true “is-a” relationship; choose composition when a class only needs to use a helper or shared component." },
              { label: "COOP / Smile connection", text: "I used reusable test components in the project. Reuse by itself does not prove inheritance, so I would only describe an `extends` relationship if I had verified the actual class design.", type: "example" }
            ]
          },
          {
            heading: "Polymorphism",
            points: [
              { label: "Definition", text: "One method name or contract can produce different behaviour, depending on its parameters or the actual object." },
              { label: "Overloading", text: "Use the same method name with different parameter lists. The compiler selects the matching method, so this is compile-time polymorphism." },
              { label: "Overriding", text: "A subclass supplies a compatible implementation of an inherited instance method. The runtime object selects the implementation, so this is runtime polymorphism." },
              { label: "Recall cue", text: "Overloading changes the inputs; overriding changes the inherited implementation." }
            ]
          },
          {
            heading: "Abstraction",
            points: [
              { label: "Definition", text: "Show the caller what an object can do while hiding the details of how it does it." },
              { label: "Interface or abstract class", text: "An interface describes a capability that different classes can implement. An abstract class can also hold shared state, constructors, and implemented methods." },
              { label: "Selenium example", text: "The illustrative declaration `WebDriver driver = new ChromeDriver()` uses the WebDriver contract with a concrete Chrome driver. Selenium is one of my project tools; this code illustrates the Java concept and is not quoted from project source.", type: "example" }
            ]
          }
        ]
      },
      {
        question: "How is an abstract class different from an interface?",
        answer: "An abstract class can hold state, constructors, and both abstract and implemented methods. A class can extend only one class, so an abstract class is useful when related types share a base implementation or state.\n\nAn interface defines a contract that different classes can implement, and a class can implement multiple interfaces. I choose an interface when I want to describe a capability without forcing an inheritance relationship."
      },
      {
        question: "When would you use ArrayList, LinkedList, HashMap, or HashSet?",
        answer: "I use an ArrayList when I need an ordered collection and frequent indexed reads, such as a list of test cases or results. A LinkedList can suit queue-like work with frequent additions or removals, although I choose it only when those operations matter for the use case.\n\nA HashMap stores key-value pairs, such as a field name and its expected value. A HashSet stores unique values when duplicates should be removed or prevented. I also consider ordering and thread-safety requirements rather than selecting a collection by habit."
      },
      {
        question: "What is the difference between String, StringBuilder, and StringBuffer?",
        answer: "String is immutable, so changing its value creates another String object. That is useful for fixed text and makes Strings safe to share, but repeated concatenation can create unnecessary objects.\n\nStringBuilder is mutable and efficient for repeated text changes when one thread owns the work. StringBuffer is also mutable but synchronizes its operations for thread safety, which can add overhead. I use the simplest option that matches the actual concurrency needs."
      },
      {
        question: "What are checked and unchecked exceptions?",
        answer: "Checked exceptions are checked by the compiler, so a method must handle them or declare that it can throw them. IOException is a common example. They are often used for conditions a caller may reasonably recover from.\n\nUnchecked exceptions are subclasses of RuntimeException and do not have to be declared. NullPointerException and IllegalArgumentException are examples. I handle exceptions where I can add useful recovery or context, and avoid catching them broadly just to hide a failure."
      },
      {
        question: "Explain final, finally, and finalize.",
        answer: [
          {
            heading: "final",
            points: [
              { label: "Definition", text: "The `final` keyword restricts reassignment or extension." },
              { label: "Where it applies", text: "A final variable can be assigned only once, a final method cannot be overridden, and a final class cannot be extended." }
            ]
          },
          {
            heading: "finally",
            points: [
              { label: "Definition", text: "A `finally` block is used with `try` / `catch` for cleanup after the try operation, including when an exception is propagating." },
              { label: "Resource handling", text: "For `AutoCloseable` resources, prefer try-with-resources because Java closes them reliably, including when an exception occurs." },
              { label: "Illustrative example", text: "In an automation test, the browser session must be closed through the framework lifecycle or an appropriate cleanup pattern. The code below illustrates cleanup; it is not copied from my project.", type: "example" }
            ]
          },
          {
            heading: "finalize()",
            points: [
              { label: "Definition", text: "`finalize()` was a legacy garbage-collection hook." },
              { label: "Important limitation", text: "It is deprecated and is not guaranteed to run at a predictable time—or at all. Never rely on it to close a browser, file, or other resource." }
            ]
          }
        ],
        code: `// Illustrative Java pattern; not copied from the project.
static void runCheck(AutoCloseable browser, String workflow) throws Exception {
    final String flowName = workflow;
    try {
        System.out.println("Run: " + flowName);
    } finally {
        browser.close();
    }
}`
      }
    ]
  }
];
