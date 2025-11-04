# Privacy Policy for How We Lookin - ESPN Cookie Helper

**Last Updated:** November 4, 2025

## Overview

The "How We Lookin - ESPN Cookie Helper" Chrome extension is designed to help users extract their ESPN Fantasy Football authentication cookies for use with the How We Lookin web application. We are committed to protecting your privacy and being transparent about our data practices.

**TL;DR:** This extension only reads ESPN cookies when you click a button. It doesn't send data anywhere, track you, or collect personal information.

## Data Collection

### What We Collect

This extension collects **only** the following data, and **only when you explicitly click the "Extract Cookies" button**:

- **ESPN_S2 Cookie:** Your ESPN session authentication cookie
- **SWID Cookie:** Your ESPN subscriber/user ID cookie

These cookies are:
- Read from `fantasy.espn.com` and `*.espn.com` domains only
- Displayed to you in the extension popup
- Stored temporarily in browser memory while the popup is open
- **NOT** sent to any external server
- **NOT** automatically transmitted anywhere

### What We Do NOT Collect

We explicitly do **NOT** collect:

- ❌ Browsing history
- ❌ Search queries
- ❌ Personal information (name, email, address, etc.)
- ❌ Passwords
- ❌ Payment information
- ❌ Data from any websites other than ESPN.com
- ❌ Analytics or usage statistics
- ❌ Device information
- ❌ Location data
- ❌ Any data from other browser tabs or windows

## How We Use Data

### Cookie Extraction Process

When you click **"Extract Cookies"**:

1. The extension requests your ESPN_S2 and SWID cookies from `fantasy.espn.com`
2. Chrome's API returns the cookie values (if they exist)
3. The extension displays them to you in the popup window
4. Cookie values are stored in JavaScript variables in browser memory
5. You can copy them to your clipboard using the copy buttons

### Data Storage

- **Cookies are NOT permanently stored** by this extension
- Cookie values exist only in browser memory while the popup is open
- When you close the popup, all cookie data is cleared from extension memory
- No data is saved to disk, localStorage, or chrome.storage
- No cookies are cached or persisted between sessions

### Data Transmission

- **This extension makes ZERO external network requests**
- **No data is sent to any server** (including our own)
- Cookie values remain entirely on your local machine
- The extension works completely offline (after installation)
- No analytics services are used
- No tracking pixels or beacons
- No third-party data sharing

## Data Sharing

We do **NOT** share your data with third parties because:

- We don't collect or store your data in the first place
- The extension works entirely within your local browser
- No analytics, advertising, or tracking services are integrated
- No backend servers or databases exist for this extension

**Your data never leaves your computer via this extension.**

## Your Control

You have complete control over your data:

### Revoke Access
- Uninstall the extension at any time via `chrome://extensions/`
- Remove the extension to completely eliminate any permissions

### Clear Cookies
- Log out of ESPN to invalidate the cookies
- Clear ESPN cookies via Chrome settings: `chrome://settings/cookies`
- ESPN cookies will naturally expire after ~2 years

### Review Permissions
- View extension permissions in Chrome: `chrome://extensions/` → Details
- The extension only requests `cookies` permission
- Host permissions are limited to `https://*.espn.com/*` only

