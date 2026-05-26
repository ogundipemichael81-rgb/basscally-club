# Basscally Hub — Public legal content draft (internal)

**Status:** **Implemented in app** (2026-05-17) — live at `/terms`, `/privacy`, `/refund-policy`  
**Last updated:** 17 May 2026  
**Source:** Derived from `basscally-legal-document-drafts (1).md` (sanitized) and `docs/legal-pages-build-plan.md`  
**App module:** `src/content/legal.ts`

> **Public-facing draft pending final solicitor review.** Shipped pages use the copy below (sections 1–3). Do not treat as final legal advice until counsel signs off (internal section at end). Judgement items must **never** appear on public routes.

---

## Implementation status (2026-05-17)

| Item | Detail |
| --- | --- |
| **Routes** | `/terms` (Terms of Service), `/privacy` (Privacy Policy), `/refund-policy` (Refund Policy) |
| **Support email** | `basscally.enquiry@gmail.com` |
| **Address display** | Registered in England & Wales, Company No. 16656420. Registered office address available on request. |
| **Payment provider in copy** | Lemon Squeezy only |
| **Inactive providers** | **Stripe and PayPal are not active** for Basscally Hub and **must not** appear in public legal pages |
| **Footer P1** | **Resolved** — marketing + login footers link to legal routes |
| **QA** | `scripts/legal-audit.mjs`, `scripts/responsive-audit.mjs` — PASS |
| **Next build phase** | Phase B (Supabase + Lemon Squeezy) per `docs/launch-mvp-scope.md` |

When counsel approves final wording, update `src/content/legal.ts` and bump Last updated / Effective date on each page.

---

## Shared details (all documents)

| Field | Value |
| --- | --- |
| **Service name** | Basscally Hub |
| **Operator** | Basscally Ltd (company number 16656420) |
| **Support email** | basscally.enquiry@gmail.com |
| **Public address line** | Registered in England & Wales, Company No. 16656420. Registered office address available on request. |
| **Payment provider** | Lemon Squeezy |
| **Merchant of record** | Lemon Squeezy, where applicable to the checkout |

---

# 1. Privacy Policy

**Last updated:** 17 May 2026

This Privacy Policy explains how **Basscally Ltd** (“**Basscally**”, “**we**”, “**us**”) collects and uses personal information when you use **Basscally Hub** (the “**Service**”) — our membership website for bass practice content.

We are the data controller for personal information described in this policy. If you have questions, contact us at **basscally.enquiry@gmail.com**.

Nothing in this policy is intended to reduce your rights under UK data protection law.

---

## 1. Who this policy applies to

This policy applies to:

- Visitors to our website (including pricing and legal pages)
- People who create an account or subscribe
- Members who access practice drops and downloads

It does not apply to third-party websites you reach through links (for example Lemon Squeezy checkout). Those services have their own privacy policies.

---

## 2. Information we collect

We may collect:

**Account and contact information**

- Email address (required for login and membership)
- Name, if you provide it
- Country or region, if you provide it or we infer it from checkout

**Subscription and billing-related information**

- Subscription status, plan type, and billing period dates
- Lemon Squeezy customer and subscription identifiers
- Payment outcome (for example paid, failed, refunded) — **we do not receive or store your full card number**

Card and payment details are collected and processed by **Lemon Squeezy** as merchant of record where applicable to the checkout. We do not store your card details on Basscally systems.

**Usage and content access**

- Which drops you open, play, or download
- Login times and basic session information
- Technical logs (IP address, browser type, device information) used for security and troubleshooting

**Communications**

- Emails we send you (for example welcome, membership, or service messages)
- Messages you send to **basscally.enquiry@gmail.com**

**Optional information**

- Information you choose to give us in support emails or feedback

We do not knowingly collect personal information from anyone under 16. See section 9.

---

## 3. How we use your information

We use personal information to:

- Provide and operate the Service (account, login, member area, audio access)
- Process and manage your membership through Lemon Squeezy and our systems
- Send transactional emails (for example login links, membership confirmations, important service notices)
- Protect the Service, prevent abuse, and enforce our Terms
- Improve the Service and fix technical problems
- Comply with law and respond to lawful requests

**Lawful bases (UK GDPR)**

We rely on one or more of the following, depending on the activity:

