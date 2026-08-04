# Member and admin screen map

| Route | Intended user | Access | Purpose / primary action | Unpaid state | Paid state |
|---|---|---|---|---|---|
| `/dashboard` | authenticated member | session | practice home | preview player when an admin designates one; premium cards locked; choose a plan | full latest-library dashboard |
| `/dashboard?filter=all` | authenticated member | session | all published drops | cards remain visible and premium items route to activation | full library |
| `/dashboard?filter=bassless` | authenticated member | session | bass-less library | locked cards | playable member tracks |
| `/dashboard?filter=grooves` | authenticated member | session | groove library | locked cards | playable member tracks |
| `/dashboard?filter=fills` | authenticated member | session | fill library | locked cards | playable member tracks |
| `/dashboard?filter=challenges` | authenticated member | session | challenge library | locked cards | active challenges |
| `/account` | authenticated member | session | membership status / choose plan | plan choices | billing controls |
| `/account/security` | authenticated member | session | password and sign-out | available | available |
| `/c/[id]` | authenticated member | server content access | track information / play | only designated preview plays; other items go to activation | full player and download |
| `/pricing` | visitor or member | server destination resolver | choose a plan | plan → checkout if signed in | billing management |
| `/checkout?plan=...` | signed-in unpaid member | session | authenticated Lemon checkout | selected plan retained | active members route to billing through pricing resolver |
| `/admin/login` | prospective admin | password + server allowlist | dedicated admin sign-in | not applicable | allowlisted account enters admin |
| `/admin` | admin | server allowlist | metrics | denied | metrics |
| `/admin/content` | admin | server allowlist | content management | denied | content list |
| `/admin/content/new` | admin | server allowlist | upload / designate one preview | denied | upload form |
| `/admin/subscribers` | admin | server allowlist | subscribers | denied | subscriber list |
| `/admin/email-logs` | admin | server allowlist | delivery logs | denied | logs |
| `/admin/email-templates` | admin | server allowlist | templates | denied | templates |

## Screenshot evidence

Screenshot folders are reserved at:

- `docs/AUTO-REPORTS/UI-SCREENSHOTS/member-unpaid/`
- `docs/AUTO-REPORTS/UI-SCREENSHOTS/member-paid/`
- `docs/AUTO-REPORTS/UI-SCREENSHOTS/admin/`

They must be captured only after production has a real owned sample and a verified paid Lemon test transaction. Fixture screenshots must be labelled as fixture evidence and never claimed as live paid access.
