# Security Incident Response Policy

**RegardsKim — Vitality Industries**
**Last updated:** April 7, 2026

---

## 1. Purpose

This policy defines how RegardsKim identifies, responds to, and recovers from security incidents that may affect merchant data, customer data, or service availability.

## 2. Scope

This policy covers all systems involved in operating RegardsKim, including:

- Application backend (Railway)
- Database (PostgreSQL)
- Email processing pipeline (Gmail API)
- AI processing services (OpenAI, Anthropic)
- Dashboard and website (Vercel)
- Development and operations infrastructure

## 3. Definitions

- **Security incident:** Any event that compromises the confidentiality, integrity, or availability of data or systems. Examples include unauthorized access, data breaches, service compromise, credential exposure, or malicious activity.
- **Personal data:** Any data that can identify a customer or merchant, including names, email addresses, order details, and shipping information.

## 4. Incident Severity Levels

| Level | Description | Example |
|-------|-------------|---------|
| **Critical** | Confirmed data breach or unauthorized access to personal data | Database credentials exposed, customer data exfiltrated |
| **High** | Active exploitation or imminent risk of data exposure | Unauthorized API access detected, suspicious admin login |
| **Medium** | Potential vulnerability identified, no confirmed exploitation | Dependency vulnerability disclosed, misconfigured access control |
| **Low** | Minor issue with no direct data risk | Failed login attempts, non-sensitive logging error |

## 5. Response Process

### 5.1 Detection and Identification

- Monitor application logs, error rates, and access patterns
- Review alerts from UptimeRobot and internal health checks
- Investigate reports from merchants, Shopify, or third parties

### 5.2 Containment (within 1 hour of detection for Critical/High)

- Revoke compromised credentials immediately
- Rotate API keys and access tokens as needed
- Disable affected services or endpoints if necessary
- Isolate compromised systems from production

### 5.3 Assessment

- Determine what data was affected and how many merchants/customers are impacted
- Identify the root cause and attack vector
- Document the timeline of events

### 5.4 Notification

- **Shopify:** Notify within 24 hours of confirming a breach involving merchant or customer data, per the Shopify Partner Program Agreement
- **Affected merchants:** Notify within 48 hours with details of what happened, what data was involved, and what actions we're taking
- **Authorities:** Notify relevant data protection authorities within 72 hours where required by law (e.g., GDPR, Australian Privacy Act)

### 5.5 Remediation

- Fix the root cause
- Deploy patches or configuration changes
- Verify the fix resolves the vulnerability
- Restore any affected services

### 5.6 Post-Incident Review

- Conduct a review within 7 days of resolution
- Document lessons learned and preventive measures
- Update security controls, monitoring, or policies as needed
- Retain incident records for at least 2 years

## 6. Roles and Responsibilities

| Role | Responsibility |
|------|---------------|
| **Incident Lead** (Matt Hanks) | Overall decision-making, external communications, notification to Shopify and merchants |
| **Technical Response** | Containment, investigation, remediation, system recovery |

## 7. Data Breach Specifics

If personal data is confirmed to be compromised:

1. Immediately stop any ongoing unauthorized access
2. Preserve evidence and logs for investigation
3. Assess the scope: which merchants, which customers, what data
4. Notify Shopify, affected merchants, and authorities per the timelines above
5. Offer affected parties information about what steps they can take
6. Implement measures to prevent recurrence

## 8. Contact

For security concerns or to report a vulnerability:

- **Email:** info@vitalityindustries.co
- **Website:** https://regardskim.com

## 9. Policy Review

This policy is reviewed and updated at least annually, or after any significant security incident.

---

*Vitality Industries — ABN pending*
