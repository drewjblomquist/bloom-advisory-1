# Agent Operating Rules

Follow the project source-of-truth documents before implementation:

1. `docs/core/CONSTRAINTS.md`
2. `docs/core/CONTEXT_PACK.md`
3. `docs/core/DOC_INDEX.md`
4. the active iteration plan in `docs/plans/`
5. `docs/specs/PROJECT_RULES.md`

## Autonomy

- Inspect relevant code, choose a reasonable implementation approach, implement it, run targeted checks, fix errors caused by the change, and continue until the objective works.
- Do not stop to ask how to implement something when a reasonable engineering decision can be made independently.
- Ask only when a requirement is genuinely ambiguous and materially changes the product, credentials or private information are required, an action is destructive or difficult to reverse, or significant new infrastructure or paid services would be introduced.



## Efficiency

- Identify the files/components most likely relevant before doing work and inspect those first.
- Avoid exploring unrelated areas of the repository.
- Prefer modifying existing architecture over rewrites.
- Do not refactor unrelated code.
- Do not repeatedly reread unchanged files.
- Use targeted tests/checks when they adequately verify the change.
- Do not generate excessive documentation unless requested.



Model and Compute Efficiency

Optimize for useful work completed per unit of compute.

Use the least expensive capable model for delegated work.

Recommended escalation:

- Luna: mechanical and trivial work

- Terra: routine implementation

- Sol: complex implementation and debugging

- Astra: architecture, difficult reasoning, or problems where weaker

  models have failed

Do not use Astra for repetitive implementation that can reliably be

performed by a cheaper model.

When encountering a difficult problem:

1. Attempt a reasonable solution.

2. If repeated attempts are not making progress, stop.

3. Escalate the reasoning/problem rather than continuing an

   unproductive loop.

Do not spawn multiple agents to independently solve the same problem

unless comparison is specifically valuable.

Prefer:

one strong plan → cheaper execution → targeted verification.

Avoid:

multiple expensive agents independently exploring the same problem.



## Subagents

- Use subagents only when parallel work provides a clear advantage.
- Do not spawn agents for trivial tasks or work that can be completed efficiently in the current context.
- Prefer one primary agent for normal feature development.



## Browser Use

- Use the browser autonomously when visual or runtime verification is useful.
- For UI work: implement, open the relevant page, verify affected functionality and appearance, fix observed problems, and recheck the affected area.
- Do not continuously browse or repeatedly inspect unchanged pages.
- Use full CDP/debugging access only when necessary to diagnose runtime, network, console, DOM, or performance problems.



## Definition of Done

Stop when:

- the requested functionality is implemented;
- relevant tests/checks pass;
- no known errors were introduced;
- affected UI/functionality has been verified when appropriate.

Once done, report what changed and stop. Do not continue polishing, refactoring, optimizing, or expanding scope unless it is necessary for the requested objective.