- **Contract** — to provide the membership you signed up for
- **Legitimate interests** — to run, secure, and improve the Service (balanced against your rights)
- **Legal obligation** — where we must keep or disclose records
- **Consent** — where we ask for it clearly (for example optional marketing, if we offer it separately)

You can contact us to understand which basis applies to a specific use.

---

## 4. Who we share information with

We share personal information only as needed to run the Service, including with:

| Recipient | Role |
| --- | --- |
| **Lemon Squeezy** | Checkout, subscriptions, payments, refunds, and customer billing portal (merchant of record where applicable) |
| **Supabase** | Authentication, database, and private file storage for member content |
| **Resend** (or similar email provider) | Sending transactional email |
| **Vercel** (or similar hosting provider) | Hosting the website and application |
| **Professional advisers** | Lawyers, accountants, or insurers when required |
| **Authorities** | If required by law or to protect rights and safety |

We do not sell your personal information.

Processors act on our instructions and must protect your data under contract.

---

## 5. International transfers

Some providers may process data outside the UK. Where that happens, we use appropriate safeguards (for example UK adequacy regulations or standard contractual clauses) as required by law.

---

## 6. How long we keep information

We keep personal information only as long as needed for the purposes above, including:

- **Account data** — while your account is active and for a reasonable period after closure (for example to resolve disputes or meet legal obligations)
- **Subscription records** — as required for tax, accounting, and payment disputes
- **Download and access logs** — for security and abuse prevention, typically for a limited retention period
- **Support emails** — as long as needed to handle your request and our records

We may anonymise or aggregate data for statistics where it no longer identifies you.

---

## 7. Cookies and similar technologies

We use essential cookies and similar technologies needed for the site to work (for example session and security).

If we use analytics that are not essential, we will describe them here and, where required, ask for your consent before they run.

You can control non-essential cookies through your browser settings and any cookie banner we provide.

---

## 8. Your rights

Under UK data protection law you may have the right to:

