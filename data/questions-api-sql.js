// API and database questions. Answers describe test intent before tool syntax.
export const apiAndSql = [
  {
    topic: "REST Assured and API testing",
    questions: [
      {
        question: "What does a REST Assured test look like?",
        answer: "A REST Assured test commonly follows a Given–When–Then structure. In given(), I prepare request details such as headers, authentication, parameters, or a body. In when(), I send the HTTP request. In then(), I validate the response, starting with the status and then checking relevant fields and values.\n\nI also consider negative cases, response shape, and whether the request changed data as expected. I keep test data controlled so failures are easier to understand."
      },
      {
        question: "What are the main HTTP methods?",
        answer: "GET retrieves a resource. POST commonly creates a resource or triggers an operation. PUT replaces a resource representation, while PATCH updates selected parts. DELETE requests removal of a resource.\n\nThe exact behaviour depends on the API contract, so I verify the documented semantics instead of assuming every service follows the same conventions. I also check the expected status code, response body, and side effects for each operation."
      },
      {
        question: "Which HTTP status codes do you commonly test?",
        answer: "Successful responses commonly include 200 for a successful request, 201 when a resource is created, and 204 when the request succeeds without a response body. Client errors include 400 for an invalid request, 401 for missing or invalid authentication, 403 for insufficient permission, and 404 when a resource is not found.\n\nA 500-range response indicates a server-side failure. I check the API contract for the exact expected code and error body, and I test both successful and meaningful failure cases."
      },
      {
        question: "Is PUT idempotent? Is POST?",
        answer: "An operation is idempotent if repeating the same request has the same intended effect as making it once. PUT is designed to be idempotent when it replaces a resource with the same representation. DELETE is also defined as idempotent even if later responses differ because the resource is already gone.\n\nPOST is not generally idempotent; repeating a create request can create duplicates. The actual API contract still matters, and some services use idempotency keys to make particular POST operations safe to retry."
      },
      {
        question: "How do you validate more than an API status code?",
        answer: "I check the response body for required fields, correct types, expected values, and sensible handling of optional or null fields. I also review headers, error messages, and response behaviour for invalid inputs or missing permissions.\n\nWhen the workflow changes stored data, I can use SQL or another trusted backend check to confirm the persisted result. I also consider whether the request is safe to repeat and whether the test data is isolated from other runs."
      },
      {
        question: "When would you use REST Assured instead of Postman?",
        answer: "Postman is useful for quickly exploring an API, trying requests manually, and sharing a collection for investigation. It gives fast feedback while I am learning an endpoint or diagnosing a response.\n\nREST Assured is useful when API checks need to live in code, use the project’s test framework, run repeatedly in CI/CD, and share assertions or setup with other automated tests. The choice depends on the team’s workflow; both tools can have a place."
      }
    ]
  },
  {
    topic: "SQL for testers",
    questions: [
      {
        question: "How do you use SQL in testing?",
        answer: "I use SQL to verify data behind a UI or API workflow. For example, after submitting a loan application, I can check that the expected record and key values were stored correctly.\n\nI write focused queries using known identifiers or controlled test data, and I avoid changing production data as part of verification. Database checks complement service and UI checks; they do not replace validating the user-visible behaviour."
      },
      {
        question: "What is the difference between WHERE and HAVING?",
        answer: "WHERE filters individual rows before the query groups them. HAVING filters the groups after GROUP BY has been applied, often using an aggregate such as COUNT or SUM.\n\nFor example, I can use WHERE to select transactions from a date range, group them by account, and use HAVING to show only accounts with more than a chosen number of transactions."
      },
      {
        question: "What is the difference between INNER JOIN and LEFT JOIN?",
        answer: "INNER JOIN returns rows that have matching values in both joined tables. LEFT JOIN returns every row from the left table and includes matching values from the right table; when no match exists, the right-side columns are NULL.\n\nWhen validating related test data, I choose the join based on whether unmatched records should be excluded or should appear in the result. I also check the join keys so an incorrect relationship does not multiply or omit rows."
      },
      {
        question: "What is the difference between a primary key and a foreign key?",
        answer: "A primary key uniquely identifies each row in a table and must satisfy the database’s uniqueness and nullability rules. A foreign key refers to a key in another table and helps enforce a relationship between records.\n\nFor example, an account identifier might be the primary key in an account table and be referenced by transactions. In testing, I can use those relationships to confirm that records are linked to the expected entity."
      }
    ]
  }
];