### Inspect Source Code
- This extension is open-source
- Review the code on [GitHub](https://github.com/D-jAm/Espn_PrivateLeagueLinker_Extension)
- Verify there are no hidden data collection mechanisms

## Integration with How We Lookin Web App

### Manual Cookie Transfer

The extracted cookies are intended for use with the **How We Lookin** web application:

1. **You manually copy** cookies from this extension
2. **You manually paste** them into the How We Lookin website
3. How We Lookin uses them to access your ESPN league data on your behalf

**Important:** This extension does NOT automatically send cookies to How We Lookin. The transfer is entirely manual and under your control.

### How We Lookin's Privacy Practices

Once you paste cookies into How We Lookin:
- Refer to [How We Lookin's Privacy Policy](https://how-we-lookin.vercel.app/privacy) for how they handle cookies
- How We Lookin may store cookies on their servers to fetch your league data
- How We Lookin may make API requests to ESPN using your cookies
- This extension is not responsible for How We Lookin's data practices

## Security

We prioritize security in this extension:

### Minimal Permissions
- Only requests `cookies` permission (required for functionality)
- Host permissions limited to ESPN domains only
- No access to tabs, history, or other sensitive browser data

### No External Requests
- Extension makes zero network requests
- No data transmission to external servers
- No API calls to third-party services

### Open Source
- Code is publicly available on GitHub
- Community can audit for security issues
- Transparent development process

### Regular Updates
- Security updates published as needed
- Follows Chrome Extension best practices
- Manifest V3 compliance (latest security standard)

## Cookies and Tracking

### This Extension's Cookies
- The extension **reads** ESPN cookies but **does NOT create** any cookies
- No tracking cookies are set by this extension
- No first-party or third-party cookies from this extension

### ESPN's Cookies
- ESPN_S2 and SWID are created by ESPN, not this extension
- ESPN's cookie policies apply to those cookies
- See [ESPN's Privacy Policy](https://privacy.espn.com/) for details

## Third-Party Services

This extension interacts with:

### ESPN.com
- **What we do:** Read cookies from ESPN domains
- **Why:** To extract authentication data for your use
- **ESPN's policies:** See [ESPN Privacy Policy](https://privacy.espn.com/)

### How We Lookin (Optional)
- **What we do:** Nothing automatically
- **What you do:** Manually paste cookies into their website
- **How We Lookin's policies:** See [How We Lookin Privacy Policy](https://how-we-lookin.vercel.app/privacy)

**We are not responsible for the privacy practices of these third-party services.**

## Changes to This Policy

We may update this privacy policy from time to time:

- Changes will be reflected in the "Last Updated" date at the top
- Significant changes will be announced via the Chrome Web Store listing
- Continued use of the extension after updates constitutes acceptance
- Review this policy periodically for changes

### How to Stay Informed
- Check the [GitHub repository](https://github.com/D-jAm/Espn_PrivateLeagueLinker_Extension) for updates
- Review the Chrome Web Store listing for announcements
- Watch for version updates in `chrome://extensions/`

## Children's Privacy

- This extension is **not directed at children under 13**
- ESPN Fantasy Football requires users to be 13+ per ESPN's Terms of Service
- We do not knowingly collect information from children
- If we become aware of data from children, we will delete it

## Legal Compliance

This extension complies with:

### Chrome Web Store Policies
- [Chrome Web Store Developer Program Policies](https://developer.chrome.com/docs/webstore/program-policies/)
- User data policy (minimal data collection)
- Permissions policy (minimal permissions)

### GDPR (General Data Protection Regulation)
- Applies to users in the European Union
- Right to access: No data stored to access
- Right to deletion: No data stored to delete
- Right to portability: No data collected to port
- Lawful basis: User consent via explicit action (button click)

### CCPA (California Consumer Privacy Act)
- Applies to California residents
- We do not sell personal information
- We do not share personal information
- No personal information is collected

### Other Privacy Laws
- Complies with applicable data protection laws globally
- Follows principle of data minimization
- Transparency in data practices

## Contact & Support

### Questions About Privacy?

**Email:** support@how-we-lookin.vercel.app

**Website:** [https://how-we-lookin.vercel.app/privacy](https://how-we-lookin.vercel.app/privacy)

**GitHub:** [https://github.com/D-jAm/Espn_PrivateLeagueLinker_Extension/issues](https://github.com/D-jAm/Espn_PrivateLeagueLinker_Extension/issues)

### Report Security Issues

If you discover a security vulnerability:
- Email: security@how-we-lookin.vercel.app
- Do NOT post publicly until we've had a chance to fix it
- We'll acknowledge receipt within 48 hours
- We'll work with you to address the issue

### Data Requests

Since we don't collect or store data:
- There is no data to request, access, or delete
- Uninstalling the extension removes all permissions
- Clearing ESPN cookies invalidates authentication

## User Consent

By installing and using this extension, you acknowledge that:

- ✅ You have read and understood this privacy policy
- ✅ You understand the extension only reads ESPN cookies when you click "Extract"
- ✅ You understand cookies are displayed to you and not sent anywhere automatically
- ✅ You are responsible for how you use the extracted cookies
- ✅ You will only use this extension for your own ESPN account (not for unauthorized access)

## Disclaimer of Warranties

This extension is provided "as is" without warranties:

- We do not guarantee the extension will always work perfectly
- ESPN may change their systems, breaking functionality
- Chrome may change APIs, requiring updates
- Use at your own risk for your fantasy football purposes

## Affiliate Disclosure

This extension is **not affiliated with, endorsed by, or sponsored by ESPN**.

- ESPN, ESPN Fantasy Football, and related marks are trademarks of ESPN, Inc.
- This is an independent tool to help users access their own data
- We are not responsible for ESPN's services or policies

---

## Summary

**In Plain English:**

1. ✅ This extension only reads ESPN cookies when you click a button
2. ✅ It shows you the cookies so you can copy them
3. ✅ It doesn't send cookies anywhere automatically
4. ✅ It doesn't track you, collect data, or use analytics
5. ✅ It works entirely in your browser with no external servers
6. ✅ You can uninstall it anytime to remove all permissions

**Your privacy is our priority. We built this to be as simple and transparent as possible.**

---

**Last Updated:** November 4, 2025

**Version:** 1.0.1

**Questions?** Contact us at support@how-we-lookin.vercel.app or open an issue on [GitHub](https://github.com/D-jAm/Espn_PrivateLeagueLinker_Extension/issues).