- Access a copy of your personal information
- Correct inaccurate information
- Delete information in certain cases
- Restrict or object to certain processing
- Data portability (where applicable)
- Withdraw consent (where processing is based on consent)
- Complain to the **Information Commissioner’s Office (ICO)** — [ico.org.uk](https://ico.org.uk)

To exercise your rights, email **basscally.enquiry@gmail.com**. We may need to verify your identity. We will respond within the time limits set by law.

---

## 9. Children and age

The Service is not intended for anyone under **16**.

You must be at least **16** to create an account. If you are **16 or 17**, you must have permission from a parent or legal guardian to subscribe.

If we learn we have collected personal information from someone under 16 without appropriate permission, we will delete it and may close the account.

---

## 10. Security

We use reasonable technical and organisational measures to protect personal information (for example access controls, encrypted connections, and private storage for member audio).

No online service is completely secure. Please use a strong, unique password for your email account and tell us if you suspect unauthorised access.

---

## 11. Links to other sites

Our site may link to Lemon Squeezy, social platforms, or other third parties. We are not responsible for their privacy practices.

---

## 12. Changes to this policy

We may update this Privacy Policy from time to time. We will post the new version on this page and update the “Last updated” date. For important changes, we may also email members or show a notice on the Service.

---

## 13. Contact us

**Basscally Ltd**  
Email: **basscally.enquiry@gmail.com**  
Registered in England & Wales, Company No. 16656420. Registered office address available on request.

---

# 2. Terms of Service

**Last updated:** 17 May 2026

These Terms of Service (“**Terms**”) are a contract between you and **Basscally Ltd** (company number **16656420**) for use of **Basscally Hub** (the “**Service**”).

By creating an account, subscribing, or using the Service, you agree to these Terms. If you do not agree, do not use the Service.

**Nothing in these Terms limits your statutory rights as a consumer under the laws of England and Wales.**

---

## 1. About the Service

Basscally Hub is a paid online membership that gives you access to digital bass practice content (for example audio drops, grooves, and related materials) through our website.

We aim to publish **regular practice drops** on an **intended release schedule**. The schedule may change for operational, creative, or technical reasons. We do not guarantee a fixed number of releases per week or month.

Content is for **personal practice and learning**. It is not a formal music qualification, employment training, or guaranteed results programme.

---

## 2. Eligibility

You must be at least **16** years old to use the Service.

If you are **16 or 17**, you confirm that a parent or legal guardian has given permission for you to subscribe and that they have read these Terms on your behalf.

You must provide accurate information and keep your account secure. You are responsible for activity on your account unless you tell us promptly that it was compromised.

The Service is not intended for users under 16.

---

## 3. Accounts and access

- Access is provided through a **magic link** or other sign-in method we support, tied to your email address.
- Membership access depends on an **active, paid subscription** (or other access we expressly grant).
- You must not share login details or broadly redistribute member content in ways that breach section 7.
- We may suspend or close accounts that break these Terms or abuse the Service.

---

## 4. Subscriptions and payments

**Plans and pricing** are shown on our pricing page at the time you subscribe. Prices include applicable taxes where Lemon Squeezy collects them as merchant of record.

**Payment processing**

- Subscriptions are sold and billed through **Lemon Squeezy**, which acts as **merchant of record** where applicable to the checkout.
- **Basscally does not store your card details.** Payment details are handled by Lemon Squeezy under their terms and privacy policy.
- By subscribing, you authorise recurring charges according to your plan (for example monthly or annual) until you cancel.

**Renewals**

- Subscriptions renew automatically at the end of each billing period unless you cancel before renewal.
- Failed payments may lead to restricted access or cancellation after any grace period we or Lemon Squeezy apply.

**Changes to price or plans**

- We may change prices or plans for **new** subscribers. We will give reasonable notice before price changes affect **existing** subscribers where required by law or your plan terms.

---

## 5. Cancellation and end of access

You may cancel your subscription through the **Lemon Squeezy customer portal** or other cancellation method we link from your account.

**After you cancel:**

- You **keep access until the end of your current paid billing period** (unless we state otherwise at cancellation or the law requires different treatment).
- We do **not** provide **pro-rata refunds** for unused time in a billing period, except where **required by law** or where we agree in **good faith** in a specific case (see our Refund Policy).

When your paid period ends, member content and downloads will no longer be available unless you subscribe again.

---

## 6. Consumer information and digital content

If you are a consumer in the United Kingdom:

- You have statutory rights in relation to digital content and services. These Terms do not affect those rights.
- **Immediate access:** When you subscribe, you may get **immediate digital access** to member content. At checkout we will explain that this can affect your **right to cancel** under the Consumer Contracts Regulations 2013 and related rules — including that you may **lose the right to withdraw** once digital content is supplied with your agreement and acknowledgement, as explained at checkout and under applicable law.
- If content is faulty or not as described, you may have remedies under the Consumer Rights Act 2015. Contact **basscally.enquiry@gmail.com**.

---

## 7. Intellectual property and licence

**Our content**

- Basscally Ltd and its licensors own the Service, branding, and member content (including audio and artwork).
- Your subscription gives you a **personal, non-exclusive, non-transferable licence** to access and use member content **for your own private practice** while your subscription is active.
- You must **not**: copy, resell, publicly perform, broadcast, redistribute, or upload member content for others; use content in commercial releases without separate written permission; or remove copyright notices.

**Your content**

- If you send us feedback or ideas, you grant us a licence to use them to improve the Service without owing you compensation.

---

## 8. Acceptable use

You agree not to:

- Break the law or others’ rights
- Attempt to hack, scrape, or overload the Service
- Share accounts or downloads at scale
- Use the Service to harass, spam, or impersonate others
- Circumvent access controls or download limits

We may investigate abuse and cooperate with authorities where appropriate.

---

## 9. Availability and changes

We try to keep the Service available but do not guarantee uninterrupted access. Maintenance, outages, or third-party failures may occur.

We may change features, content formats, or the intended release schedule. We may discontinue the Service with reasonable notice where practicable; if we shut down paid access entirely, we will treat active subscribers fairly and in line with law and our Refund Policy.

---

## 10. Disclaimers

The Service is provided **“as is”** to the fullest extent permitted by law.

We do not promise specific musical progress, exam results, or fitness for a particular purpose beyond what consumer law requires.

---

## 11. Limitation of liability

**If you are a consumer:** Nothing in these Terms excludes or limits our liability for death or personal injury caused by negligence, fraud, or any other liability that cannot be excluded under UK law.

**Subject to that:**

- We are not liable for indirect or consequential losses (such as lost profits or lost data) except where the law requires otherwise.
- Our total liability to you for claims relating to the Service in any 12-month period is limited to the amount you paid us for the Service in that period, except where the law requires a higher amount.

---

## 12. Ending your account

We may suspend or terminate your account if you materially breach these Terms, abuse the Service, or if we must do so for legal reasons.

You may stop using the Service at any time and cancel your subscription as described in section 5.

Sections that by nature should survive (for example intellectual property, limitations, and governing law) will continue after termination.

---

## 13. Governing law and disputes

These Terms are governed by the laws of **England and Wales**.

If you are a consumer, you may bring claims in the courts of England and Wales, or in the courts of your country of residence where EU/UK consumer rules allow.

We hope to resolve complaints informally first — please email **basscally.enquiry@gmail.com**.

---

## 14. Other legal terms

- **Entire agreement:** These Terms, together with our Privacy Policy and Refund Policy, form the main agreement about the Service.
- **Severability:** If one part is invalid, the rest remains in effect.
- **No waiver:** Failing to enforce a right once does not waive it later.
- **Assignment:** We may transfer our rights and obligations to another company (for example in a business sale). You may not transfer your account without our consent.

---

## 15. Contact

**Basscally Ltd**  
Email: **basscally.enquiry@gmail.com**  
Registered in England & Wales, Company No. 16656420. Registered office address available on request.

---

# 3. Refund Policy

**Last updated:** 17 May 2026

This Refund Policy explains how refunds work for **Basscally Hub** subscriptions operated by **Basscally Ltd**.

**Payments and refunds are processed through Lemon Squeezy** (merchant of record where applicable to the checkout). Basscally does not store your card details.

**Nothing in this policy removes your statutory rights** under UK consumer law.

---

## 1. General approach

Basscally Hub is a **digital membership** with **immediate access** to online content after payment. Because of that:

- We generally **do not offer pro-rata refunds** for unused days or weeks in a billing period if you cancel mid-period.
- When you **cancel**, you **keep access until the end of the current paid period** you have already been charged for, unless the law requires different treatment.

Refunds may still be available where **required by law**, where **Lemon Squeezy** approves a refund under its processes, or where we agree in **good faith** after reviewing your case.

---

## 2. Standard cancellations

If you cancel your subscription:

- Your subscription will not renew for the next period (subject to Lemon Squeezy and your plan settings).
- You will **not** normally receive a refund for the current billing period.
- You can continue using member content until **the end of the paid period**.

Manage cancellation through the **Lemon Squeezy customer portal** or the link we provide in your account area.

---

## 3. Statutory cancellation and cooling-off (UK consumers)

If you are a consumer in the United Kingdom, you may have a **14-day right to cancel** certain distance contracts.

For digital content and services:

- If you **agree to immediate access** at checkout and acknowledge that you may **lose your right to withdraw** once supply begins, your cancellation rights may be affected as explained on the checkout page and in our Terms of Service.
- If you have not agreed to immediate supply, or the law gives you a cancellation right, contact us within the cancellation period at **basscally.enquiry@gmail.com**.

If you cancel within a period where the law requires a refund, we will refund payments received (via Lemon Squeezy) within the time limits set by law.

---

## 4. Duplicate, erroneous, or unauthorised charges

If you believe you were charged:

- **Twice** for the same period,
- The **wrong amount**, or
- **Without authorisation**,

email **basscally.enquiry@gmail.com** with the email address on your account, the date, and any receipt reference from Lemon Squeezy.

We will review the charge with our payment records. **Where a duplicate or clear error is confirmed**, we will arrange a **refund through Lemon Squeezy** (or another appropriate remedy).

This does not replace your right to dispute a charge with your bank or card issuer.

---

## 5. Failed payments and access

If a payment fails:

- Lemon Squeezy or our systems may retry the payment or mark the subscription as past due.
- Access may be limited until payment succeeds or the subscription ends.
- Failed payment handling is described in our Terms of Service.

Refunds for failed or duplicate retry charges follow section 4.

---

## 6. Faulty digital content or service issues

If member content is **unavailable for a long period**, **not as described**, or **seriously defective**, contact us at **basscally.enquiry@gmail.com**.

We will investigate and, where appropriate:

- Restore access,
- Provide a fair extension, or
- Offer a **refund or partial refund** where required by the **Consumer Rights Act 2015** or other applicable law, or where we agree in good faith.

We do not offer refunds simply because you did not use the membership during a billing period.

---

## 7. Chargebacks

If you raise a chargeback with your bank, we may pause access while the dispute is investigated. Please contact us first so we can often resolve issues faster.

---

## 8. How refunds are paid

Approved refunds are processed **through Lemon Squeezy** to your original payment method where possible. Timing depends on your bank or card provider (often 5–10 business days after approval).

---

## 9. Changes to this policy

We may update this Refund Policy. The “Last updated” date will change when we do. Material changes for active members may be communicated by email or on the site where appropriate.

---

## 10. Contact

**Basscally Ltd**  
Email: **basscally.enquiry@gmail.com**  
Registered in England & Wales, Company No. 16656420. Registered office address available on request.

For payment receipts and subscription status, use the Lemon Squeezy customer portal linked from your account when available.

---

# Still requires solicitor review

> **Internal only — do not publish this section on `/privacy`, `/terms`, or `/refund-policy`.**

The public drafts above are written for clarity and implementation. A qualified solicitor should review and approve them before launch. Key judgement areas:

| Area | Why it needs review |
| --- | --- |
| **Lawful bases and privacy notice completeness** | Confirm each processing activity (downloads, logs, email types, admin access) is mapped to a valid UK GDPR lawful basis and described accurately for the ICO’s transparency expectations. |
| **International transfers** | Confirm current Supabase/Vercel/Resend/Lemon Squeezy data locations and whether UK IDTA, SCCs, or adequacy decisions are correctly referenced. |
| **Cookie / analytics stance** | Draft assumes only essential cookies until analytics ship; confirm PECR consent approach when Plausible/Umami or similar is enabled. |
| **Age 16 / parental permission** | Confirm 16+ with guardian permission for 16–17 is appropriate for contract formation and digital content rules (vs 18+ or different approach). |
| **Consumer Contracts Regulations — withdrawal** | Confirm checkout copy and flow match the immediate-supply / loss-of-withdrawal acknowledgement required for digital content. |
| **Consumer Rights Act — digital content quality** | Confirm remedies wording matches how content is actually delivered (streaming vs download, availability SLAs). |
| **Merchant of record vs platform** | Confirm Lemon Squeezy’s role, invoice issuer, VAT, and who handles payment disputes in all regions you sell to. |
| **Refund policy vs Lemon Squeezy settings** | Align policy with LS refund windows, subscription cancellation behaviour, and any founding/annual plan exceptions. |
| **Pro-rata and “good faith” refunds** | Define internally when good-faith refunds are offered so support and finance apply them consistently. |
| **Duplicate charge process** | Confirm operational workflow and time limits with Lemon Squeezy dashboards and webhooks. |
| **Email marketing** | If marketing emails are added beyond transactional, confirm consent, unsubscribe, and Privacy Policy updates. |
| **Data retention periods** | Replace “reasonable period” with specific retention schedules for logs, downloads, and closed accounts. |
| **Registered office disclosure** | Confirm “address available on request” satisfies Companies Act / consumer trader disclosure needs for your channels. |
| **Governing law and jurisdiction** | Confirm no conflict with Lemon Squeezy terms or customers outside England and Wales. |
| **Intellectual property / licence scope** | Confirm licence matches actual use (private practice, backups, offline downloads, DAW use). |
| **Founding pricing and promotional plans** | If `$1.50` or time-limited plans have special terms, ensure pricing page and Terms align. |
| **DPA and processor agreements** | Confirm DPAs are in place with Supabase, Resend, Vercel, and Lemon Squeezy where required. |

**Sign-off (fill when complete):**

| Document | Reviewed by | Date | Approved for production |
| --- | --- | --- | --- |
| Privacy Policy | | | |
| Terms of Service | | | |
| Refund Policy | | | |

---

## Implementation note

Implemented in `src/content/legal.ts` from sections 1–3 above. The internal “Still requires solicitor review” section is **docs only** — never import or render in the app. After counsel approval, sync changes here and in `src/content/legal.ts`; set `LEGAL_LAST_UPDATED` / `LEGAL_EFFECTIVE_DATE` to the approval date.
