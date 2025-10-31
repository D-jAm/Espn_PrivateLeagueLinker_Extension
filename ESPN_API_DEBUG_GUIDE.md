# ESPN API Cookie Authentication Debug Guide

> **For Web App Project:** `c:\Users\dylan\CodingProjects\AMiFucked\`
>
> **Problem:** Cookies extracted from Chrome extension are failing to authenticate with ESPN API
>
> **Extension Status:** ✅ Working correctly - extracting valid cookies
>
> **Issue Location:** Web app's ESPN API integration

---

## 🔍 Problem Summary

User is extracting cookies via Chrome extension, but when entered into the web app's settings page, ESPN API requests fail (likely 401 Unauthorized or empty responses).

### What We Know:

✅ **Extension is extracting cookies correctly**
✅ **Cookies are account-level (same across all leagues)**
✅ **User is logged into ESPN**
⚠️ **Web app's API calls are failing**

---

## 📊 Test Data

### Extracted Cookies (Real Values for Testing):

```javascript
ESPN_S2 (URL-encoded as extracted):
AEA9RBEc64owFqM33Pf7aEVyIMGhBvXJAefuKnVdxQgEZn1ZQ3p5I%2BsLclK9JDCtHgMXACykcY7Jw02NI1wpVB4ODfYjH0tosU%2Bq0zyj%2BT5%2BCgqUpL7AO9K5LyTYSx8MW6%2FVPPSYJkJd1kQLwge90xkz7cwVEo7A6Ta2nmQZJvWQNd4ILi%2F%2FCb3gq9HCJQKxwYFTAv7BHGfQSb1f1sHuuPdmfOFn8Zni6cwROYXTSxAiCFxKWuNCLCmlORJwcHoKDnhiD4sntmF%2FiPS0XY%2Fn68XnkBu8e2iMDjo%2FUOnHrC5ombrowCAEWbuptZ4EiO45ekM%3D

ESPN_S2 (URL-decoded):
AEA9RBEc64owFqM33Pf7aEVyIMGhBvXJAefuKnVdxQgEZn1ZQ3p5I+sLclK9JDCtHgMXACykcY7Jw02NI1wpVB4ODfYjH0tosU+q0zyj+T5+CgqUpL7AO9K5LyTYSx8MW6/VPPSYJkJd1kQLwge90xkz7cwVEo7A6Ta2nmQZJvWQNd4ILi//Cb3gq9HCJQKxwYFTAv7BHGfQSb1f1sHuuPdmfOFn8Zni6cwROYXTSxAiCFxKWuNCLCmlORJwcHoKDnhiD4sntmF/iPS0XY/n68XnkBu8e2iMDjo/UOnHrC5ombrowCAEWbuptZ4EiO45ekM=

SWID:
{46C3A4E5-A3D6-4408-83A4-E5A3D6040849}
```

**Note the differences:**
- `%2B` → `+`
- `%2F` → `/`
- `%3D` → `=`

---

## 🧪 Manual Testing (Do This First!)

### Step 1: Test in Browser Console

1. Open https://fantasy.espn.com in browser
2. Open DevTools (F12) → Console tab
3. Paste this code (replace `YOUR_LEAGUE_ID` with actual league ID):

```javascript
// Test cookies with ESPN API
const ESPN_S2_ENCODED = "AEA9RBEc64owFqM33Pf7aEVyIMGhBvXJAefuKnVdxQgEZn1ZQ3p5I%2BsLclK9JDCtHgMXACykcY7Jw02NI1wpVB4ODfYjH0tosU%2Bq0zyj%2BT5%2BCgqUpL7AO9K5LyTYSx8MW6%2FVPPSYJkJd1kQLwge90xkz7cwVEo7A6Ta2nmQZJvWQNd4ILi%2F%2FCb3gq9HCJQKxwYFTAv7BHGfQSb1f1sHuuPdmfOFn8Zni6cwROYXTSxAiCFxKWuNCLCmlORJwcHoKDnhiD4sntmF%2FiPS0XY%2Fn68XnkBu8e2iMDjo%2FUOnHrC5ombrowCAEWbuptZ4EiO45ekM%3D";
const ESPN_S2_DECODED = decodeURIComponent(ESPN_S2_ENCODED);
const SWID = "{46C3A4E5-A3D6-4408-83A4-E5A3D6040849}";
const LEAGUE_ID = "YOUR_LEAGUE_ID"; // Replace with actual league ID

