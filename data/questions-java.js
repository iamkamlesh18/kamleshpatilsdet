// Java interview essentials beyond the core Java concepts in the fundamentals chapter.
export const javaInterviewQuestions = [
  {
    topic: "Java — interview essentials",
    questions: [
      {
        question: "What is method overloading?",
        answer: "Method overloading means defining methods with the same name in one class but different parameter lists. The number, types, or order of parameter types must differ; changing only the return type is not enough.\n\nThe compiler chooses the applicable overload from the arguments at the call site, so overloading is commonly described as compile-time polymorphism."
      },
      {
        question: "What is method overriding?",
        answer: "Method overriding happens when a subclass provides its own implementation of an inherited instance method with a compatible signature. The method selected at runtime depends on the actual object's type.\n\nOverriding supports runtime polymorphism. Java applies rules around visibility, return types, and exceptions; static methods are hidden rather than overridden."
      },
      {
        question: "What is the difference between overloading and overriding?",
        answer: [
          "**Overloading:** Same method name, different parameter list (number, types, or order). The compiler chooses the matching method from the arguments, so this is compile-time polymorphism.",
          "**Overriding:** A subclass provides a compatible implementation of an inherited instance method. The actual object determines which implementation runs, so this is runtime polymorphism.",
          "**COOP / Smile connection:** Both concepts can help explain Java automation design, but my project evidence is Java, Serenity BDD, Selenium, reusable components, and a reviewed page-object proof of concept. I do not claim a particular project class used inheritance unless I can verify that code."
        ],
        comparison: {
          headers: ["Compare", "Overloading", "Overriding"],
          rows: [
            ["Parameters", "Must differ", "Must match the inherited method"],
            ["Relationship", "Usually within one class", "Requires an inherited instance method"],
            ["Binding", "Compile time", "Runtime"],
            ["Interview cue", "Same name, different inputs", "Same contract, specialized implementation"]
          ]
        },
        code: `// Illustrative login-check example, not project source.
class LoginCheck {
    void login(String username) { }
    void login(String username, String otp) { }
}

class SecureLoginCheck extends LoginCheck {
    @Override
    void login(String username) { }
}`
      },
      {
        question: "What is the difference between == and equals() in Java?",
        answer: "For primitive values, == compares the values. For object references, == checks whether both references point to the same object. equals() checks logical equality according to the object's implementation.\n\nFor example, two different String objects can contain the same text: == may be false while equals() is true. When comparing object content, use equals() or Objects.equals() when nulls need handling."
      },
      {
        question: "Why write WebDriver driver = new ChromeDriver()?",
        answer: "WebDriver is an interface that defines browser-driving operations, while ChromeDriver is a concrete implementation for Chrome. The variable is declared using the general interface and receives a specific browser driver object.\n\nThis is programming to an interface. It makes the test code easier to adapt to another compatible driver, provided the setup and browser-specific behaviour are handled appropriately."
      },
      {
        question: "What is a constructor?",
        answer: "A constructor initializes a new object. It has the same name as its class and no return type. Java supplies a no-argument default constructor only when the class declares no constructor of its own.\n\nConstructors can take parameters, and one constructor can delegate to another using this(). I use them to establish valid initial state rather than leaving an object partially configured."
      },
      {
        question: "What does static mean in Java?",
        answer: "A static member belongs to the class rather than to one particular object. A static method can be called using the class name and cannot directly access instance fields or use this.\n\nStatic methods are useful for stateless utilities or class-level operations. Excessive shared mutable static state can make tests interfere with one another, so I avoid it for per-test data."
      },
      {
        question: "What are Java access modifiers?",
        answer: "public is accessible wherever the class is visible; protected is accessible in the same package and to subclasses under Java's access rules; package-private has no modifier and is available within the same package; private is restricted to the declaring class.\n\nI use the least-visible access that supports the intended design. Clear boundaries make classes easier to use and reduce accidental dependencies."
      },
      {
        question: "What is the difference between an array and an ArrayList?",
        answer: "An array has a fixed length after creation and can store primitives or references of its component type. ArrayList is a resizable collection from the Java Collections Framework and stores objects, using wrapper types for primitive values.\n\nI use an array when the size is fixed or an API requires one. I use a list when the collection needs to grow, shrink, or use collection operations."
      },
      {
        question: "What is a HashMap and how does it handle keys?",
        answer: "HashMap stores key-value pairs and uses a key's hash code to find a bucket, then equals() to distinguish keys that share a bucket. It permits one null key and null values, and it does not guarantee iteration order.\n\nKeys should have stable equals() and hashCode() behaviour while stored in the map. I choose another map implementation when I need ordering or concurrency guarantees."
      },
      {
        question: "What is the difference between an interface and an abstract class?",
        answer: "An interface describes a contract that a class can implement, and a class may implement multiple interfaces. Interfaces can also contain default and static methods, but they are not general-purpose instance-state base classes.\n\nAn abstract class can hold instance state, constructors, and shared concrete or abstract methods, but a class can extend only one class. I choose based on whether I need a capability contract or shared base implementation."
      },
      {
        question: "What is exception handling in Java?",
        answer: "Exception handling lets code respond to exceptional conditions using try, catch, and finally, or propagate an exception to its caller. Checked exceptions must be caught or declared; unchecked exceptions are RuntimeException types and do not have that compile-time requirement.\n\nI catch an exception where I can recover or add useful context. I avoid empty catches and broad handling that hides the original failure."
      },
      {
        question: "What are the main OOP principles?",
        answer: "The four commonly named principles are encapsulation, inheritance, polymorphism, and abstraction. Encapsulation protects state behind a clear API; inheritance reuses or specializes a type; polymorphism allows the same contract to have different implementations; abstraction exposes essential behaviour while hiding details.\n\nIn automation code, I use these ideas to keep responsibilities understandable and reusable. I avoid abstraction for its own sake when a simpler class or function is clearer."
      }
    ]
  }
];
