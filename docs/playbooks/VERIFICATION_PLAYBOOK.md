# Verification Playbook

## Intent

Confirm outcomes, not just implementation.

## Required Checks

- Verify production behavior
- Confirm data writes and read restrictions
- Confirm auth/authorization boundaries

## Environment Checks

- Production domain resolves to HTTPS
- Preview uses dev Supabase project

## Data Checks

- Submissions write successfully
- Public reads are blocked

## Security Checks

- Admin routes protected
- Logs exclude PII

## Done Criteria

All checks pass for the current iteration scope.