// Test 1: With ENCODED cookie
console.log("🧪 Test 1: URL-encoded ESPN_S2");
fetch(`https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/2024/segments/0/leagues/${LEAGUE_ID}?view=mTeam`, {
  headers: { 'Cookie': `espn_s2=${ESPN_S2_ENCODED}; SWID=${SWID}` },
  credentials: 'include'
})
.then(res => res.json())
.then(data => console.log('✅ Test 1 SUCCESS:', data))
.catch(err => console.error('❌ Test 1 FAILED:', err));

// Test 2: With DECODED cookie
console.log("🧪 Test 2: URL-decoded ESPN_S2");
fetch(`https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/2024/segments/0/leagues/${LEAGUE_ID}?view=mTeam`, {
  headers: { 'Cookie': `espn_s2=${ESPN_S2_DECODED}; SWID=${SWID}` },
  credentials: 'include'
})
.then(res => res.json())
.then(data => console.log('✅ Test 2 SUCCESS:', data))
.catch(err => console.error('❌ Test 2 FAILED:', err));

// Test 3: Alternative API endpoint
console.log("🧪 Test 3: Alternative endpoint");
fetch(`https://fantasy.espn.com/apis/v3/games/ffl/seasons/2024/segments/0/leagues/${LEAGUE_ID}?view=mTeam`, {
  headers: { 'Cookie': `espn_s2=${ESPN_S2_DECODED}; SWID=${SWID}` },
  credentials: 'include'
})
.then(res => res.json())
.then(data => console.log('✅ Test 3 SUCCESS:', data))
.catch(err => console.error('❌ Test 3 FAILED:', err));
```

### Expected Results:

**Success (200 OK):**
```javascript
{
  id: 123456,
  settings: { name: "League Name", ... },
  teams: [{...}, {...}],
  status: {...}
}
```

**Failure (401 Unauthorized):**
```javascript
// Empty response or error
```

---

## 🐛 Common Issues & Fixes

### Issue 1: URL Encoding ⭐ **MOST LIKELY**

**Problem:** ESPN_S2 contains special characters (`+`, `/`, `=`) that get URL-encoded by Chrome's cookie API.

**Symptoms:**
- 401 Unauthorized
- Empty responses
- "Invalid cookie" errors

**Solution:** Decode the cookie before sending to ESPN API

```javascript
// ❌ WRONG - Using encoded cookie as-is
const espn_s2 = "AEA9RBEc...%2B...%2F...%3D";
fetch(espnApiUrl, {
  headers: { 'Cookie': `espn_s2=${espn_s2}; SWID=${swid}` }
});

// ✅ CORRECT - Decode first
const espn_s2_encoded = "AEA9RBEc...%2B...%2F...%3D";
const espn_s2 = decodeURIComponent(espn_s2_encoded);
fetch(espnApiUrl, {
  headers: { 'Cookie': `espn_s2=${espn_s2}; SWID=${swid}` }
});
```

**Frontend Fix:**
```javascript
// When user pastes cookie from extension
function sanitizeEspnS2(input) {
  // Check if already URL-encoded
  if (input.includes('%')) {
    return decodeURIComponent(input);
  }
  return input;
}

