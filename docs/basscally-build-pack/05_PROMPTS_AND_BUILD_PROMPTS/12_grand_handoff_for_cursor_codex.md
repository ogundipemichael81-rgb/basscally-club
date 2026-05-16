# Basscally Club — Grand Handoff for Cursor / Codex

## Goal
Build Basscally Club from the completed design and product package without guessing.

## Upload order
1. `04_basscally_design_system.md`
2. `06_locked_screen_designs_UPDATED_01_33.md`
3. `01_PRD_basscally_club_mvp_UPDATED_v1_1.md`
4. `08_architecture_backend_auth_payments_email_logic.md`
5. `09_routes_wiring_screen_map_and_components.md`
6. `10_system_checks_audit_prompts_and_acceptance_tests.md`
7. `07_master_build_sequence_and_ai_prompts.md`
8. `03_cursor_codex_build_prompt_UPDATED_v2.md`
9. `02_landing_page_copy_and_wireframe.md`
10. `basscally-all-generated-screens-01-33-complete.zip`
11. Original docs as historical references only.

## First prompt to paste
```text
You are building Basscally Club. Read every uploaded document and every HTML reference. Do not code yet. Confirm the full route map, data model, plan-code logic, webhook lifecycle, email queue logic, and screen-to-route mapping. Then produce a phase-by-phase implementation plan. The design system wins on visuals. The updated PRD wins on product scope. The architecture doc wins on backend logic. The locked screen doc wins on screen references. Do not invent screens or routes.
```

## Second prompt to paste
Use Phase 1 from `07_master_build_sequence_and_ai_prompts.md`.

## Build discipline
- One phase at a time.
- Run lint, typecheck, and build after every phase.
- Self-audit every route against its HTML file.
- Do not claim completion when data is mocked unless the phase explicitly permits mocks.
- Keep service keys server-only.
- Keep admin checks server-side.
- Keep downloads gated by active subscription.
- Keep billing self-serve through Lemon Squeezy portal.
