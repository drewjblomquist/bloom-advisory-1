# User Stories

## 1) Public Visitor: Understand the value quickly

**Acceptance Criteria**

1. The landing page communicates what Bloom Advisors does in under 10 seconds.
2. Messaging reinforces Bloom Advisors' niche and differentiation for informed visitors.

## 2) Admin: Log in to admin dashboard

**Acceptance Criteria**

1. Verified admin is routed to the admin dashboard.
2. Unverified or unallowlisted user is denied.
3. Admin content changes reflect on the public site.

## 3) Public Visitor: Submit questionnaire without an account

**Acceptance Criteria**

1. Questionnaire is accessible without login.
2. Submissions are stored securely in Supabase.

## 4) Admin: Edit questionnaire questions (Deferred to V9)

**Acceptance Criteria**

1. Admins can add/remove/edit questions.
2. Changes reflect on the public questionnaire.
3. Prior submissions remain tied to the correct version.

## 5) Admin: View questionnaire submissions

**Acceptance Criteria**

1. Responses are viewable in a table/list.
2. Each response includes a timestamp and basic metadata.
3. Admin can sort/filter by key attributes.

## 6) Admin: Edit homepage content

**Acceptance Criteria**

1. Admins can update headings, descriptions, and CTA text.
2. Changes persist across refreshes and deployments.
3. Only authenticated and allowlisted admins can access controls.

## 7) Public Visitor: Understand what happens after submission

**Acceptance Criteria**

1. A clear confirmation message appears after submission.
2. The site explains next steps.
3. The site explains how data will be used at a high level.

## 8) Admin: Basic analytics

**Acceptance Criteria**

1. Admins can see high-level metrics.
2. Data is displayed in a simple, readable format.
3. No unnecessary exposure of PII.

## 9) Public Visitor: Trust the site

**Acceptance Criteria**

1. Site loads quickly on desktop and mobile.
2. Branding and layout are consistent.
3. No broken links or placeholder content.
