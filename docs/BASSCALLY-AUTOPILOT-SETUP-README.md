# Basscally Hub Autopilot — Setup & Run Guide

This guide gets the autopilot system running from scratch. Read it once. After setup, the entire workflow is two commands.

---

## What you're setting up

Three Python scripts that turn your Basscally Hub repo into a self-managing build system:

| Script | What it does |
|---|---|
| `basscally-autopilot-controller.py` | The 4-command brain — tracks where you are, writes prompts, verifies work |
| `basscally-ui-simulator.py` | Opens a real browser, clicks through every screen as every user role |
| `basscally-responsive-audit.py` | Tests every page at 320/375/390/768/1024/1280px automatically |

---

## Step 1 — Copy scripts into your repo

Put these files in your repo:

```
your-basscally-repo/
├── scripts/
│   ├── basscally-autopilot-controller.py
│   ├── basscally-ui-simulator.py
│   └── basscally-responsive-audit.py
├── docs/
│   ├── AUTO-REPORTS/          ← created automatically on first run
│   ├── BASSCALLY-AUTOPILOT-ARCHITECTURE.md
│   └── basscally-full-button-function-audit.md
└── package.json
```

---

## Step 2 — Add scripts to package.json

Open `package.json` and add these four lines to the `"scripts"` section:

```json
{
  "scripts": {
    "bh:status":   "python scripts/basscally-autopilot-controller.py status",
    "bh:next":     "python scripts/basscally-autopilot-controller.py next",
    "bh:complete": "python scripts/basscally-autopilot-controller.py complete",
    "bh:check":    "python scripts/basscally-autopilot-controller.py check"
  }
}
```

On Windows, use `python` (not `python3`). On Mac/Linux, either works.

---

## Step 3 — Install Python dependencies for the UI simulator

The UI simulator and responsive audit use Playwright (a real browser automation library).

**Mac/Linux:**
```bash
pip3 install playwright --break-system-packages
python3 -m playwright install chromium
```

**Windows (PowerShell):**
```powershell
pip install playwright
python -m playwright install chromium
```

You only need to do this once.

---

## Step 4 — Create the config file

Create this file at `docs/AUTO-REPORTS/BH-TOOL-CONFIG.json`:

**For Cursor users:**
```json
{
  "editor_command": "cursor",
  "agent_command": null,
  "prompt_file": "docs/AUTO-REPORTS/NEXT-AGENT-PROMPT.md"
}
```

**For VS Code users:**
```json
{
  "editor_command": "code",
  "agent_command": null,
  "prompt_file": "docs/AUTO-REPORTS/NEXT-AGENT-PROMPT.md"
}
```

**For future Claude Code CLI users:**
```json
{
  "editor_command": "cursor",
  "agent_command": "claude",
  "prompt_file": "docs/AUTO-REPORTS/NEXT-AGENT-PROMPT.md"
}
```

When `agent_command` is set, `bh:next` calls the agent directly instead of opening the file. You don't change anything else — the command stays `npm run bh:next`.

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

If you see this, you're ready.

---

## The daily loop (this is the whole workflow)

```powershell
npm run bh:next
```
→ A prompt file is written to `docs/AUTO-REPORTS/NEXT-AGENT-PROMPT.md` and opened in your editor.
→ Tell your IDE agent: **"Read docs/AUTO-REPORTS/NEXT-AGENT-PROMPT.md and complete the task."**
→ The agent does the work.

```powershell
npm run bh:complete
```
→ The controller checks that the agent created the required artifact file with all required content.
→ If everything passes: step marked complete, advanced to next step.
→ If something's missing: exactly what's missing is printed. Agent fixes it. Run `bh:complete` again.

Repeat. That's it.

---

## Running the UI simulator manually (step BH-18)

The controller triggers this automatically during BH-18, but you can run it anytime:

```powershell
# Make sure npm run dev is running first in a separate terminal

# Run all test suites
python scripts/basscally-ui-simulator.py --suite all

# Run a specific suite
python scripts/basscally-ui-simulator.py --suite auth
python scripts/basscally-ui-simulator.py --suite member
python scripts/basscally-ui-simulator.py --suite paywall
python scripts/basscally-ui-simulator.py --suite admin
python scripts/basscally-ui-simulator.py --suite conversion
python scripts/basscally-ui-simulator.py --suite responsive

# Run with visible browser (useful for debugging)
python scripts/basscally-ui-simulator.py --suite all --headed
```

