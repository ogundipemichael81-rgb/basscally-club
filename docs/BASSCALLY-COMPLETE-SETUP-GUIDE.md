# Basscally Hub — Complete Setup Guide

One document. Everything you need to go from a fresh repo to a fully running autopilot build system. Read top to bottom once. After setup, two commands run the entire project.

---

## What you're setting up

A self-managing build system that:

- **Knows where you are** — state file tracks current step across sessions, machines, and LLMs
- **Writes your prompts** — generates the exact build instruction for the current step automatically
- **Verifies every step** — never advances until the work is actually done and checked
- **Tests the UI** — opens a real browser, clicks through every screen as every user role, screenshots failures
- **Audits every breakpoint** — checks 320px through 1280px automatically
- **Works with any LLM** — open the repo in Cursor, ChatGPT, Claude, or anything else and continue from exactly where you stopped

---

## Files you need in your repo

```
your-basscally-repo/
├── scripts/
│   ├── basscally-autopilot-controller.py     ← the four-command brain
│   ├── basscally-ui-simulator.py             ← automated browser click tests
│   └── basscally-responsive-audit.py         ← breakpoint audit
├── docs/
│   ├── BASSCALLY-AUTOPILOT-ARCHITECTURE.md  ← the definitive reference
│   ├── basscally-full-button-function-audit.md
│   ├── basscally-mobile-responsive-deep-audit.md
│   ├── basscally-legal-document-drafts.md
│   └── codex-depth-color-fix-prompt.md
└── package.json
```

All files above are provided. Copy them into your repo before continuing.

---

## Step 1 — Add the four commands to package.json

Open `package.json`. Find the `"scripts"` section. Add these four lines:

```json
"bh:status":   "python scripts/basscally-autopilot-controller.py status",
"bh:next":     "python scripts/basscally-autopilot-controller.py next",
"bh:complete": "python scripts/basscally-autopilot-controller.py complete",
"bh:check":    "python scripts/basscally-autopilot-controller.py check"
```

Full example:

```json
{
  "name": "basscally-hub",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "lint": "next lint",
    "bh:status":   "python scripts/basscally-autopilot-controller.py status",
    "bh:next":     "python scripts/basscally-autopilot-controller.py next",
    "bh:complete": "python scripts/basscally-autopilot-controller.py complete",
    "bh:check":    "python scripts/basscally-autopilot-controller.py check"
  }
}
```

---

## Step 2 — Install Playwright (one time only)

The UI simulator and responsive audit drive a real Chrome browser. Install once:

**Mac:**
```bash
pip3 install playwright --break-system-packages
python3 -m playwright install chromium
```

**Windows (PowerShell):**
```powershell
pip install playwright
python -m playwright install chromium
```

**Linux:**
```bash
pip install playwright --break-system-packages
python -m playwright install chromium
```

---

## Step 3 — Create the config file

Create this file at `docs/AUTO-REPORTS/BH-TOOL-CONFIG.json`.

The folder will be created automatically on first run, but you can create it now:

```json
{
  "editor_command": "cursor",
  "agent_command": null,
  "prompt_file": "docs/AUTO-REPORTS/NEXT-AGENT-PROMPT.md"
}
```

**If you use VS Code instead of Cursor:**
```json
{
  "editor_command": "code",
  "agent_command": null,
  "prompt_file": "docs/AUTO-REPORTS/NEXT-AGENT-PROMPT.md"
}
```

**When Claude Code CLI or Codex CLI is available:**
Set `agent_command` to the CLI command (e.g. `"claude"` or `"codex"`). The system will call it directly instead of opening the file. Your `bh:next` command stays exactly the same — nothing else changes.

---

## Step 4 — Add mock auth to your Next.js app (for the simulator)

The UI simulator switches between user personas without a real login. Add this route to your app:

**Create `app/api/mock-auth/session/route.ts`:**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// STAGING ONLY — gates this route from production
export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "not available" }, { status: 404 });
  }

  const data = await req.formData();
  const userId = data.get("userId") as string;
  const cookieStore = await cookies();

  if (userId && userId !== "null") {
    cookieStore.set("basscally_mock_user_id", userId, {
      httpOnly: false,
      path: "/",
      maxAge: 60 * 60 * 8, // 8 hours
    });
  } else {
    cookieStore.delete("basscally_mock_user_id");
  }

  return NextResponse.json({ ok: true });
}
```

Then in your auth middleware or session helper, check for the mock cookie when not in production:

```typescript
// In your middleware.ts or session helper
const mockUserId = process.env.NODE_ENV !== "production"
  ? request.cookies.get("basscally_mock_user_id")?.value
  : null;

