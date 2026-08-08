import readline from "node:readline";
import { createClient } from "@supabase/supabase-js";

const ADMIN_ID = "fc0ab92b-d2bf-4b08-bd13-dea32bd6ffee";
const ADMIN_EMAIL = "basscally.enquiry@gmail.com";

function ask(prompt, hidden = false) {
  return new Promise((resolve) => {
    if (!hidden || !process.stdin.isTTY) {
      const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
      rl.question(prompt, (answer) => { rl.close(); resolve(answer); });
      return;
    }
    process.stdout.write(prompt);
    const stdin = process.stdin;
    stdin.setRawMode(true);
    stdin.resume();
    let value = "";
    const onData = (chunk) => {
      const key = chunk.toString();
      if (key === "\r" || key === "\n") {
        stdin.setRawMode(false); stdin.pause(); stdin.removeListener("data", onData); process.stdout.write("\n"); resolve(value); return;
      }
      if (key === "\u0003") { stdin.setRawMode(false); stdin.pause(); stdin.removeListener("data", onData); process.exit(130); }
      if (key === "\u0008" || key === "\u007f") { value = value.slice(0, -1); return; }
      if (key.length === 1) value += key;
    };
    stdin.on("data", onData);
  });
}

if (process.env.NODE_ENV === "production") { console.error("REFUSED_IN_PRODUCTION"); process.exit(1); }
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key || !service) { console.error("MISSING_LOCAL_SUPABASE_ENV"); process.exit(1); }
const admin = createClient(url, service, { auth: { autoRefreshToken: false, persistSession: false } });
const { data, error } = await admin.auth.admin.getUserById(ADMIN_ID);
if (error || !data.user || data.user.email?.trim().toLowerCase() !== ADMIN_EMAIL) { console.error("OFFICIAL_ADMIN_ID_EMAIL_MISMATCH"); process.exit(1); }
console.log(`About to update password for: ${ADMIN_EMAIL}`);
const confirm = await ask("Type UPDATE to continue: ");
if (confirm !== "UPDATE") { console.error("CANCELLED"); process.exit(1); }
const first = await ask("New admin password: ", true);
const second = await ask("Confirm new admin password: ", true);
if (first.length < 12) { console.error("PASSWORD_TOO_SHORT"); process.exit(1); }
if (first !== second) { console.error("PASSWORDS_DO_NOT_MATCH"); process.exit(1); }
const result = await admin.auth.admin.updateUserById(ADMIN_ID, { password: first });
if (result.error) { console.error("PASSWORD_UPDATE_FAILED"); process.exit(1); }
console.log("ADMIN_PASSWORD_UPDATED");
