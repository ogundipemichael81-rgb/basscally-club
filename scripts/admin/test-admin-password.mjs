import readline from "node:readline";
import { createClient } from "@supabase/supabase-js";

function ask(prompt, hidden = false) {
  return new Promise((resolve) => {
    if (!hidden || !process.stdin.isTTY) {
      const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
      rl.question(prompt, (answer) => { rl.close(); resolve(answer); }); return;
    }
    process.stdout.write(prompt); const stdin = process.stdin; stdin.setRawMode(true); stdin.resume(); let value = "";
    const onData = (chunk) => { const key = chunk.toString(); if (key === "\r" || key === "\n") { stdin.setRawMode(false); stdin.pause(); stdin.removeListener("data", onData); process.stdout.write("\n"); resolve(value); return; } if (key === "\u0003") process.exit(130); if (key !== "\u0008" && key !== "\u007f" && key.length === 1) value += key; };
    stdin.on("data", onData);
  });
}
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!url || !key) { console.error("MISSING_LOCAL_PUBLIC_SUPABASE_ENV"); process.exit(1); }
const email = (await ask("Email: ")).trim().toLowerCase();
const password = await ask("Password: ", true);
const supabase = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
const { data, error } = await supabase.auth.signInWithPassword({ email, password });
if (error) { console.error(JSON.stringify({ result: "AUTH_FAILURE", status: error.status, code: error.code, message: error.message })); process.exit(1); }
console.log(JSON.stringify({ result: "AUTH_SUCCESS", user_id: data.user?.id }));
await supabase.auth.signOut({ scope: "local" });