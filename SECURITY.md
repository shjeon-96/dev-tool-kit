# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability in Web Toolkit, please report it responsibly.

### How to Report

1. **DO NOT** open a public GitHub issue for security vulnerabilities
2. Email us at: **security@web-toolkit.app** (or create a private security advisory)
3. Include as much detail as possible:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### What to Expect

- **Acknowledgment**: We will acknowledge receipt within 48 hours
- **Initial Assessment**: We will provide an initial assessment within 7 days
- **Resolution Timeline**: Critical issues will be addressed within 30 days
- **Credit**: We will credit you in our security advisories (unless you prefer anonymity)

### Scope

The following are in scope for security reports:

- **Web Application** (https://web-toolkit.app)
- **Source Code** in this repository
- **Dependencies** with known vulnerabilities affecting our usage

### Out of Scope

- Issues in third-party dependencies without demonstrated impact
- Social engineering attacks
- Denial of service attacks
- Issues requiring physical access

## Security Design

Web Toolkit is designed with security as a core principle:

### Client-Side Processing

- **All data processing happens in your browser**
- No user data is sent to our servers
- No data logging or collection
- Works completely offline as a PWA

### Data Privacy

- No cookies for tracking
- No analytics on user data content
- Optional Magic Share uses encrypted, temporary storage

### Dependencies

- Regular dependency audits via `npm audit`
- Automated security updates via Dependabot
- Minimal server-side dependencies

## Security Best Practices for Contributors

1. Never commit secrets, API keys, or credentials
2. Use environment variables for sensitive configuration
3. Follow secure coding practices
4. Keep dependencies updated
5. Run `npm audit` before submitting PRs

---

Thank you for helping keep Web Toolkit secure!