const espn_s2 = sanitizeEspnS2(userInput);
```

**Backend Fix (Node.js/Express):**
```javascript
app.post('/api/espn/authenticate', (req, res) => {
  let { espn_s2, swid } = req.body;

  // Decode if needed
  if (espn_s2.includes('%')) {
    espn_s2 = decodeURIComponent(espn_s2);
  }

  // Now use espn_s2 in API calls
});
```

---

### Issue 2: Missing League ID

**Problem:** ESPN_S2 and SWID authenticate the USER, not a specific league. League ID must be provided separately.

**Symptoms:**
- API returns data for wrong league
- API returns no leagues
- User confused why it doesn't "auto-detect" their leagues

**Solution:** Require user to provide league ID

```javascript
// User must provide:
// 1. ESPN_S2 cookie
// 2. SWID cookie
// 3. League ID (from URL: fantasy.espn.com/football/league?leagueId=123456)

async function getLeagueData(espn_s2, swid, leagueId) {
  const url = `https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/2024/segments/0/leagues/${leagueId}`;

  const response = await fetch(url, {
    headers: {
      'Cookie': `espn_s2=${espn_s2}; SWID=${swid}`
    }
  });

  return response.json();
}
```

**UI Fix:**
```html
<form>
  <label>ESPN_S2 Cookie:</label>
  <input name="espn_s2" placeholder="Paste ESPN_S2 from extension..." />

  <label>SWID Cookie:</label>
  <input name="swid" placeholder="Paste SWID from extension..." />

  <label>League ID:</label>
  <input name="league_id" placeholder="Get from URL: fantasy.espn.com/...leagueId=123456" />

  <button>Connect League</button>
</form>
```

---

### Issue 3: Wrong API Endpoint

**Problem:** ESPN has multiple API endpoints with different behaviors.

**ESPN API Endpoints:**

1. **Public Leagues (no auth):**
   ```
   https://fantasy.espn.com/apis/v3/games/ffl/seasons/2024/segments/0/leagues/{leagueId}
   ```

2. **Private Leagues (requires auth):** ⭐ **USE THIS**
   ```
   https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/2024/segments/0/leagues/{leagueId}
   ```

**Solution:** Use `lm-api-reads.fantasy.espn.com` for authenticated requests

```javascript
// ✅ CORRECT - Use lm-api-reads subdomain
const API_BASE = 'https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl';

async function getPrivateLeague(espn_s2, swid, leagueId, year = 2024) {
  const url = `${API_BASE}/seasons/${year}/segments/0/leagues/${leagueId}?view=mTeam`;

  const response = await fetch(url, {
    headers: {
      'Cookie': `espn_s2=${espn_s2}; SWID=${swid}`
    }
  });

  if (!response.ok) {
    throw new Error(`ESPN API error: ${response.status}`);
  }

  return response.json();
}
```

---

### Issue 4: CORS Issues (Frontend)

**Problem:** Browser blocks cross-origin requests to ESPN API.

**Symptoms:**
- CORS errors in console
- "Access-Control-Allow-Origin" errors
- Requests work in Postman but not in browser

**Solution:** ESPN API calls MUST be made from backend, not frontend

```javascript
// ❌ WRONG - Direct call from frontend (CORS blocked)
async function fetchFromFrontend() {
  const response = await fetch('https://lm-api-reads.fantasy.espn.com/...', {
    headers: { 'Cookie': '...' }
  });
}

// ✅ CORRECT - Proxy through your backend
async function fetchFromFrontend() {
  const response = await fetch('/api/espn/leagues', {
    method: 'POST',
    body: JSON.stringify({ espn_s2, swid, leagueId })
  });
}

// Backend (Express)
app.post('/api/espn/leagues', async (req, res) => {
  const { espn_s2, swid, leagueId } = req.body;

  const response = await fetch(
    `https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/2024/segments/0/leagues/${leagueId}`,
    {
      headers: {
        'Cookie': `espn_s2=${espn_s2}; SWID=${swid}`
      }
    }
  );

  const data = await response.json();
  res.json(data);
});
```

---

### Issue 5: Cookie Format

**Problem:** Cookies not formatted correctly in header.

**Correct Format:**
```javascript
headers: {
  'Cookie': 'espn_s2=VALUE; SWID=VALUE'
}
```

**Common Mistakes:**
```javascript
// ❌ Missing space after semicolon
'Cookie': 'espn_s2=VALUE;SWID=VALUE'