Results appear at `docs/AUTO-REPORTS/UI-SIM-LATEST.md`.
If tests fail, a fix prompt appears at `docs/AUTO-REPORTS/UI-SIM-FIX-PROMPT.md` — paste that into your IDE agent.
Screenshots of every FAIL appear at `docs/AUTO-REPORTS/UI-SIM-SCREENSHOTS/`.

---

## Running the responsive audit manually (step BH-19)

```powershell
# Make sure npm run dev is running

python scripts/basscally-responsive-audit.py

# Test a single route
python scripts/basscally-responsive-audit.py --route /
```

Results appear at `docs/AUTO-REPORTS/BH-19-RESPONSIVE-AUDIT.md`.

---

## Setting up mock auth (required for simulator)

The simulator needs to switch between user personas without a real login. Add this API route to your Next.js app (staging only — never production):

**`app/api/mock-auth/session/route.ts`:**
```typescript
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// STAGING ONLY — remove in production
export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "not available" }, { status: 404 });
  }
  const data = await req.formData();
  const userId = data.get("userId") as string;
  const cookieStore = cookies();
  if (userId) {
    cookieStore.set("basscally_mock_user_id", userId, {
      httpOnly: false,
      path: "/",
    });
  } else {
    cookieStore.delete("basscally_mock_user_id");
  }
  return NextResponse.json({ ok: true });
}
```

Then in your middleware or auth helper, check for `basscally_mock_user_id` cookie when `NODE_ENV !== "production"` and use it to inject a mock user session. The simulator expects these IDs to map to seeded DB rows:

| Cookie value | Maps to |
|---|---|
| `mock-member-active` | Active founding member, has subscription |
| `mock-member-lapsed` | Member with expired subscription |
| `mock-admin-michael` | Admin user (in ADMIN_EMAILS list) |

Seed these users in Supabase during BH-02 setup.

---

## Opening any LLM and continuing from where you stopped

The entire project state lives in the repo. To continue on any machine or with any LLM:

1. Open the repo
2. Read `docs/AUTO-REPORTS/BH-STATE.json` — tells you the current step
3. Read `docs/AUTO-REPORTS/BH-CURRENT-COMMAND-CENTER.md` — tells you what to do
4. Run `npm run bh:next` — the correct prompt for the current step is generated instantly

No copy-paste of previous chats needed. No "catch me up" needed. The state file is the truth.

---

## Where everything lives after setup

```
docs/AUTO-REPORTS/
├── BH-STATE.json                    ← current step, status, completed list
├── BH-TOOL-CONFIG.json              ← editor/agent config
├── BH-CURRENT-COMMAND-CENTER.md     ← human-readable "what to do right now"
├── NEXT-AGENT-PROMPT.md             ← the current step prompt for your IDE agent
├── BH-LATEST-RUN.md                 ← last bh:complete result
├── UI-SIM-LATEST.md                 ← last simulator run
├── UI-SIM-FIX-PROMPT.md             ← paste this into your IDE agent if tests fail
├── UI-SIM-SCREENSHOTS/              ← screenshots of failing UI tests
├── BH-19-RESPONSIVE-AUDIT.md        ← responsive audit results
├── BH-00-REPO-SCAN.md               ← BH-00 artifact (written by IDE agent)
├── BH-01-NAMING-PASS.md             ← BH-01 artifact
└── ... (one artifact per step)
```

---

## Troubleshooting

**`bh:next` says "editor not found":**
The `editor_command` in `BH-TOOL-CONFIG.json` doesn't match an installed command. Try `"cursor"`, `"code"`, or `"nano"`. Or open `docs/AUTO-REPORTS/NEXT-AGENT-PROMPT.md` manually.

**`bh:complete` says "artifact missing":**
Your IDE agent didn't create the required file. Check `docs/AUTO-REPORTS/NEXT-AGENT-PROMPT.md` — the exact file path and required content are listed. Tell your agent: "Create the artifact file listed in NEXT-AGENT-PROMPT.md with all required sections."

**Simulator says "Server not running":**
Run `npm run dev` in a separate terminal before running the simulator.

**Playwright not found:**
Run: `pip install playwright && python -m playwright install chromium`

**Mock auth not working (simulator redirects to login for member persona):**
The `/api/mock-auth/session` route isn't set up. See "Setting up mock auth" above.

**Git diff shows no changes:**
Your IDE agent ran checks but didn't write any files. Tell it: "You must create or modify files. The artifact file is the minimum — create it with all required marker text."

---

*The system is designed to survive any LLM, any IDE, any machine. The repo is the brain. Two commands run the project. That's it.*
