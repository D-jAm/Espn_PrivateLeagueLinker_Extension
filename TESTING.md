# Testing Guide - ESPN Cookie Helper Extension

This guide walks you through testing the extension locally before publishing to the Chrome Web Store.

## Prerequisites

- Google Chrome browser (version 88+)
- Valid ESPN Fantasy Football account
- Active fantasy football league (for testing cookie extraction)

## Installation for Testing

### Step 1: Load Extension in Chrome

1. **Open Chrome Extensions Page**
   - Navigate to `chrome://extensions/`
   - Or: Menu (⋮) → More Tools → Extensions

2. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top-right corner
   - This enables the "Load unpacked" button

3. **Load the Extension**
   - Click **"Load unpacked"** button
   - Navigate to: `c:\Users\dylan\CodingProjects\Espn_PrivateLeagueLinker_Extension\`
   - Click "Select Folder"

4. **Verify Installation**
   - Extension should appear in the list
   - Name: "How We Lookin - ESPN Cookie Helper"
   - Version: 1.0.0
   - Status: Should show no errors (note: icon warnings are expected until PNG icons are created)

5. **Pin to Toolbar** (Recommended)
   - Click the puzzle piece icon (Extensions) in Chrome toolbar
   - Find "How We Lookin - ESPN Cookie Helper"
   - Click the pin icon to make it always visible

### Step 2: Inspect for Errors

1. **Check Console**
   - On the extension card in `chrome://extensions/`, click "Inspect views: popup"
   - This opens DevTools for the popup
   - Check Console tab for any errors

2. **Verify Manifest**
   - Extension should load without manifest errors
   - Permissions should be: `cookies`
   - Host permissions should be: `https://*.espn.com/*`

## Testing Scenarios

### Test 1: Logged Out State (Error Handling)

**Purpose:** Verify the extension handles missing cookies gracefully

