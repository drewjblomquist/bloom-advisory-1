# Security and Privacy

## Purpose & Design Principles

The purpose of this section is to define **explicit security and privacy constraints** for the Bloom Advisors website to ensure:

- Protection of administrative access
- Responsible handling of user-submitted data
- Clear separation between analytics and business data
- A privacy-first posture aligned with Bloom Advisors' trust-based consulting model

This system is intentionally designed to be **lightweight but best-practice**, avoiding unnecessary enterprise complexity while minimizing realistic risks and preventing accidental data exposure.

**Core principles:**

- Least privilege by default
- Explicit access boundaries
- Privacy-first data handling
- Minimize assumptions by developers and tools

## Roles & Access Model

### User Roles

The system supports the following roles in V1:

#### Public Users

- No authentication required
- Can:
    - View public website content
    - Submit questionnaire responses
- Cannot:
    - Read existing submissions
    - Modify any stored data
    - Access admin functionality

#### Admin User (Single Admin, V1)

- Authenticated via email-based authentication
- Only one admin is expected in V1
- Admin is the site owner (Bloom Advisors)

## Authentication

- Admin authentication is required **only** when accessing the admin interface
- Authentication is not required for any public-facing pages
- Authentication must:
    - Verify identity via email
    - Restrict access to admin-only routes and actions
- No public user accounts are supported in V1

**Assumption:**

If an admin account is compromised, the maximum possible damage is modification of website content and admin-managed data. No payment systems or sensitive personal data are exposed.

## Authorization & Permissions

Authorization must be **explicitly enforced at the database and API level**, not only in the frontend UI.

### Public Permissions

- Public users may:
    - Insert new questionnaire responses
- Public users may not:
    - Read questionnaire responses
    - Update or delete any records
    - Access admin-only tables or fields

### Admin Permissions

- Admin may:
    - Read all questionnaire submissions
    - Update and delete submissions
    - Modify website content controlled via the database
- Admin permissions must not be granted implicitly
- Authorization must assume that users may bypass the UI and attempt direct access

## Data Classification & Sensitivity

### User-Submitted Data

- Questionnaire responses are considered **low sensitivity**
- Data may include:
    - Business pain points
    - Automation interests
    - Optional contact information

Despite low sensitivity, this data is treated as **private business context** and is not publicly accessible.

### Analytics Data

- Analytics data is considered anonymous and aggregated
- No analytics data is stored in the application database

## Data Storage & Separation

### Primary Data Store

- User-submitted data is stored in Supabase
- Supabase is the system of record for:
    - Questionnaire responses
    - Admin-managed content

### Analytics

- Google Analytics is used for:
    - Page views
    - Session behavior
    - Conversion tracking
- Analytics data is:
    - Fully separated from Supabase
    - Not joined with user-submitted data
    - Not used to identify individual users

## Secrets & Configuration Management

- All secrets (API keys, service tokens, credentials) must:
    - Be stored in environment variables
    - Never be committed to source control
    - Never be exposed client-side unless explicitly required
- Frontend code must assume it is publicly visible
- Backend-only keys must never be accessible from the client

## Data Lifecycle & Retention

- Data is retained indefinitely by default in V1
- Only the admin may:
    - Delete individual questionnaire submissions
    - Delete groups of submissions manually
- Public users do not have self-service deletion in V1
- Data deletion is considered a **privileged admin action**

Backups and exports are acknowledged as existing but are not user-facing in V1.

## Logging & Visibility

The system should provide **basic operational visibility**, including:

- Authentication attempts (success/failure)
- Admin access events
- Unexpected or failed data operations

Advanced monitoring is not required in V1, but the system should allow the admin to reasonably detect abnormal behavior.

## Privacy & Transparency

Bloom Advisors operates under **privacy-first principles**:

- Data is collected only for clearly defined business purposes
- Data is never sold or shared externally
- Aggregated or anonymized insights may be reused internally (e.g., case studies, thought leadership)
- Public-facing forms should clearly communicate:
    - What data is collected
    - Why it is collected
    - How it will be used

A lightweight privacy policy or disclosure is expected.

## Incident Response & Risk Assumptions

Formal incident response automation is not required in V1.

However, the system must support:

- Immediate revocation of admin access
- Rotation of credentials and secrets
- Manual investigation and remediation by the admin

See `docs/playbooks/INCIDENT_RESPONSE.md`.

Security design assumes:

- Human error is more likely than malicious attack
- Damage should be minimized when failures occur

## Out of Scope (V1)

The following are explicitly out of scope for V1:

- Multiple admin roles
- Role-based permissions beyond admin/public
- Regulatory compliance frameworks (SOC 2, HIPAA, PCI)
- End-user authentication
- Automated data deletion workflows

## Abuse Prevention & Anti-Spam Controls

### Purpose

The system must protect public-facing endpoints from automated abuse, spam submissions, and excessive usage that could degrade data quality, system reliability, or administrative workflows.

Abuse prevention is treated as a **core security concern**, not an optional enhancement.

### Scope (V1)

Anti-spam and abuse controls apply to:

- Public questionnaire submissions
- Contact form submissions
- Any future public-facing forms or write-enabled endpoints

Admin-only endpoints are not subject to public abuse controls.

### Threat Model

The system assumes:

- Public endpoints will be discovered
- Automated submissions are likely
- Abuse may occur without malicious intent (bots, scripts, scanners)

The goal is to **limit impact**, not eliminate all abuse.

### V1 Controls (Lightweight, Intentional)

In V1, the system must support **basic abuse mitigation**, including:

- Rate limiting or submission throttling per client/session
- Bot detection mechanisms (e.g. CAPTCHA or equivalent)
- Server-side validation of inputs
- Rejection of malformed or suspicious submissions

These controls must be enforced server-side and not rely solely on frontend UI restrictions.

### Data Integrity Considerations

- Spam or invalid submissions must not pollute analytics or case study data
- The admin should be able to:
    - Identify suspicious submissions
    - Delete abusive entries manually

Automated spam classification is not required in V1.

### Privacy Alignment

Abuse prevention mechanisms must:

- Avoid collecting unnecessary personal data
- Prefer anonymous or behavioral signals over identity-based tracking
- Align with Bloom Advisors' privacy-first principles

### Out of Scope (V1)

- Advanced spam scoring or ML-based detection
- User-level reputation systems
- Automated blocking or banning workflows
- Real-time alerting

These may be considered in later iterations.