// ❌ Wrong separator
'Cookie': 'espn_s2=VALUE, SWID=VALUE'

// ❌ Quotes around values
'Cookie': 'espn_s2="VALUE"; SWID="VALUE"'

// ❌ Separate headers (some libraries support this, ESPN doesn't)
headers: {
  'espn_s2': 'VALUE',
  'SWID': 'VALUE'
}
```

---

## 💻 Reference Implementation

### Full Working Example (Node.js/Express Backend)

```javascript
const express = require('express');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());

// Endpoint to authenticate and fetch league data
app.post('/api/espn/connect-league', async (req, res) => {
  try {
    let { espn_s2, swid, league_id } = req.body;

    // Validate inputs
    if (!espn_s2 || !swid || !league_id) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['espn_s2', 'swid', 'league_id']
      });
    }

    // Sanitize SWID (should have curly braces)
    if (!swid.startsWith('{')) swid = `{${swid}`;
    if (!swid.endsWith('}')) swid = `${swid}`;

    // Decode ESPN_S2 if URL-encoded
    if (espn_s2.includes('%')) {
      console.log('Decoding URL-encoded ESPN_S2...');
      espn_s2 = decodeURIComponent(espn_s2);
    }

    // Build ESPN API URL
    const year = new Date().getFullYear();
    const espnApiUrl = `https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/${year}/segments/0/leagues/${league_id}?view=mTeam`;

    console.log(`Fetching league ${league_id} for year ${year}...`);

    // Make request to ESPN API
    const response = await fetch(espnApiUrl, {
      headers: {
        'Cookie': `espn_s2=${espn_s2}; SWID=${swid}`,
        'User-Agent': 'Mozilla/5.0'
      }
    });

    // Handle ESPN API response
    if (!response.ok) {
      console.error(`ESPN API error: ${response.status} ${response.statusText}`);

      if (response.status === 401) {
        return res.status(401).json({
          error: 'Invalid ESPN credentials',
          message: 'ESPN_S2 or SWID cookies are invalid or expired. Please log into ESPN and extract fresh cookies.'
        });
      }

      if (response.status === 404) {
        return res.status(404).json({
          error: 'League not found',
          message: 'League ID not found or you do not have access to this league.'
        });
      }

      return res.status(response.status).json({
        error: 'ESPN API error',
        status: response.status
      });
    }

    const leagueData = await response.json();

    // Validate response
    if (!leagueData.id || !leagueData.settings) {
      return res.status(500).json({
        error: 'Invalid ESPN response',
        message: 'ESPN returned unexpected data format'
      });
    }

    // Success - return league data
    console.log(`✅ Successfully fetched league: ${leagueData.settings.name}`);

    res.json({
      success: true,
      league: {
        id: leagueData.id,
        name: leagueData.settings.name,
        size: leagueData.settings.size,
        teams: leagueData.teams.length,
        // Include other relevant data
      },
      full_data: leagueData // Include full response for debugging
    });

  } catch (error) {
    console.error('Error connecting to ESPN:', error);
    res.status(500).json({
      error: 'Server error',
      message: error.message
    });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### Frontend Example (React/Next.js)

```javascript
// components/ESPNCookieForm.jsx
import { useState } from 'react';

export default function ESPNCookieForm() {
  const [formData, setFormData] = useState({
    espn_s2: '',
    swid: '',
    league_id: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/espn/connect-league', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to connect league');
      }

      setResult(data);
      console.log('✅ League connected:', data);

    } catch (err) {
      setError(err.message);
      console.error('❌ Connection failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>ESPN_S2 Cookie:</label>
        <textarea
          value={formData.espn_s2}
          onChange={(e) => setFormData({...formData, espn_s2: e.target.value})}
          placeholder="Paste from Chrome extension..."
          rows={3}
          required
        />
        <small>Extract from Chrome extension - long value with special characters</small>
      </div>

      <div>
        <label>SWID Cookie:</label>
        <input
          value={formData.swid}
          onChange={(e) => setFormData({...formData, swid: e.target.value})}
          placeholder="{XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX}"
          required
        />
        <small>Extract from Chrome extension - format: {'{'}UUID{'}'}</small>
      </div>

      <div>
        <label>League ID:</label>
        <input
          value={formData.league_id}
          onChange={(e) => setFormData({...formData, league_id: e.target.value})}
          placeholder="123456"
          required
        />
        <small>Find in your league URL: fantasy.espn.com/...leagueId=123456</small>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Connecting...' : 'Connect League'}
      </button>

      {error && (
        <div className="error">
          ❌ {error}
        </div>
      )}

      {result && (
        <div className="success">
          ✅ Connected to: {result.league.name}
          <pre>{JSON.stringify(result.league, null, 2)}</pre>
        </div>
      )}
    </form>
  );
}
```

---

## 🧪 Debug Checklist

Work through these steps in order:

- [ ] **Step 1:** Run manual browser console test (see above)
  - [ ] Test with URL-encoded ESPN_S2
  - [ ] Test with URL-decoded ESPN_S2
  - [ ] Test alternative API endpoint
  - [ ] Record which version works

- [ ] **Step 2:** Verify you have correct league ID
  - [ ] Get from URL: `fantasy.espn.com/football/league?leagueId=XXXXXX`
  - [ ] Confirm it's the league you want to test

- [ ] **Step 3:** Check backend implementation
  - [ ] Using `lm-api-reads.fantasy.espn.com` endpoint?
  - [ ] Decoding ESPN_S2 if URL-encoded?
  - [ ] Cookie format: `espn_s2=VALUE; SWID=VALUE`?
  - [ ] Handling 401/404 errors gracefully?

- [ ] **Step 4:** Check frontend implementation
  - [ ] Not making direct ESPN API calls (CORS)?
  - [ ] Proxying through backend?
  - [ ] Passing all 3 values (espn_s2, swid, league_id)?
  - [ ] Handling errors with user-friendly messages?

- [ ] **Step 5:** Test with known working credentials
  - [ ] Use the test cookies from top of this document
  - [ ] Should work if implementation is correct

- [ ] **Step 6:** Add logging
  - [ ] Log ESPN_S2 length (should be ~250 chars)
  - [ ] Log if URL decoding occurred
  - [ ] Log ESPN API response status
  - [ ] Log first 50 chars of ESPN_S2 (for debugging)

---

## 📋 Quick Reference

### ESPN API Endpoint:
```
https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/2024/segments/0/leagues/{LEAGUE_ID}?view=mTeam
```

### Cookie Header Format:
```javascript
headers: {
  'Cookie': 'espn_s2=DECODED_VALUE; SWID={UUID}'
}
```

### Decode Function:
```javascript
const espn_s2 = decodeURIComponent(espn_s2_from_extension);
```

### Common Response Codes:
- `200` - Success
- `401` - Invalid cookies / not authenticated
- `404` - League not found / no access
- `500` - ESPN server error

---

## 🎯 Expected Outcome

After implementing these fixes, the flow should be:

1. ✅ User extracts cookies from Chrome extension
2. ✅ User pastes ESPN_S2, SWID, and League ID into web app
3. ✅ Backend decodes ESPN_S2 (if needed)
4. ✅ Backend makes authenticated request to ESPN API
5. ✅ ESPN returns 200 OK with league data
6. ✅ Web app displays league info and calculates playoff odds

---

## 💬 Questions?

If stuck after trying all solutions:

1. Run the browser console test and paste results
2. Share backend code that makes ESPN API call
3. Include exact error message from ESPN API
4. Confirm which endpoint you're using
5. Verify league is private (public leagues don't need cookies)

---

**Last Updated:** October 30, 2025
**Extension Version:** 1.0.0
**Chrome Web Store Status:** Submitted, awaiting approval
