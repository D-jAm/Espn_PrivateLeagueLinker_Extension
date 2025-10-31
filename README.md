# How We Lookin - ESPN Cookie Helper

> Chrome extension to extract ESPN Fantasy Football authentication cookies for use with the [How We Lookin](https://how-we-lookin.vercel.app) web application.

## What It Does

This extension helps you sync your **private ESPN Fantasy Football leagues** with How We Lookin by extracting your authentication cookies (`ESPN_S2` and `SWID`). These cookies allow How We Lookin to access your league data and calculate your playoff odds.

**No manual cookie hunting in DevTools required!**

## Features

✅ **One-Click Extraction** - Simple button to extract both required cookies
✅ **Privacy-First** - Only reads cookies when you click, never auto-sends anywhere
✅ **Copy to Clipboard** - Individual copy buttons with visual feedback
✅ **Error Handling** - Clear guidance if you're not logged into ESPN
✅ **Secure** - Minimal permissions, no tracking, no analytics
✅ **Modern UI** - Clean dark theme matching the main app

## Installation

### Option 1: Chrome Web Store (Recommended)

**Coming Soon!** This extension will be available on the Chrome Web Store.

Once published:
1. Visit the [Chrome Web Store listing](#) (link coming soon)
2. Click **"Add to Chrome"**
3. The extension icon (🏆) will appear in your toolbar
4. Pin it for easy access

### Option 2: Manual Installation (Development Mode)

For testing or development:

1. **Download this repository**
   ```bash
   git clone https://github.com/your-username/espn-cookie-helper.git
   # Or download as ZIP and extract
   ```

2. **Open Chrome Extensions**
   - Navigate to `chrome://extensions/`
   - Or: Menu (⋮) → More Tools → Extensions

3. **Enable Developer Mode**
   - Toggle the switch in the top-right corner

4. **Load the Extension**
   - Click **"Load unpacked"**
   - Select the `Espn_PrivateLeagueLinker_Extension` folder
   - The extension should now appear in your extensions list

5. **Pin to Toolbar** (Optional but recommended)
   - Click the puzzle piece icon in Chrome toolbar
   - Find "How We Lookin - ESPN Cookie Helper"
   - Click the pin icon

## How to Use

### Step-by-Step Guide

1. **Log into ESPN**
   - Go to [ESPN Fantasy Football](https://fantasy.espn.com)
   - Sign in with your ESPN account
   - Navigate to any of your leagues (ensures cookies are set)

2. **Open the Extension**
   - Click the trophy icon (🏆) in your Chrome toolbar
   - The popup will open

3. **Extract Cookies**
   - Click the **"Extract ESPN Cookies"** button
   - Wait 1-2 seconds for extraction
   - You should see a green success message

4. **Copy Cookies**
   - Click **"Copy"** next to `ESPN_S2` (long value)
   - Click **"Copy"** next to `SWID` (short value, like `{ABC-123}`)

5. **Paste into How We Lookin**
   - Go to [How We Lookin Settings](https://how-we-lookin.vercel.app/settings)
   - Paste `ESPN_S2` into the first field
   - Paste `SWID` into the second field
   - Click **"Save"** or **"Connect League"**

6. **Done!**
   - Your private leagues should now sync
   - Refresh the How We Lookin page to see your data

### Troubleshooting

**Problem: "Could not find ESPN cookies" error**

Solution:
- Make sure you're logged into [fantasy.espn.com](https://fantasy.espn.com)
- Visit your league page first to ensure cookies are set
- Try refreshing the ESPN page and extracting again

**Problem: Extension icon not showing in toolbar**

Solution:
- Click the puzzle piece icon (Extensions menu)
- Find "How We Lookin - ESPN Cookie Helper"
- Click the pin icon to make it always visible

**Problem: Copy button not working**

Solution:
- Check that Chrome has clipboard permissions
- Try manually selecting and copying the cookie value
- Make sure you clicked "Extract" first before trying to copy

**Problem: Cookies expired or invalid**

Solution:
- ESPN cookies expire after ~2 years
- Log out of ESPN and log back in
- Extract fresh cookies using the extension

## Privacy & Security

This extension is built with privacy as the top priority:

- ✅ **Only reads cookies from ESPN.com** when you click the extract button
- ✅ **Does NOT automatically send cookies** to any server
- ✅ **Does NOT track** your browsing activity
- ✅ **Does NOT collect** any personal information
- ✅ **Works entirely in your browser** - no external network requests
- ✅ **Minimal permissions** - only `cookies` access to ESPN domains
- ✅ **No analytics or tracking** - completely private

**Your cookies are displayed to you, and you choose when and where to use them.**

See [PRIVACY.md](PRIVACY.md) for the complete privacy policy.

## Development

### Tech Stack

- **Manifest Version:** V3 (latest Chrome standard)
- **Language:** Vanilla JavaScript (no build tools required)
- **Chrome APIs:**
  - `chrome.cookies` - Read ESPN cookies
  - `navigator.clipboard` - Copy to clipboard
- **Permissions:** `cookies` only, limited to `https://*.espn.com/*`

### Project Structure

```
Espn_PrivateLeagueLinker_Extension/
├── manifest.json          # Extension configuration (V3)
├── popup/
│   ├── popup.html        # Extension popup UI
│   ├── popup.js          # Cookie extraction logic
│   └── popup.css         # Dark theme styling
├── icons/                # Extension icons (4 sizes)
│   ├── icon16.png       # 16x16 toolbar icon
│   ├── icon32.png       # 32x32 management page
│   ├── icon48.png       # 48x48 extensions page
│   └── icon128.png      # 128x128 Chrome Web Store
├── screenshots/          # Chrome Web Store assets
├── README.md            # This file
├── PRIVACY.md           # Privacy policy
├── LICENSE              # MIT License
└── .gitignore           # Git ignore patterns
```

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/espn-cookie-helper.git
   cd espn-cookie-helper
   ```

2. **Make changes to files**
   - Edit `popup/popup.html`, `popup.js`, or `popup.css`
   - Modify `manifest.json` for configuration changes
   - Update icons in `icons/` folder

3. **Test changes**
   - Go to `chrome://extensions/`
   - Click the refresh icon (🔄) on the extension card
   - Click the extension icon to test
   - Open DevTools on the popup: Right-click popup → Inspect

4. **Check console logs**
   - All extension actions log to the console
   - Look for `[ESPN Cookie Helper]` prefixed messages
   - Errors are logged with full stack traces

### Code Quality

- Clean, commented code
- Defensive error handling
- User-friendly error messages
- Console logging for debugging
- Accessibility features (ARIA labels, focus states)
- Responsive design

## Chrome Web Store Submission

### Prerequisites

Before submitting to the Chrome Web Store:

- [ ] Chrome Web Store Developer account ($5 one-time fee)
- [ ] All icons created (16, 32, 48, 128px PNG with transparency)
- [ ] At least 1 screenshot (1280x800 or 640x400 recommended)
- [ ] Privacy policy publicly accessible (can host PRIVACY.md on GitHub)
- [ ] Extension thoroughly tested
- [ ] Valid version number in manifest.json

### Submission Steps

1. **Prepare assets**
   - Create/export icons at all required sizes
   - Take 1-2 screenshots of extension in action
   - Ensure PRIVACY.md is accessible via URL

2. **Create ZIP file**
   ```bash
   # Exclude development files
   zip -r extension.zip . -x "*.git*" "screenshots/*.txt" "icons/*.txt" "*.md"
   ```

3. **Submit**
   - Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
   - Click **"New Item"**
   - Upload the ZIP file
   - Fill out store listing form
   - Submit for review

4. **Wait for approval**
   - Typically 1-3 business days
   - Check email for review status
   - Address any feedback if rejected

### Store Listing Tips

- **Category:** Productivity → Tools or Sports
- **Description:** Clear, benefit-focused (see template in `.claude-extension.md`)
- **Keywords:** "ESPN", "Fantasy Football", "cookies", "private leagues", "authentication"
- **Screenshots:** Show success state and clear value proposition
- **Privacy Policy URL:** Link to hosted PRIVACY.md (GitHub Pages or your site)

## Support & Contact

- **Website:** [https://how-we-lookin.vercel.app](https://how-we-lookin.vercel.app)
- **Issues:** [GitHub Issues](https://github.com/D-jAm/Espn_PrivateLeagueLinker_Extension/issues)
- **Email:** support@how-we-lookin.vercel.app
- **Main App Repo:** [How We Lookin Repository](#)

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This extension is **not affiliated with or endorsed by ESPN**. It is designed to help users access their own fantasy league data more conveniently for use with third-party analysis tools.

ESPN, ESPN Fantasy Football, and related marks are trademarks of ESPN, Inc.

## Acknowledgments

- Built for the **How We Lookin** fantasy football playoff odds calculator
- Inspired by the need for easier private league access
- Thanks to the Chrome Extensions team for excellent documentation

---

**Made with 🏆 for fantasy football enthusiasts**

*Having trouble? Check out our [FAQ](https://how-we-lookin.vercel.app/faq) or open an [issue](https://github.com/D-jAm/Espn_PrivateLeagueLinker_Extension/issues).*
