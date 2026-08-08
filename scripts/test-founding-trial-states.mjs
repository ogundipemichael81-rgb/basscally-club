import assert from "node:assert/strict";
import { deriveTrialState } from "../src/lib/subscriptions/trial-state.ts";
const now = Date.parse("2026-08-10T00:00:00Z");
const end = new Date(now + 168 * 3600000).toISOString();
assert.equal(deriveTrialState({nowMs:now,trialEndsAt:end,foundingEligible:true,foundingPriceLocked:true,paid:false}).trialActive,true);
assert.equal(deriveTrialState({nowMs:now,trialEndsAt:new Date(now+48*3600000).toISOString(),foundingEligible:true,foundingPriceLocked:true,paid:false}).trialExpiring,true);
assert.equal(deriveTrialState({nowMs:now,trialEndsAt:new Date(now).toISOString(),foundingEligible:true,foundingPriceLocked:true,paid:false}).trialExpired,true);
assert.equal(deriveTrialState({nowMs:now,trialEndsAt:new Date(now-1).toISOString(),foundingEligible:true,foundingPriceLocked:true,paid:true}).trialExpired,false);
console.log("PASS trial state boundaries");
