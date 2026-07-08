# Spec-Driven Development with Spec-Kit (Claude + v0)

This repo uses [GitHub Spec-Kit](https://github.com/github/spec-kit) for **Spec-Driven
Development (SDD)**: you write a spec, generate a plan, break it into tasks, and let the agent
implement against them — specs are the source of truth, not ad-hoc prompts.

This one file is everything you need: requirements, install, the workflow, how v0 fits, and how
to reuse the setup across your other projects.

---

## 1. Requirements

| Requirement | Needed | Why |
|---|---|---|
| Python 3.11+ | ✅ | Runs the `specify` CLI |
| uv (or pipx) | ✅ | Installs `specify-cli` |
| Git | ✅ | Spec-Kit is git-aware (feature branches per spec) |
| Claude Code | ✅ | Runs the `/speckit-*` slash commands |
| v0 account (Vercel) | optional | UI generation (see §5) |

> This environment already has Python 3.11, uv, and git. You only need to install
> `specify-cli` once per machine (§2). After a project is initialized, the CLI is **not**
> required again — the slash commands and templates are committed to the repo.

---

## 2. Install `specify-cli` (once per machine)

```bash
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
```

Alternative (no uv): `pipx install` from the same git URL.

---

## 3. Initialize a project

**This repo is already initialized.** For a *new* project:

```bash
cd <your-project>
specify init --here --integration claude --force
```

- `--here` initializes in the current directory (use a name argument for a new folder).
- `--integration claude` installs the Claude Code slash-command skills.
- `--force` skips the "directory not empty" confirmation.
- Add `--ignore-agent-tools` if the `claude` binary isn't on PATH in the environment.

### What init adds
```
.claude/skills/speckit-*/SKILL.md   # the /speckit-* slash commands
.specify/
  memory/constitution.md            # project principles (source of truth)
  templates/                        # spec, plan, tasks, checklist templates
  scripts/                          # helper scripts the commands call
  workflows/                        # workflow registry
```
`.claude/` here holds only skill definitions (safe to commit). Secrets live in `.env*`, which
is already gitignored — never commit keys.

---

## 4. The workflow (run these as Claude Code slash commands)

Run in order. Each command reads the artifacts the previous one produced.

| Step | Command | Produces / does |
|---|---|---|
| 1 | `/speckit-constitution` | Establish/adjust project principles & guardrails |
| 2 | `/speckit-specify` | The **what & why**: user stories + acceptance criteria (no tech detail) |
| 3 | `/speckit-clarify` *(optional)* | Ask structured questions to de-risk ambiguity **before** planning |
| 4 | `/speckit-plan` | The **how**: architecture & stack decisions |
| 5 | `/speckit-tasks` | Ordered, independently shippable task list |
| 6 | `/speckit-analyze` *(optional)* | Cross-artifact consistency report |
| 6 | `/speckit-checklist` *(optional)* | Quality checklist for requirement completeness |
| 7 | `/speckit-implement` | Executes the tasks to build the feature |
| — | `/speckit-converge` | Assess existing codebase, append remaining work as tasks |
| — | `/speckit-taskstoissues` | Turn the task list into GitHub issues |

**Golden rule:** the spec owns *what/why*, the plan owns *how*. Don't put implementation detail
in the spec, and don't invent scope during implementation — go back and update the spec.

---

## 5. How Claude + v0 fit together

- **v0 (Vercel)** authors and iterates the **UI**. Generate components there, then pull them
  into `components/`.
- **Claude Code + Spec-Kit** owns **engineering**: structure, logic, data flow, state,
  integrations, refactors — driven by the spec's tasks.
- The split in practice: define *what/how* in Spec-Kit → build UI in v0 → paste components in →
  `/speckit-implement` wires them to real data and the tasks (no leftover mock content).

This project's constitution (`.specify/memory/constitution.md`) already encodes this split so
every `/speckit-plan` respects it.

---

## 6. Reusing this across your other projects

Every project gets its own copy, but you keep the same standards:

```bash
# once per machine
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git

# per new project
cd <new-project>
specify init --here --integration claude --force

# then seed your standards:
# copy this repo's .specify/memory/constitution.md into the new project and
# adjust the two [PROJECT-SPECIFIC] spots (backend/auth, data layer)
```

The constitution is the reusable core — it captures the standard **v0 + Claude Code +
Next.js / TypeScript / Tailwind / Radix / Vercel** workflow so you don't re-write standards each
time. Its five principles:

1. **Spec-driven, not vibe-driven** — every feature starts as a written spec.
2. **Design in v0, engineer in Claude** — clear division of labor.
3. **Standard stack** — Next.js App Router + TS (strict) + Tailwind + Radix/shadcn → Vercel.
4. **Ship-ready increments** — build/lint/typecheck green, no committed secrets.
5. **Accessible & performant by default** — a11y and Core Web Vitals are acceptance criteria.

---

## 7. Quick start (this repo)

```text
1. /speckit-constitution      # review the baseline already written for you
2. /speckit-specify           # describe the feature (what & why)
3. /speckit-plan              # architecture & stack decisions
4. /speckit-tasks             # ordered tasks
5. /speckit-implement         # build it
```

---

## 8. Notes & gotchas

- **Ephemeral environments:** in a fresh remote/cloud session the `specify` CLI won't persist,
  but you don't need it — the committed `.claude/` skills and `.specify/` templates are enough
  to run the whole workflow. Re-install `specify-cli` only to `init` a brand-new project.
- **Slash command names use hyphens** in this Spec-Kit version: `/speckit-specify`, not
  `/speckit.specify`.
- **Keep `main` green** and work on feature branches; Vercel gives you a preview per PR for
  visual review of v0-authored UI.

---

_Reference: <https://github.com/github/spec-kit>_