1. **Setup**
   - Make sure you're logged OUT of ESPN
   - Go to [fantasy.espn.com](https://fantasy.espn.com) and confirm you're not logged in

2. **Test Steps**
   - Click the extension icon (🏆) in Chrome toolbar
   - Popup should open showing:
     - Trophy icon
     - "How We Lookin" heading
     - "ESPN Cookie Helper" subtitle
     - "Extract ESPN Cookies" button
   - Click the **"Extract ESPN Cookies"** button

3. **Expected Result**
   - Loading state appears briefly (⏳ Extracting cookies...)
   - Error state appears:
     - ❌ Red error message: "Could not find ESPN cookies"
     - Help text: "Make sure you're logged into ESPN Fantasy Football first."
     - Link to ESPN Fantasy Football

4. **Verify**
   - Error message is clear and helpful
   - Link to ESPN is clickable and opens in new tab
   - No console errors in DevTools

### Test 2: Logged In State (Successful Extraction)

**Purpose:** Verify cookie extraction works correctly

1. **Setup**
   - Log INTO ESPN Fantasy Football
   - Go to [fantasy.espn.com](https://fantasy.espn.com)
   - Navigate to one of your leagues
   - Ensure you're fully logged in (see your team name)

2. **Test Steps**
   - Close and reopen the extension popup (click icon again)
   - Click **"Extract ESPN Cookies"** button

3. **Expected Result**
   - Loading state appears briefly (⏳ Extracting cookies...)
   - Success state appears:
     - ✅ Green success message: "Cookies extracted successfully!"
     - Two cookie boxes visible:
       - **ESPN_S2:** Shows truncated value ending with `...`
       - **SWID:** Shows full value (format: `{XXXX-XXXX-XXXX-XXXX}`)
     - Each box has a **"Copy"** button
     - Instructions visible at bottom with link to How We Lookin

4. **Verify**
   - ESPN_S2 value is truncated (shows ~50 chars + ...)
   - SWID value is complete (usually ~20-30 chars)
   - Both values are in monospace font
   - Cookie boxes are readable and styled correctly

5. **Check Console Logs**
   - Open DevTools (Right-click popup → Inspect)
   - Console should show:
     ```
     [ESPN Cookie Helper] Extension popup loaded and ready
     [ESPN Cookie Helper] Extract button clicked
     [ESPN Cookie Helper] Starting cookie extraction...
     [ESPN Cookie Helper] ✅ Cookies extracted successfully
     [ESPN Cookie Helper] ESPN_S2 length: [some number, typically 250+]
     [ESPN Cookie Helper] SWID: {XXXX-XXXX-XXXX-XXXX}
     ```

### Test 3: Tooltip Functionality

**Purpose:** Verify full cookie values appear in tooltips

1. **Setup**
   - Have cookies extracted (success state showing)

2. **Test Steps**
   - Hover mouse over the ESPN_S2 cookie value (the truncated text)
   - Wait ~1 second for tooltip

3. **Expected Result**
   - Browser tooltip appears showing the FULL ESPN_S2 cookie value
   - Value should be 250+ characters long
   - All characters should be visible in tooltip

4. **Repeat for SWID**
   - Hover over SWID value
   - Tooltip should show full value (same as displayed since SWID is short)

### Test 4: Copy to Clipboard (ESPN_S2)

**Purpose:** Verify copy functionality works

1. **Setup**
   - Have cookies extracted (success state)
   - Have a text editor ready (Notepad, VS Code, etc.)

2. **Test Steps**
   - Click **"Copy"** button next to ESPN_S2

3. **Expected Result**
   - Button text changes to **"✓ Copied!"**
   - Button background turns green
   - After 2 seconds, button reverts to original "Copy" text and style

4. **Verify Clipboard**
   - Open text editor
   - Paste (Ctrl+V or Cmd+V)
   - Should paste the FULL ESPN_S2 cookie value (not truncated)
   - Value should be 250+ characters
   - Should match the tooltip value exactly

5. **Check Console**
   - Console should log:
     ```
     [ESPN Cookie Helper] Copy ESPN_S2 button clicked
     [ESPN Cookie Helper] ✅ Copied to clipboard (length: [number])
     ```

### Test 5: Copy to Clipboard (SWID)

**Purpose:** Verify SWID copy functionality

1. **Test Steps**
   - Click **"Copy"** button next to SWID

2. **Expected Result**
   - Button changes to **"✓ Copied!"** (green)
   - Reverts after 2 seconds

3. **Verify Clipboard**
   - Paste into text editor
   - Should paste the full SWID value
   - Format: `{XXXX-XXXX-XXXX-XXXX}` (with curly braces)

4. **Check Console**
   - Console should log successful copy with length

### Test 6: UI States & Transitions

**Purpose:** Verify all UI states work smoothly

1. **Test State Transitions**
   - Click Extract button
   - Watch for smooth transition: Initial → Loading → Success
   - States should not flicker or overlap

2. **Test Multiple Extractions**
   - Click Extract button again while in success state
   - Should show loading, then success again
   - Cookie values should refresh (may be same values)

3. **Test Popup Close/Reopen**
   - Close the popup (click outside or press Escape)
   - Reopen the popup
   - Should return to initial state (no cookies showing)
   - Click Extract button to verify it still works

### Test 7: Links & Navigation

**Purpose:** Verify all links work correctly

1. **Test ESPN Link (Error State)**
   - Trigger error state (log out of ESPN first)
   - Click the "ESPN Fantasy Football" link in error message
   - Should open `https://fantasy.espn.com` in NEW tab
   - Original tab/popup should remain open

2. **Test How We Lookin Link (Success State)**
   - Extract cookies successfully
   - Click "How We Lookin" link in instructions
   - Should open in NEW tab (currently placeholder URL)

3. **Test Help Link (Footer)**
   - Click "Need help?" link in footer
   - Should open in NEW tab

### Test 8: Accessibility

**Purpose:** Verify keyboard navigation and screen reader support

1. **Keyboard Navigation**
   - Open popup
   - Press Tab key repeatedly
   - Should cycle through: Extract button → Copy buttons → Links
   - Press Enter on Extract button → should extract cookies
   - Press Enter on Copy buttons → should copy to clipboard

2. **Focus Indicators**
   - Each focused element should have visible blue outline
   - Outline should be 2px solid #60a5fa

3. **ARIA Labels** (if using screen reader)
   - Button labels should be announced
   - Cookie values should be announced with context

### Test 9: Responsive Design

**Purpose:** Verify UI works at different sizes

1. **Inspect Popup**
   - Right-click popup → Inspect
   - DevTools opens docked to popup

2. **Resize** (if possible)
   - Popup should be 400px wide
   - Content should not overflow
   - Scrollbars should appear on cookie values if needed

3. **Check on Different Displays**
   - Test on high-DPI display (if available)
   - Text should be crisp and readable
   - Icons/emoji should render clearly

### Test 10: Error Handling Edge Cases

**Purpose:** Test unusual scenarios

1. **Test Expired Cookies**
   - Log into ESPN
   - Extract cookies successfully
   - Manually delete ESPN cookies:
     - Go to `chrome://settings/cookies`
     - Search for "espn.com"
     - Remove ESPN_S2 and SWID cookies
   - Click Extract button again
   - Should show error state

2. **Test Rapid Clicking**
   - Click Extract button multiple times rapidly
   - Should handle gracefully (may queue or ignore extra clicks)
   - Should not cause errors or crashes

3. **Test Copy Without Extract**
   - Reload popup (close and reopen)
   - Try clicking Copy buttons WITHOUT extracting first
   - Should either:
     - Do nothing (no cookies to copy)
     - Show friendly error message

## Console Logging Verification

All actions should log to console. Expected log patterns:

### On Popup Load
```
[ESPN Cookie Helper] Extension popup loaded and ready
```

### On Extract Click (Success)
```
[ESPN Cookie Helper] Extract button clicked
[ESPN Cookie Helper] Starting cookie extraction...
[ESPN Cookie Helper] ✅ Cookies extracted successfully
[ESPN Cookie Helper] ESPN_S2 length: 256
[ESPN Cookie Helper] SWID: {XXXX-XXXX-XXXX-XXXX}
[ESPN Cookie Helper] UI state changed to: success
```

### On Extract Click (Error)
```
[ESPN Cookie Helper] Extract button clicked
[ESPN Cookie Helper] Starting cookie extraction...
[ESPN Cookie Helper] Cookies not found. User may not be logged in.
[ESPN Cookie Helper] ESPN_S2: Missing
[ESPN Cookie Helper] SWID: Missing
[ESPN Cookie Helper] UI state changed to: error
```

### On Copy Click
```
[ESPN Cookie Helper] Copy ESPN_S2 button clicked
[ESPN Cookie Helper] ✅ Copied to clipboard (length: 256)
```

## Visual Testing Checklist

- [ ] Trophy emoji (🏆) displays correctly
- [ ] Gradient text on "How We Lookin" title renders properly
- [ ] Dark theme background gradient is smooth
- [ ] Buttons have proper hover effects (transform + shadow)
- [ ] Cookie boxes have readable contrast
- [ ] Success message is green (#10b981)
- [ ] Error message is red (#ef4444)
- [ ] Copy button turns green when clicked
- [ ] Loading state has pulse animation
- [ ] Footer border is visible but subtle

## Performance Testing

- [ ] Popup opens instantly (< 100ms)
- [ ] Extract button responds immediately (< 50ms to show loading)
- [ ] Cookie extraction completes in < 500ms (usually < 100ms)
- [ ] Copy to clipboard is instant (< 50ms)
- [ ] No memory leaks (check Chrome Task Manager)

## Known Issues (Before Icon Creation)

⚠️ **Expected Warnings:**

Until you create actual PNG icons, you may see:
- "Could not load icon 'icons/icon16.png'"
- "Could not load icon 'icons/icon32.png'"
- etc.

These warnings are normal and won't affect functionality. The extension will use a default Chrome icon until you add custom icons.

**To Fix:** Follow instructions in `icons/ICON_INSTRUCTIONS.txt`

## Final Validation

Before considering the extension complete:

- [ ] All test scenarios pass
- [ ] No console errors (except missing icon warnings)
- [ ] All links work and open in new tabs
- [ ] Copy functionality works for both cookies
- [ ] Error states are helpful and clear
- [ ] Success states are celebratory and informative
- [ ] UI is visually appealing and matches design system
- [ ] Extension can be uninstalled cleanly
- [ ] Extension can be reinstalled without issues

## Next Steps

After local testing is successful:

1. **Create Icons** (see `icons/ICON_INSTRUCTIONS.txt`)
2. **Take Screenshots** (see `screenshots/SCREENSHOT_INSTRUCTIONS.txt`)
3. **Test with Real Use Case**
   - Extract cookies
   - Paste into How We Lookin web app
   - Verify league sync works
4. **Prepare for Chrome Web Store**
   - Review [README.md](README.md) Chrome Web Store section
   - Ensure PRIVACY.md is publicly accessible
   - Create ZIP file for submission

## Reporting Issues

If you find bugs during testing:

1. Check console for error messages
2. Note the exact steps to reproduce
3. Record browser version and OS
4. Open an issue on GitHub (or contact developer)

---

**Happy Testing! 🏆**

*Remember: The extension only reads ESPN cookies when you click the Extract button. Your data stays private and local.*
