// Ownership and systems-thinking prompts used in the expandable speaking guide.
export const grounding = {
  ownershipSteps: [
    { title: "Purpose", detail: "What user or business need does the system serve?" },
    { title: "Journey", detail: "How does a request travel from the user through the system?" },
    { title: "Architecture", detail: "What are the main components, boundaries, data stores, and integrations?" },
    { title: "Trade-off", detail: "What risk, constraint, or design choice matters, and why?" },
    { title: "Proof", detail: "How did we test or observe the outcome, and what changed?" }
  ],
  speakingPrompts: [
    "At a high level, the goal of this flow is…",
    "The request moves from… to…; the important boundary is…",
    "My contribution was…; the team’s wider decision or delivery was…",
    "The main risk I considered was…; I checked it by…",
    "The result was…; if I revisited it, I would also consider…"
  ],
  honestyNote: "Speak with the structure and care of an owner, without claiming a title or decision that was not yours. Say “I” for your contribution, “we” for team outcomes, and label a design idea as a recommendation when it was not part of the actual project."
};