if (mockUserId) {
  // Look up this user ID in your seeded DB rows
  // and inject them as the current session user
}
```

**Seed these users in Supabase during BH-02:**

| Cookie value | Who they are |
|---|---|
| `mock-member-active` | Founding member, active subscription |
| `mock-member-lapsed` | Member with expired subscription |
| `mock-admin-michael` | Admin (in ADMIN_EMAILS env var) |

---

## Step 5 — Verify setup

Run this:

```powershell
npm run bh:status
```

You should see:

```
══════════════════════════════════════════════════════
BASSCALLY HUB AUTOPILOT
══════════════════════════════════════════════════════
Step:       BH-00
Title:      Repo Scan and Docs Truth
Status:     pending
Artifact:   missing
After this: BH-01
Completed:  0 / 22
Health:     unknown
══════════════════════════════════════════════════════
```

If you see this, everything is working.

---

## The daily loop — this is the entire workflow

```powershell
npm run bh:next
```

This does three things automatically:
1. Writes the full build instruction to `docs/AUTO-REPORTS/NEXT-AGENT-PROMPT.md`
2. Opens it in your editor (Cursor/VS Code)
3. Sets status to `pushed`

Then tell your IDE agent:

> **Read `docs/AUTO-REPORTS/NEXT-AGENT-PROMPT.md` and execute it fully. Do not ask. Do the work now.**

The agent reads the file, does the work, creates the artifact.

Then:

```powershell
npm run bh:complete
```

This does three things automatically:
1. Checks that the artifact file exists
2. Verifies every required marker is present in the artifact
3. If all pass: advances to the next step. If anything's missing: prints exactly what's missing.

If it fails:

```powershell
npm run bh:next    # regenerates prompt with missing items noted
```

Tell your agent to read and execute again. Run `bh:complete` again. Repeat until it passes.

Then the loop continues:

```
bh:next → agent reads and executes → bh:complete → passes → bh:next → ...
```

22 steps. No skipping. No parallel. The controller gates every step.

---

## The agent instruction (copy this every time)

After `bh:next` opens the prompt file, give your IDE agent exactly this:

> Read `docs/AUTO-REPORTS/NEXT-AGENT-PROMPT.md` and execute it fully. Do not ask for clarification. Do not ask for permission. Do not summarise what you are about to do. Execute the step, create the artifact, include all required markers. When done, stop.

This is already baked into the bottom of every generated prompt file. It's there for the agent. The instruction above is for you to say it as the opening message to your agent session before it reads the file.

---

## Running the simulator manually

During step BH-18 the controller runs this automatically. You can run it any time:

```powershell
# Start your dev server first
npm run dev

# In a second terminal
python scripts/basscally-ui-simulator.py --suite all

# Run a specific suite
python scripts/basscally-ui-simulator.py --suite auth
python scripts/basscally-ui-simulator.py --suite member
python scripts/basscally-ui-simulator.py --suite paywall
python scripts/basscally-ui-simulator.py --suite admin
python scripts/basscally-ui-simulator.py --suite conversion

# See the browser (useful for debugging)
python scripts/basscally-ui-simulator.py --suite all --headed
```

Results: `docs/AUTO-REPORTS/UI-SIM-LATEST.md`
Failing test fix prompt: `docs/AUTO-REPORTS/UI-SIM-FIX-PROMPT.md`
Screenshots: `docs/AUTO-REPORTS/UI-SIM-SCREENSHOTS/`

If tests fail, paste `UI-SIM-FIX-PROMPT.md` directly into your IDE agent.

---

## Running the responsive audit manually

```powershell
npm run dev   # first terminal

python scripts/basscally-responsive-audit.py          # second terminal
python scripts/basscally-responsive-audit.py --route / # single route
```

Results: `docs/AUTO-REPORTS/BH-19-RESPONSIVE-AUDIT.md`

---

## Continuing from any machine or LLM

The entire project state lives in the repo. To pick up on a new machine, in a new chat, with a different LLM:

1. Open the repo
2. Read `docs/AUTO-REPORTS/BH-STATE.json` — tells you the current step
3. Read `docs/AUTO-REPORTS/BH-CURRENT-COMMAND-CENTER.md` — tells you what to do right now
4. Run `npm run bh:next` — the correct prompt is generated instantly

No chat history needed. No recap. The state file is the memory.

**For a new GPT session:** paste `GPT-PROJECT-MEMORY-HANDOVER.md` as your first message. GPT has full context in one read.

**For a new Cursor session:** run `bh:next`. The prompt file has everything the agent needs.

---

## All the files the system creates automatically

```
docs/AUTO-REPORTS/
├── BH-STATE.json                     current step, status, completed list
├── BH-TOOL-CONFIG.json               editor/agent config (you create this)
├── BH-CURRENT-COMMAND-CENTER.md      human-readable "what to do now"
├── NEXT-AGENT-PROMPT.md              current step instruction for IDE agent
├── BH-LATEST-RUN.md                  last bh:complete result
├── UI-SIM-LATEST.md                  last simulator run
├── UI-SIM-FIX-PROMPT.md              fix prompt for failing simulator tests
├── UI-SIM-SCREENSHOTS/               screenshots of every UI test FAIL
├── BH-19-RESPONSIVE-AUDIT.md         responsive audit results
├── BH-00-REPO-SCAN.md                step artifact (written by IDE agent)
├── BH-01-NAMING-PASS.md              step artifact
└── ... (BH-02 through BH-22)
```

Files in `docs/AUTO-REPORTS/` are written by the controller and scripts. You never edit them manually.

---

## What the autopilot will not do

- Will not advance a step without a verified artifact
- Will not re-ask for the 15 locked decisions
- Will not copy anything to clipboard
- Will not pretend a step is done when it isn't
- Will not skip steps or run them in parallel
- Will not mention the next step as actionable until the current step passes

---

## Summary — the smallest possible version

1. Copy 3 scripts into `scripts/`
2. Add 4 lines to `package.json`
3. Run `pip install playwright && python -m playwright install chromium`
4. Create `docs/AUTO-REPORTS/BH-TOOL-CONFIG.json`
5. Add mock auth route to the app
6. Run `npm run bh:status` to confirm

Then every day:

```
npm run bh:next
→ agent reads NEXT-AGENT-PROMPT.md and executes fully
npm run bh:complete
→ passes → next step
→ fails → fix → bh:complete again
```

That is the entire system.
