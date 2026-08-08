import assert from "node:assert/strict";
import fs from "node:fs";
const read=(p)=>fs.readFileSync(p,"utf8");
const middleware=read("src/middleware.ts");
const cont=read("src/app/(auth)/auth/continue/route.ts");
const admin=read("src/lib/admin/auth.ts");
const member=read("src/lib/subscriptions/resolve-member.ts");
const layout=read("src/app/(admin)/layout.tsx");
assert.equal(/isAdminEmail\(user\.email\)\)\s*\{\s*return NextResponse\.redirect\(new URL\(routes\.admin\.root/.test(middleware),false,"member login must not auto-route admins");
assert.match(cont,/isAdminEmail\(user\.email\)/); assert.match(cont,/auth\.signOut\(\)/); assert.match(cont,/\/admin\/login/);
assert.doesNotMatch(admin,/resolveMemberFromRequest/); assert.match(admin,/auth\.getUser\(\)/);
assert.doesNotMatch(member,/lookupUserByEmail\(user\.email\)/); assert.match(member,/lookupUserById\(user\.id\)/); assert.match(member,/identity integrity mismatch/);
assert.match(layout,/requireAdminPage/); assert.match(layout,/force-dynamic/); assert.match(layout,/revalidate=0/);
for(const p of ["src/app/api/admin/content/route.ts","src/app/api/admin/content/[id]/route.ts","src/app/api/admin/content/[id]/resend/route.ts","src/app/api/admin/session-check/route.ts","src/app/api/admin/subscribers/export/route.ts"]){const s=read(p);assert.match(s,/requireAdminApi/)}
console.log("PASS admin/member isolation source invariants");
