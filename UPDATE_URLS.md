# URL Update Checklist

When your web app is deployed to production, update these URLs:

## Files to Update

### 1. popup/popup.html (2 locations)

**Line 42 - Settings link:**
```html
<!-- Current (localhost): -->
<a href="http://localhost:3000/settings" target="_blank">

<!-- Update to: -->
<a href="https://YOUR-DOMAIN.com/settings" target="_blank">
```

**Line 60 - Help link:**
```html
<!-- Current (localhost): -->
<a href="http://localhost:3000/help" target="_blank">

<!-- Update to: -->
<a href="https://YOUR-DOMAIN.com/help" target="_blank">
```

### 2. README.md (Multiple locations)

Search and replace all instances:
```bash
# Find all occurrences
grep -n "your-app.com\|localhost:3000" README.md

# Replace with your domain
sed -i 's|localhost:3000|YOUR-DOMAIN.com|g' README.md
sed -i 's|your-app.com|YOUR-DOMAIN.com|g' README.md
```

Update these sections:
- Line 8: Web app link in header
- Line 55: Settings page link
- Line 647: Support contact
- All example URLs

### 3. PRIVACY.md (Multiple locations)

Search and replace:
```bash
grep -n "your-app.com" PRIVACY.md
sed -i 's|your-app.com|YOUR-DOMAIN.com|g' PRIVACY.md
```

Update:
- All web app references
- Privacy policy URL
- Contact information
- How We Lookin links

### 4. QUICK_START.md

Update:
- Line 55: Settings URL
- All references to main app

### 5. manifest.json (Optional)

Consider adding your domain to enable tighter integration:
```json
{
  "homepage_url": "https://YOUR-DOMAIN.com",
  "author": "Your Name or Company"
}
```

## Quick Replace Command

Replace all at once (Linux/Mac):
```bash
# Replace localhost:3000 with production domain
find . -type f \( -name "*.html" -o -name "*.md" \) \
  -exec sed -i 's|http://localhost:3000|https://YOUR-DOMAIN.com|g' {} +

# Replace placeholder domain
find . -type f \( -name "*.html" -o -name "*.md" \) \
  -exec sed -i 's|your-app.com|YOUR-DOMAIN.com|g' {} +
```

Windows PowerShell:
```powershell
# Replace in HTML files
(Get-Content popup/popup.html) -replace 'localhost:3000', 'YOUR-DOMAIN.com' | Set-Content popup/popup.html

# Replace in all MD files
Get-ChildItem -Filter "*.md" | ForEach-Object {
    (Get-Content $_.FullName) -replace 'localhost:3000|your-app.com', 'YOUR-DOMAIN.com' |
    Set-Content $_.FullName
}
```

## Verification Checklist

After updating, verify:
- [ ] All links in extension popup open correct URLs
- [ ] README links point to production site
- [ ] Privacy policy mentions correct domain
- [ ] Help/support links work
- [ ] Test full flow: Extract → Click link → Paste → Sync

## Production Deployment Checklist

Before publishing extension:
- [ ] Web app is deployed and accessible
- [ ] /settings page exists and accepts cookies
- [ ] /help page exists (or update to remove link)
- [ ] All URLs updated to production domain
- [ ] Extension tested with production URLs
- [ ] Icons created (PNG files)
- [ ] Screenshots captured
- [ ] Version number incremented if updating existing

## Rollback Plan

If you need to revert to localhost for testing:
```bash
# Revert to localhost
find . -type f \( -name "*.html" -o -name "*.md" \) \
  -exec sed -i 's|https://YOUR-DOMAIN.com|http://localhost:3000|g' {} +
```

Save this file for reference when you're ready to deploy!
