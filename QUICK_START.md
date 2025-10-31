# Quick Start Guide

Get the ESPN Cookie Helper extension running in under 5 minutes!

## 🚀 Installation (Development Mode)

1. **Open Chrome Extensions**
   ```
   chrome://extensions/
   ```

2. **Enable Developer Mode**
   - Toggle switch in top-right corner

3. **Load Extension**
   - Click "Load unpacked"
   - Select this folder: `Espn_PrivateLeagueLinker_Extension/`
   - Extension appears in list

4. **Pin to Toolbar**
   - Click puzzle icon → Find "How We Lookin" → Click pin

## ✅ First Test

1. **Log into ESPN**
   - Go to [fantasy.espn.com](https://fantasy.espn.com)
   - Sign in and visit a league

2. **Extract Cookies**
   - Click trophy icon (🏆) in toolbar
   - Click "Extract ESPN Cookies"
   - See green success message

3. **Copy Cookies**
   - Click "Copy" next to ESPN_S2
   - Click "Copy" next to SWID
   - Paste into notepad to verify

## 📋 What's Next?

### Before Publishing

1. **Create Icons** (Required)
   - See: `icons/ICON_INSTRUCTIONS.txt`
   - Need 16x16, 32x32, 48x48, 128x128 PNG files
   - Use trophy emoji or custom design

2. **Take Screenshots** (Optional, for Chrome Web Store)
   - See: `screenshots/SCREENSHOT_INSTRUCTIONS.txt`
   - Capture popup in success state
   - Recommended: 1280x800 or 640x400

3. **Update URLs** (Before publishing)
   - Replace placeholder URLs with production domain in:
     - `popup/popup.html` (2 occurrences)
     - `README.md` (multiple occurrences)
     - `PRIVACY.md` (multiple occurrences)

4. **Test Thoroughly**
   - Follow: `TESTING.md` (complete test suite)
   - Verify all scenarios work
   - Check console for errors

### Publishing to Chrome Web Store

1. **Prerequisites**
   - Chrome Developer account ($5 one-time)
   - Icons created (all 4 sizes)
   - Screenshots ready
   - Privacy policy publicly accessible

2. **Create Package**
   ```bash
   # Create ZIP (exclude dev files)
   zip -r extension.zip . -x "*.git*" "*INSTRUCTIONS.txt" "*.md" ".claude-extension.md"
   ```

3. **Submit**
   - Go to [Chrome Web Store Developer Console](https://chrome.google.com/webstore/devconsole)
   - Click "New Item"
   - Upload ZIP
   - Fill out listing
   - Submit for review (1-3 days)

## 📁 File Overview

```
Espn_PrivateLeagueLinker_Extension/
├── manifest.json          # Extension config (V3)
├── popup/
│   ├── popup.html        # UI structure
│   ├── popup.js          # Cookie extraction logic
│   └── popup.css         # Dark theme styling
├── icons/                # PNG icons (placeholder - need to create)
├── screenshots/          # Store screenshots (placeholder)
├── README.md            # Full documentation
├── PRIVACY.md           # Privacy policy (Chrome Store ready)
├── LICENSE              # MIT License
├── TESTING.md           # Complete test suite
├── QUICK_START.md       # This file
└── .gitignore           # Git ignore patterns
```

## 🔧 Development Tips

### Reload Extension After Changes
- Go to `chrome://extensions/`
- Click refresh icon (🔄) on extension card

### Debug Popup
- Right-click popup → Inspect
- Console shows all `[ESPN Cookie Helper]` logs

### Check Permissions
- `chrome://extensions/` → Details
- Should only have: `cookies` for `*.espn.com`

## 🐛 Common Issues

**Issue:** Icons not showing

- **Fix:** Create PNG files (see `icons/ICON_INSTRUCTIONS.txt`)
- **Workaround:** Chrome uses default icon until PNGs exist

**Issue:** "Could not find ESPN cookies" error

- **Fix:** Log into [fantasy.espn.com](https://fantasy.espn.com) first

**Issue:** Copy not working

- **Fix:** Click "Extract" before "Copy"

## 📚 Documentation

- **Full Docs:** [README.md](README.md)
- **Testing:** [TESTING.md](TESTING.md)
- **Privacy:** [PRIVACY.md](PRIVACY.md)
- **Spec:** [.claude-extension.md](.claude-extension.md)

## 🎯 Usage Flow

```
User → ESPN Login → Extension → Extract → Copy → How We Lookin → Sync
```

1. User logs into ESPN Fantasy Football
2. Clicks extension icon (🏆)
3. Clicks "Extract ESPN Cookies"
4. Copies ESPN_S2 and SWID values
5. Pastes into How We Lookin settings
6. Private leagues sync successfully

## 🔐 Security

- ✅ Minimal permissions (cookies only)
- ✅ No auto-send (user-initiated only)
- ✅ No tracking or analytics
- ✅ No external network requests
- ✅ Privacy-first design

## 💡 Pro Tips

1. **Pin the Extension:** Always visible in toolbar
2. **Log Checks:** Open DevTools to see detailed logs
3. **Fresh Cookies:** Re-extract after ESPN login
4. **Multiple Accounts:** Works with multiple ESPN accounts

## ✉️ Support

- **Issues:** [GitHub Issues](https://github.com/D-jAm/Espn_PrivateLeagueLinker_Extension/issues)
- **Email:** support@how-we-lookin.vercel.app
- **Docs:** [README.md](README.md)

---

**Built with 🏆 for fantasy football enthusiasts**

*Ready to test? Follow the installation steps above and run through the test scenarios in TESTING.md!*
