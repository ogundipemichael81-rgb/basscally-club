/**
 * Public legal copy for /privacy, /terms, /refund-policy.
 * Source: docs/legal-public-content-draft.md (public sections only).
 */

export const LEGAL_SUPPORT_EMAIL = "basscally.enquiry@gmail.com";
export const LEGAL_COMPANY_NAME = "Basscally Ltd";
export const LEGAL_COMPANY_NUMBER = "16656420";
export const LEGAL_ADDRESS_LINE =
  "Registered in England & Wales, Company No. 16656420. Registered office address available on request.";
export const LEGAL_LAST_UPDATED = "17 May 2026";
export const LEGAL_EFFECTIVE_DATE = "17 May 2026";

export type LegalBlock =
  | { type: "paragraph"; text: string }
  | { type: "subheading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; headers: [string, string]; rows: [string, string][] };

export type LegalSection = {
  id: string;
  title: string;
  blocks: LegalBlock[];
};

export type LegalDocument = {
  slug: "privacy" | "terms" | "refund-policy";
  title: string;
  metaTitle: string;
  metaDescription: string;
  lastUpdated: string;
  effectiveDate: string;
  intro: LegalBlock[];
  sections: LegalSection[];
};

export const privacyPolicy: LegalDocument = {
  slug: "privacy",
  title: "Privacy Policy",
  metaTitle: "Privacy Policy — Basscally Hub",
  metaDescription:
    "How Basscally Ltd collects, uses, and protects your personal information when you use Basscally Hub.",
  lastUpdated: LEGAL_LAST_UPDATED,
  effectiveDate: LEGAL_EFFECTIVE_DATE,
  intro: [
    {
      type: "paragraph",
      text: `This Privacy Policy explains how **${LEGAL_COMPANY_NAME}** (“**Basscally**”, “**we**”, “**us**”) collects and uses personal information when you use **Basscally Hub** (the “**Service**”) — our membership website for bass practice content.`,
    },
    {
      type: "paragraph",
      text: `We are the data controller for personal information described in this policy. If you have questions, contact us at **${LEGAL_SUPPORT_EMAIL}**.`,
    },
    {
      type: "paragraph",
      text: "Nothing in this policy is intended to reduce your rights under UK data protection law.",
    },
  ],
  sections: [
    {
      id: "who",
      title: "Who this policy applies to",
      blocks: [
        {
          type: "paragraph",
          text: "This policy applies to:",
        },
        {
          type: "list",
          items: [
            "Visitors to our website (including pricing and legal pages)",
            "People who create an account or subscribe",
            "Members who access practice drops and downloads",
          ],
        },
        {
          type: "paragraph",
          text: "It does not apply to third-party websites you reach through links (for example Lemon Squeezy checkout). Those services have their own privacy policies.",
        },
      ],
    },
    {
      id: "collect",
      title: "Information we collect",
      blocks: [
        { type: "paragraph", text: "We may collect:" },
        { type: "subheading", text: "Account and contact information" },
        {
          type: "list",
          items: [
            "Email address (required for login and membership)",
            "Name, if you provide it",
            "Country or region, if you provide it or we infer it from checkout",
          ],
        },
        { type: "subheading", text: "Subscription and billing-related information" },
        {
          type: "list",
          items: [
            "Subscription status, plan type, and billing period dates",
            "Lemon Squeezy customer and subscription identifiers",
            "Payment outcome (for example paid, failed, refunded) — we do not receive or store your full card number",
          ],
        },
        {
          type: "paragraph",
          text: "Card and payment details are collected and processed by **Lemon Squeezy** as merchant of record where applicable to the checkout. We do not store your card details on Basscally systems.",
        },
        { type: "subheading", text: "Usage and content access" },
        {
          type: "list",
          items: [
            "Which drops you open, play, or download",
            "Login times and basic session information",
            "Technical logs (IP address, browser type, device information) used for security and troubleshooting",
          ],
        },
        { type: "subheading", text: "Communications" },
        {
          type: "list",
          items: [
            "Emails we send you (for example welcome, membership, or service messages)",
            `Messages you send to **${LEGAL_SUPPORT_EMAIL}**`,
          ],
        },
        { type: "subheading", text: "Optional information" },
        {
          type: "list",
          items: ["Information you choose to give us in support emails or feedback"],
        },
        {
          type: "paragraph",
          text: "We do not knowingly collect personal information from anyone under 16. See the Children and age section.",
        },
      ],
    },
    {
      id: "use",
      title: "How we use your information",
      blocks: [
        {
          type: "paragraph",
          text: "We use personal information to:",
        },
        {
          type: "list",
          items: [
            "Provide and operate the Service (account, login, member area, audio access)",
            "Process and manage your membership through Lemon Squeezy and our systems",
            "Send transactional emails (for example login links, membership confirmations, important service notices)",
            "Protect the Service, prevent abuse, and enforce our Terms",
            "Improve the Service and fix technical problems",
            "Comply with law and respond to lawful requests",
          ],
        },
        { type: "subheading", text: "Lawful bases (UK GDPR)" },
        {
          type: "paragraph",
          text: "We rely on one or more of the following, depending on the activity:",
        },
        {
          type: "list",
          items: [
            "**Contract** — to provide the membership you signed up for",
            "**Legitimate interests** — to run, secure, and improve the Service (balanced against your rights)",
            "**Legal obligation** — where we must keep or disclose records",
            "**Consent** — where we ask for it clearly (for example optional marketing, if we offer it separately)",
          ],
        },
        {
          type: "paragraph",
          text: "You can contact us to understand which basis applies to a specific use.",
        },
      ],
    },
    {
      id: "share",
      title: "Who we share information with",
      blocks: [
        {
          type: "paragraph",
          text: "We share personal information only as needed to run the Service, including with:",
        },
        {
          type: "table",
          headers: ["Recipient", "Role"],
          rows: [
            [
              "Lemon Squeezy",
              "Checkout, subscriptions, payments, refunds, and customer billing portal (merchant of record where applicable)",
            ],
            ["Supabase", "Authentication, database, and private file storage for member content"],
            ["Resend (or similar email provider)", "Sending transactional email"],
            ["Vercel (or similar hosting provider)", "Hosting the website and application"],
            ["Professional advisers", "Lawyers, accountants, or insurers when required"],
            ["Authorities", "If required by law or to protect rights and safety"],
          ],
        },
        { type: "paragraph", text: "We do not sell your personal information." },
        {
          type: "paragraph",
          text: "Processors act on our instructions and must protect your data under contract.",
        },
      ],
    },
    {
      id: "transfers",
      title: "International transfers",
      blocks: [
        {
          type: "paragraph",
          text: "Some providers may process data outside the UK. Where that happens, we use appropriate safeguards (for example UK adequacy regulations or standard contractual clauses) as required by law.",
        },
      ],
    },
    {
      id: "retention",
      title: "How long we keep information",
      blocks: [
        {
          type: "paragraph",
          text: "We keep personal information only as long as needed for the purposes above, including:",
        },
        {
          type: "list",
          items: [
            "**Account data** — while your account is active and for a reasonable period after closure (for example to resolve disputes or meet legal obligations)",
            "**Subscription records** — as required for tax, accounting, and payment disputes",
            "**Download and access logs** — for security and abuse prevention, typically for a limited retention period",
            "**Support emails** — as long as needed to handle your request and our records",
          ],
        },
        {
          type: "paragraph",
          text: "We may anonymise or aggregate data for statistics where it no longer identifies you.",
        },
      ],
    },
    {
      id: "cookies",
      title: "Cookies and similar technologies",
      blocks: [
        {
          type: "paragraph",
          text: "We use essential cookies and similar technologies needed for the site to work (for example session and security).",
        },
        {
          type: "paragraph",
          text: "If we use analytics that are not essential, we will describe them here and, where required, ask for your consent before they run.",
        },
        {
          type: "paragraph",
          text: "You can control non-essential cookies through your browser settings and any cookie banner we provide.",
        },
      ],
    },
    {
      id: "rights",
      title: "Your rights",
      blocks: [
        {
          type: "paragraph",
          text: "Under UK data protection law you may have the right to:",
        },
        {
          type: "list",
          items: [
            "Access a copy of your personal information",
            "Correct inaccurate information",
            "Delete information in certain cases",
            "Restrict or object to certain processing",
            "Data portability (where applicable)",
            "Withdraw consent (where processing is based on consent)",
            "Complain to the **Information Commissioner’s Office (ICO)** — https://ico.org.uk",
          ],
        },
        {
          type: "paragraph",
          text: `To exercise your rights, email **${LEGAL_SUPPORT_EMAIL}**. We may need to verify your identity. We will respond within the time limits set by law.`,
        },
      ],
    },
    {
      id: "children",
      title: "Children and age",
      blocks: [
        { type: "paragraph", text: "The Service is not intended for anyone under **16**." },
        {
          type: "paragraph",
          text: "You must be at least **16** to create an account. If you are **16 or 17**, you must have permission from a parent or legal guardian to subscribe.",
        },
        {
          type: "paragraph",
          text: "If we learn we have collected personal information from someone under 16 without appropriate permission, we will delete it and may close the account.",
        },
      ],
    },
    {
      id: "security",
      title: "Security",
      blocks: [
        {
          type: "paragraph",
          text: "We use reasonable technical and organisational measures to protect personal information (for example access controls, encrypted connections, and private storage for member audio).",
        },
        {
          type: "paragraph",
          text: "No online service is completely secure. Please use a strong, unique password for your email account and tell us if you suspect unauthorised access.",
        },
      ],
    },
    {
      id: "links",
      title: "Links to other sites",
      blocks: [
        {
          type: "paragraph",
          text: "Our site may link to Lemon Squeezy, social platforms, or other third parties. We are not responsible for their privacy practices.",
        },
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      blocks: [
        {
          type: "paragraph",
          text: 'We may update this Privacy Policy from time to time. We will post the new version on this page and update the "Last updated" date. For important changes, we may also email members or show a notice on the Service.',
        },
      ],
    },
    {
      id: "contact",
      title: "Contact us",
      blocks: [
        { type: "paragraph", text: `**${LEGAL_COMPANY_NAME}**` },
        { type: "paragraph", text: `Email: **${LEGAL_SUPPORT_EMAIL}**` },
        { type: "paragraph", text: LEGAL_ADDRESS_LINE },
      ],
    },
  ],
};

export const termsOfService: LegalDocument = {
  slug: "terms",
  title: "Terms of Service",
  metaTitle: "Terms of Service — Basscally Hub",
  metaDescription:
    "Terms for using Basscally Hub, including subscriptions, payments through Lemon Squeezy, and member access.",
  lastUpdated: LEGAL_LAST_UPDATED,
  effectiveDate: LEGAL_EFFECTIVE_DATE,
  intro: [
    {
      type: "paragraph",
      text: `These Terms of Service (“**Terms**”) are a contract between you and **${LEGAL_COMPANY_NAME}** (company number **${LEGAL_COMPANY_NUMBER}**) for use of **Basscally Hub** (the “**Service**”).`,
    },
    {
      type: "paragraph",
      text: "By creating an account, subscribing, or using the Service, you agree to these Terms. If you do not agree, do not use the Service.",
    },
    {
      type: "paragraph",
      text: "**Nothing in these Terms limits your statutory rights as a consumer under the laws of England and Wales.**",
    },
  ],
  sections: [
    {
      id: "about",
      title: "About the Service",
      blocks: [
        {
          type: "paragraph",
          text: "Basscally Hub is a paid online membership that gives you access to digital bass practice content (for example audio drops, grooves, and related materials) through our website.",
        },
        {
          type: "paragraph",
          text: "We aim to publish **regular practice drops** on an **intended release schedule**. The schedule may change for operational, creative, or technical reasons. We do not guarantee a fixed number of releases per week or month.",
        },
        {
          type: "paragraph",
          text: "Content is for **personal practice and learning**. It is not a formal music qualification, employment training, or guaranteed results programme.",
        },
      ],
    },
    {
      id: "eligibility",
      title: "Eligibility",
      blocks: [
        { type: "paragraph", text: "You must be at least **16** years old to use the Service." },
        {
          type: "paragraph",
          text: "If you are **16 or 17**, you confirm that a parent or legal guardian has given permission for you to subscribe and that they have read these Terms on your behalf.",
        },
        {
          type: "paragraph",
          text: "You must provide accurate information and keep your account secure. You are responsible for activity on your account unless you tell us promptly that it was compromised.",
        },
        { type: "paragraph", text: "The Service is not intended for users under 16." },
      ],
    },
    {
      id: "accounts",
      title: "Accounts and access",
      blocks: [
        {
          type: "list",
          items: [
            "Access is provided through a **magic link** or other sign-in method we support, tied to your email address.",
            "Membership access depends on an **active, paid subscription** (or other access we expressly grant).",
            "You must not share login details or broadly redistribute member content in ways that breach the Intellectual property section.",
            "We may suspend or close accounts that break these Terms or abuse the Service.",
          ],
        },
      ],
    },
    {
      id: "payments",
      title: "Subscriptions and payments",
      blocks: [
        {
          type: "paragraph",
          text: "**Plans and pricing** are shown on our pricing page at the time you subscribe. Prices include applicable taxes where Lemon Squeezy collects them as merchant of record.",
        },
        { type: "subheading", text: "Payment processing" },
        {
          type: "list",
          items: [
            "Subscriptions are sold and billed through **Lemon Squeezy**, which acts as **merchant of record** where applicable to the checkout.",
            "**Basscally does not store your card details.** Payment details are handled by Lemon Squeezy under their terms and privacy policy.",
            "By subscribing, you authorise recurring charges according to your plan (for example monthly or annual) until you cancel.",
          ],
        },
        { type: "subheading", text: "Renewals" },
        {
          type: "list",
          items: [
            "Subscriptions renew automatically at the end of each billing period unless you cancel before renewal.",
            "Failed payments may lead to restricted access or cancellation after any grace period we or Lemon Squeezy apply.",
          ],
        },
        { type: "subheading", text: "Changes to price or plans" },
        {
          type: "paragraph",
          text: "We may change prices or plans for **new** subscribers. We will give reasonable notice before price changes affect **existing** subscribers where required by law or your plan terms.",
        },
      ],
    },
    {
      id: "cancellation",
      title: "Cancellation and end of access",
      blocks: [
        {
          type: "paragraph",
          text: "You may cancel your subscription through the **Lemon Squeezy customer portal** or other cancellation method we link from your account.",
        },
        { type: "subheading", text: "After you cancel" },
        {
          type: "list",
          items: [
            "You **keep access until the end of your current paid billing period** (unless we state otherwise at cancellation or the law requires different treatment).",
            "We do **not** provide **pro-rata refunds** for unused time in a billing period, except where **required by law** or where we agree in **good faith** in a specific case (see our Refund Policy).",
          ],
        },
        {
          type: "paragraph",
          text: "When your paid period ends, member content and downloads will no longer be available unless you subscribe again.",
        },
      ],
    },
    {
      id: "consumer",
      title: "Consumer information and digital content",
      blocks: [
        { type: "paragraph", text: "If you are a consumer in the United Kingdom:" },
        {
          type: "list",
          items: [
            "You have statutory rights in relation to digital content and services. These Terms do not affect those rights.",
            "**Immediate access:** When you subscribe, you may get **immediate digital access** to member content. At checkout we will explain that this can affect your **right to cancel** under the Consumer Contracts Regulations 2013 and related rules — including that you may **lose the right to withdraw** once digital content is supplied with your agreement and acknowledgement, as explained at checkout and under applicable law.",
            `If content is faulty or not as described, you may have remedies under the Consumer Rights Act 2015. Contact **${LEGAL_SUPPORT_EMAIL}**.`,
          ],
        },
      ],
    },
    {
      id: "ip",
      title: "Intellectual property and licence",
      blocks: [
        { type: "subheading", text: "Our content" },
        {
          type: "list",
          items: [
            "Basscally Ltd and its licensors own the Service, branding, and member content (including audio and artwork).",
            "Your subscription gives you a **personal, non-exclusive, non-transferable licence** to access and use member content **for your own private practice** while your subscription is active.",
            "You must **not**: copy, resell, publicly perform, broadcast, redistribute, or upload member content for others; use content in commercial releases without separate written permission; or remove copyright notices.",
          ],
        },
        { type: "subheading", text: "Your content" },
        {
          type: "paragraph",
          text: "If you send us feedback or ideas, you grant us a licence to use them to improve the Service without owing you compensation.",
        },
      ],
    },
    {
      id: "acceptable-use",
      title: "Acceptable use",
      blocks: [
        { type: "paragraph", text: "You agree not to:" },
        {
          type: "list",
          items: [
            "Break the law or others’ rights",
            "Attempt to hack, scrape, or overload the Service",
            "Share accounts or downloads at scale",
            "Use the Service to harass, spam, or impersonate others",
            "Circumvent access controls or download limits",
          ],
        },
        {
          type: "paragraph",
          text: "We may investigate abuse and cooperate with authorities where appropriate.",
        },
      ],
    },
    {
      id: "availability",
      title: "Availability and changes",
      blocks: [
        {
          type: "paragraph",
          text: "We try to keep the Service available but do not guarantee uninterrupted access. Maintenance, outages, or third-party failures may occur.",
        },
        {
          type: "paragraph",
          text: "We may change features, content formats, or the intended release schedule. We may discontinue the Service with reasonable notice where practicable; if we shut down paid access entirely, we will treat active subscribers fairly and in line with law and our Refund Policy.",
        },
      ],
    },
    {
      id: "disclaimers",
      title: "Disclaimers",
      blocks: [
        {
          type: "paragraph",
          text: 'The Service is provided **"as is"** to the fullest extent permitted by law.',
        },
        {
          type: "paragraph",
          text: "We do not promise specific musical progress, exam results, or fitness for a particular purpose beyond what consumer law requires.",
        },
      ],
    },
    {
      id: "liability",
      title: "Limitation of liability",
      blocks: [
        {
          type: "paragraph",
          text: "**If you are a consumer:** Nothing in these Terms excludes or limits our liability for death or personal injury caused by negligence, fraud, or any other liability that cannot be excluded under UK law.",
        },
        { type: "subheading", text: "Subject to that" },
        {
          type: "list",
          items: [
            "We are not liable for indirect or consequential losses (such as lost profits or lost data) except where the law requires otherwise.",
            "Our total liability to you for claims relating to the Service in any 12-month period is limited to the amount you paid us for the Service in that period, except where the law requires a higher amount.",
          ],
        },
      ],
    },
    {
      id: "ending",
      title: "Ending your account",
      blocks: [
        {
          type: "paragraph",
          text: "We may suspend or terminate your account if you materially breach these Terms, abuse the Service, or if we must do so for legal reasons.",
        },
        {
          type: "paragraph",
          text: "You may stop using the Service at any time and cancel your subscription as described in the Cancellation section.",
        },
        {
          type: "paragraph",
          text: "Sections that by nature should survive (for example intellectual property, limitations, and governing law) will continue after termination.",
        },
      ],
    },
    {
      id: "law",
      title: "Governing law and disputes",
      blocks: [
        {
          type: "paragraph",
          text: "These Terms are governed by the laws of **England and Wales**.",
        },
        {
          type: "paragraph",
          text: "If you are a consumer, you may bring claims in the courts of England and Wales, or in the courts of your country of residence where EU/UK consumer rules allow.",
        },
        {
          type: "paragraph",
          text: `We hope to resolve complaints informally first — please email **${LEGAL_SUPPORT_EMAIL}**.`,
        },
      ],
    },
    {
      id: "other",
      title: "Other legal terms",
      blocks: [
        {
          type: "list",
          items: [
            "**Entire agreement:** These Terms, together with our Privacy Policy and Refund Policy, form the main agreement about the Service.",
            "**Severability:** If one part is invalid, the rest remains in effect.",
            "**No waiver:** Failing to enforce a right once does not waive it later.",
            "**Assignment:** We may transfer our rights and obligations to another company (for example in a business sale). You may not transfer your account without our consent.",
          ],
        },
      ],
    },
    {
      id: "contact",
      title: "Contact",
      blocks: [
        { type: "paragraph", text: `**${LEGAL_COMPANY_NAME}**` },
        { type: "paragraph", text: `Email: **${LEGAL_SUPPORT_EMAIL}**` },
        { type: "paragraph", text: LEGAL_ADDRESS_LINE },
      ],
    },
  ],
};

export const refundPolicy: LegalDocument = {
  slug: "refund-policy",
  title: "Refund Policy",
  metaTitle: "Refund Policy — Basscally Hub",
  metaDescription:
    "How refunds and cancellations work for Basscally Hub subscriptions billed through Lemon Squeezy.",
  lastUpdated: LEGAL_LAST_UPDATED,
  effectiveDate: LEGAL_EFFECTIVE_DATE,
  intro: [
    {
      type: "paragraph",
      text: `This Refund Policy explains how refunds work for **Basscally Hub** subscriptions operated by **${LEGAL_COMPANY_NAME}**.`,
    },
    {
      type: "paragraph",
      text: "**Payments and refunds are processed through Lemon Squeezy** (merchant of record where applicable to the checkout). Basscally does not store your card details.",
    },
    {
      type: "paragraph",
      text: "**Nothing in this policy removes your statutory rights** under UK consumer law.",
    },
  ],
  sections: [
    {
      id: "general",
      title: "General approach",
      blocks: [
        {
          type: "paragraph",
          text: "Basscally Hub is a **digital membership** with **immediate access** to online content after payment. Because of that:",
        },
        {
          type: "list",
          items: [
            "We generally **do not offer pro-rata refunds** for unused days or weeks in a billing period if you cancel mid-period.",
            "When you **cancel**, you **keep access until the end of the current paid period** you have already been charged for, unless the law requires different treatment.",
          ],
        },
        {
          type: "paragraph",
          text: "Refunds may still be available where **required by law**, where **Lemon Squeezy** approves a refund under its processes, or where we agree in **good faith** after reviewing your case.",
        },
      ],
    },
    {
      id: "cancellations",
      title: "Standard cancellations",
      blocks: [
        { type: "paragraph", text: "If you cancel your subscription:" },
        {
          type: "list",
          items: [
            "Your subscription will not renew for the next period (subject to Lemon Squeezy and your plan settings).",
            "You will **not** normally receive a refund for the current billing period.",
            "You can continue using member content until **the end of the paid period**.",
          ],
        },
        {
          type: "paragraph",
          text: "Manage cancellation through the **Lemon Squeezy customer portal** or the link we provide in your account area.",
        },
      ],
    },
    {
      id: "cooling-off",
      title: "Statutory cancellation and cooling-off (UK consumers)",
      blocks: [
        {
          type: "paragraph",
          text: "If you are a consumer in the United Kingdom, you may have a **14-day right to cancel** certain distance contracts.",
        },
        { type: "subheading", text: "For digital content and services" },
        {
          type: "list",
          items: [
            "If you **agree to immediate access** at checkout and acknowledge that you may **lose your right to withdraw** once supply begins, your cancellation rights may be affected as explained on the checkout page and in our Terms of Service.",
            `If you have not agreed to immediate supply, or the law gives you a cancellation right, contact us within the cancellation period at **${LEGAL_SUPPORT_EMAIL}**.`,
          ],
        },
        {
          type: "paragraph",
          text: "If you cancel within a period where the law requires a refund, we will refund payments received (via Lemon Squeezy) within the time limits set by law.",
        },
      ],
    },
    {
      id: "duplicate-charges",
      title: "Duplicate, erroneous, or unauthorised charges",
      blocks: [
        { type: "paragraph", text: "If you believe you were charged:" },
        {
          type: "list",
          items: [
            "**Twice** for the same period",
            "The **wrong amount**",
            "**Without authorisation**",
          ],
        },
        {
          type: "paragraph",
          text: `Email **${LEGAL_SUPPORT_EMAIL}** with the email address on your account, the date, and any receipt reference from Lemon Squeezy.`,
        },
        {
          type: "paragraph",
          text: "We will review the charge with our payment records. **Where a duplicate or clear error is confirmed**, we will arrange a **refund through Lemon Squeezy** (or another appropriate remedy).",
        },
        {
          type: "paragraph",
          text: "This does not replace your right to dispute a charge with your bank or card issuer.",
        },
      ],
    },
    {
      id: "failed-payments",
      title: "Failed payments and access",
      blocks: [
        { type: "paragraph", text: "If a payment fails:" },
        {
          type: "list",
          items: [
            "Lemon Squeezy or our systems may retry the payment or mark the subscription as past due.",
            "Access may be limited until payment succeeds or the subscription ends.",
            "Failed payment handling is described in our Terms of Service.",
          ],
        },
        {
          type: "paragraph",
          text: "Refunds for failed or duplicate retry charges follow the Duplicate charges section.",
        },
      ],
    },
    {
      id: "faulty-content",
      title: "Faulty digital content or service issues",
      blocks: [
        {
          type: "paragraph",
          text: `If member content is **unavailable for a long period**, **not as described**, or **seriously defective**, contact us at **${LEGAL_SUPPORT_EMAIL}**.`,
        },
        { type: "paragraph", text: "We will investigate and, where appropriate:" },
        {
          type: "list",
          items: [
            "Restore access",
            "Provide a fair extension",
            "Offer a **refund or partial refund** where required by the **Consumer Rights Act 2015** or other applicable law, or where we agree in good faith",
          ],
        },
        {
          type: "paragraph",
          text: "We do not offer refunds simply because you did not use the membership during a billing period.",
        },
      ],
    },
    {
      id: "chargebacks",
      title: "Chargebacks",
      blocks: [
        {
          type: "paragraph",
          text: "If you raise a chargeback with your bank, we may pause access while the dispute is investigated. Please contact us first so we can often resolve issues faster.",
        },
      ],
    },
    {
      id: "how-paid",
      title: "How refunds are paid",
      blocks: [
        {
          type: "paragraph",
          text: "Approved refunds are processed **through Lemon Squeezy** to your original payment method where possible. Timing depends on your bank or card provider (often 5–10 business days after approval).",
        },
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      blocks: [
        {
          type: "paragraph",
          text: 'We may update this Refund Policy. The "Last updated" date will change when we do. Material changes for active members may be communicated by email or on the site where appropriate.',
        },
      ],
    },
    {
      id: "contact",
      title: "Contact",
      blocks: [
        { type: "paragraph", text: `**${LEGAL_COMPANY_NAME}**` },
        { type: "paragraph", text: `Email: **${LEGAL_SUPPORT_EMAIL}**` },
        { type: "paragraph", text: LEGAL_ADDRESS_LINE },
        {
          type: "paragraph",
          text: "For payment receipts and subscription status, use the Lemon Squeezy customer portal linked from your account when available.",
        },
      ],
    },
  ],
};

export const legalDocuments = {
  privacy: privacyPolicy,
  terms: termsOfService,
  refund: refundPolicy,
} as const;
