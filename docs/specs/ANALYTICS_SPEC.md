# Analytics: GA4 & GTM Integration

## Purpose

Implement a robust analytics layer to track user behavior across the Bloom Advisors marketing site and questionnaire flow. Analytics must support:

- Measuring acquisition (traffic sources, campaigns, search visibility).
- Understanding funnel performance (landing → questionnaire start → questionnaire completion).
- Supporting experimentation, page optimization, and lead-quality insights.
- Providing scalable infrastructure reusable for future client work (e.g., real estate, construction, SMB clients).

The analytics implementation must be **modular, privacy-compliant, and free**.

Primary Stack: **Google Analytics 4 (GA4) + Google Tag Manager (GTM)**.

## Scope

### Included

- GA4 property setup (Web)
- GTM container setup (Web)
- Client-side script injection via Next.js layout
- Automatic page-view tracking for App Router
- Custom event tracking for key user interactions
- UTM attribution tracking
- Cookie-less fallback behavior (if consent required in future)
- Data verification and debugging configuration
- Documentation for future clients

### Not Included

- Heatmaps (Hotjar, FullStory)
- Product analytics (PostHog/Mixpanel)
- Server-side tagging or BigQuery export (future iteration)

## Technical Architecture

### Overview

```
Client Browser → GTM Script → GA4 Measurement Protocol → Google Analytics Dashboard
```

### Components

- **GTM Container** (`GTM-XXXXXXX`):
    
    Controls all analytics logic, events, triggers.
    
- **GA4 Property** (`G-XXXXXXX`):
    
    Receives events from GTM.
    
- **Next.js Integration**:
    
    Script tag injection in `app/layout.tsx` using `<Script strategy="afterInteractive">`.
    
- **Event Dispatcher**:
    
    Custom JS event pushes to `dataLayer`.
    

## Data Layer & Event Model

### Page View Tracking

Analytics must capture a page_view event on:

- Initial load
- Client-side route changes (Next.js App Router)

**Acceptance Criteria**

- Page view URL includes pathname + search params
- `page_title`, `page_location`, and `page_referrer` populated

### Event Naming Convention

Follow GA4 recommended conventions:

```
action_object_context
Examples:
- questionnaire_started
- questionnaire_completed
- cta_clicked
- contact_form_submitted
- nav_link_clicked
```

All events must contain:

| Field | Required | Example |
| --- | --- | --- |
| `event_name` | Yes | `"questionnaire_completed"` |
| `page_path` | Yes | `"/questionnaire"` |
| `engagement_time_msec` | Auto | — |
| `utm_*` fields | Auto | `utm_source=linkedin` |
| `custom_properties` | If applicable | `{ plan: "pro" }` |

### Required Events

#### Marketing Funnel

| Event | Trigger | Notes |
| --- | --- | --- |
| `page_view` | every route load | auto via GTM |
| `cta_clicked` | click on "Get Started", "Contact", hero buttons | button selectors must be stable |
| `contact_form_submitted` | successful submit | input values not collected, only metadata |

#### Questionnaire Funnel

| Event | Trigger | Notes |
| --- | --- | --- |
| `questionnaire_started` | first input interaction | ensures real engagement |
| `questionnaire_completed` | submission to backend | no PII or lead identifiers |
| `admin_login_success` | admin login completes | non-PII |

### Optional (Future)

- `questionnaire_progress`
- `questionnaire_abandoned`
- `scroll_depth`

## Implementation Requirements

### Next.js Script Injection

Add GTM snippet in `app/layout.tsx`:

- Use `<Script strategy="afterInteractive">`
- Add `<noscript>` fallback `<iframe>`
- Must not block render or degrade Lighthouse score

### SPA Route Change Tracking

Implement route change listener using App Router:

- Use `usePathname()` + `useSearchParams()`
- Push to `dataLayer`:
    
    ```
    dataLayer.push({
      event: "page_view",
      page_path: url
    })
    
    ```
    

### Event Push Implementation

Frontend must include a reusable function:

```tsx
export function track(event: string, params: Record<string, any> = {}) {
  window.dataLayer?.push({
    event,
    ...params,
  });
}
```

## Privacy and Compliance

### Cookie Consent (Future-Optional)

System must be architected to handle:

- A cookie banner
- Consent mode v2 compatibility
- No PII capture (email, name, phone)

Current iteration: **No PII is logged**, so consent is not required under US norms.

### Data Retention

Use GA4 default retention:

- 2 months (free tier default)
- Extend to 14 months if available

## Environments

### Development

- GTM preview mode enabled
- DebugView in GA4 active
- Use a *separate* GA4 stream or debug-only stream

### Production

- Production GTM container
- All test events disabled or filtered
- Accurate UTM tracking for campaigns

## KPIs & Success Criteria

### Core KPIs

- Website traffic trends (week-over-week)
- Click-through rate on CTAs
- Questionnaire start → completion rate
- Conversion rate (lead form submissions)
- Bounce rate and scroll engagement

### Technical Success Criteria

- 100% of route changes generate a valid page_view
- All key events appear in GA4 DebugView
- No duplicate events on refresh or back button
- No console errors from analytics scripts
- Lighthouse performance score remains ≥ 90

## Future Iterations (Not in V1 build)

- Server-side tagging for accuracy
- BigQuery export for AI-driven lead scoring
- PostHog integration for product analytics (admin portal)

## Outside of Code base Work

1. Go to **analytics.google.com** → create a **GA4 property** for `bloomadvisors.com` (or whatever domain).
2. Note your **Measurement ID**: looks like `G-XXXXXXX`.
3. Go to **tagmanager.google.com** → create a **web container** for that same domain.
4. In GTM, add a **GA4 Configuration tag** with your Measurement ID and trigger it on **All Pages**.
