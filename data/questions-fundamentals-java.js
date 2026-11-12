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
          "**Encapsulation — `private`** keeps an object's data and the methods that manage it together. I mark internal fields `private` and expose only the operations other code needs, so callers cannot put the object into an invalid state.",
          "**COOP / Smile example:** In my Copilot proof of concept, I evaluated generated page-object code. A page object applies encapsulation when it keeps page details behind clear methods instead of making every test manipulate those details directly; the generated code was reviewed as a proof of concept, not described as a production deployment.",
          "**Inheritance — `extends`** lets a subclass reuse or specialize a parent class. I use it only for a genuine “is-a” relationship; when I only need shared automation behaviour, composition or a reusable component is often clearer. COOP / Smile used reusable test components, which is not by itself a claim that I built an inheritance hierarchy.",
          "**Polymorphism — overloading and overriding** lets the same method name or contract behave in different ways. Overloading uses different parameter lists and is selected at compile time; overriding provides a compatible subclass implementation and is selected at runtime.",
          "**Abstraction — interface or abstract class** shows callers what they can do while hiding implementation details. An interface describes a capability; an abstract class can also share state and implementation. In Selenium, `WebDriver driver = new ChromeDriver()` uses the `WebDriver` interface while selecting a concrete browser driver.",
          "**How I use the ideas as an SDET:** I aim for test code that is readable, reusable, and easy to change. In COOP / Smile, my confirmed experience includes Java, Serenity BDD, Selenium, reusable components, and a reviewed page-object proof of concept; I describe those facts without claiming unverified implementation details."
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
          "**`final` — keyword:** A final variable can be assigned only once, a final method cannot be overridden, and a final class cannot be extended.",
          "**`finally` — block:** Code in a `finally` block normally runs after `try` / `catch`, including when an exception is propagating. For resources that implement `AutoCloseable`, prefer try-with-resources because it handles closing reliably.",
          "**`finalize()` — legacy method:** It was an old garbage-collection hook, is deprecated, and is not guaranteed to run at a predictable time—or at all. Never rely on it for browser, file, or other resource cleanup.",
          "**COOP / Smile interview example:** For a Java + Selenium browser check, `final` can protect a value from reassignment; cleanup belongs in the test framework lifecycle or a reliable `finally` / try-with-resources pattern, not `finalize()`. Serenity may manage lifecycle hooks; describe the implementation you actually used. The code below is an illustrative Java pattern, not a project code excerpt."
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
