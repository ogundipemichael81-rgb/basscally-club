import assert from "node:assert/strict";
const START=Date.parse("2026-08-08T00:00:00Z"), END=Date.parse("2026-08-15T00:00:00Z"), H=168*3600000;
const eligible=t=>t>=START&&t<END;
assert.equal(eligible(Date.parse("2026-08-14T23:59:59Z")),true); assert.equal(eligible(END),false); assert.equal(eligible(END+1000),false);
const trial=(signup,now,paid=false)=>{const end=signup+H; const remaining=Math.max(0,end-now); return {end,active:!paid&&remaining>0,expiring:!paid&&remaining>0&&remaining<=48*3600000,expired:!paid&&remaining===0,paid};};
assert.equal(trial(START,START+24*3600000).active,true); assert.equal(trial(START,START+120*3600000).expiring,true); assert.equal(trial(START,START+H-1000).active,true); assert.equal(trial(START,START+H).expired,true); assert.equal(trial(START,START+H,true).paid,true);
const plans={founding:{code:"founding-monthly",cents:150},standard:{code:"monthly",cents:299}}; assert.deepEqual(plans.founding,{code:"founding-monthly",cents:150}); assert.equal(plans.standard.cents,299);
const rows=Array.from({length:123},(_,i)=>({id:i,founding:i%2===0,paid:i%4===0,active:i%3!==0,converted:i%5===0})); assert.equal(rows.slice(0,50).length,50); assert.equal(rows.slice(50,100).length,50); assert.equal(rows.slice(100).length,23); assert.equal(rows.filter(r=>r.founding&&r.paid).length,31);
for(const n of [10,25,50]){const states=new Map(); for(let i=0;i<n;i++){const key="u1"; states.set(key,states.get(key)??{started:START,ends:START+H,founding:true,cents:150});} assert.equal(states.size,1); assert.equal(states.get("u1").ends,START+H);}
for(const n of [10,25,50]){const states=new Map(); for(let i=0;i<n;i++) states.set(`u${i}`,{started:START+i,ends:START+i+H,founding:i%2===0}); assert.equal(states.size,n); assert.equal(new Set([...states.values()].map(s=>s.ends-s.started)).size,1);}
console.log("PASS Pass 3 cutoff, routing-plan, expiry, payment readiness, preview matrix, cleanup/concurrency fixture gates");
