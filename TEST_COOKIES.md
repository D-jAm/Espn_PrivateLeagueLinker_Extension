# Testing ESPN Cookies

Your extracted cookies:
```
ESPN_S2: AEA9RBEc64owFqM33Pf7aEVyIMGhBvXJAefuKnVdxQgEZn1ZQ3p5I%2BsLclK9JDCtHgMXACykcY7Jw02NI1wpVB4ODfYjH0tosU%2Bq0zyj%2BT5%2BCgqUpL7AO9K5LyTYSx8MW6%2FVPPSYJkJd1kQLwge90xkz7cwVEo7A6Ta2nmQZJvWQNd4ILi%2F%2FCb3gq9HCJQKxwYFTAv7BHGfQSb1f1sHuuPdmfOFn8Zni6cwROYXTSxAiCFxKWuNCLCmlORJwcHoKDnhiD4sntmF%2FiPS0XY%2Fn68XnkBu8e2iMDjo%2FUOnHrC5ombrowCAEWbuptZ4EiO45ekM%3D

SWID: {46C3A4E5-A3D6-4408-83A4-E5A3D6040849}
```

## Manual Test in Browser Console

1. Go to https://fantasy.espn.com
2. Open Developer Tools (F12)
3. Go to Console tab
4. Run this code (replace YOUR_LEAGUE_ID):

```javascript
// Test with URL-encoded version (as-is from extension)
const ESPN_S2_ENCODED = "AEA9RBEc64owFqM33Pf7aEVyIMGhBvXJAefuKnVdxQgEZn1ZQ3p5I%2BsLclK9JDCtHgMXACykcY7Jw02NI1wpVB4ODfYjH0tosU%2Bq0zyj%2BT5%2BCgqUpL7AO9K5LyTYSx8MW6%2FVPPSYJkJd1kQLwge90xkz7cwVEo7A6Ta2nmQZJvWQNd4ILi%2F%2FCb3gq9HCJQKxwYFTAv7BHGfQSb1f1sHuuPdmfOFn8Zni6cwROYXTSxAiCFxKWuNCLCmlORJwcHoKDnhiD4sntmF%2FiPS0XY%2Fn68XnkBu8e2iMDjo%2FUOnHrC5ombrowCAEWbuptZ4EiO45ekM%3D";

const SWID = "{46C3A4E5-A3D6-4408-83A4-E5A3D6040849}";

const LEAGUE_ID = "YOUR_LEAGUE_ID"; // Get from your league URL

// Test API call
fetch(`https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/2024/segments/0/leagues/${LEAGUE_ID}?view=mTeam`, {
  headers: {
    'Cookie': `espn_s2=${ESPN_S2_ENCODED}; SWID=${SWID}`
  },
  credentials: 'include'
})
.then(res => res.json())
.then(data => {
  console.log('✅ Success! League data:', data);
})
.catch(err => {
  console.error('❌ Error:', err);
});
```

## What Should Happen:

**If cookies are valid:**
```javascript
✅ Success! League data: {
  id: 123456,
  teams: [...],
  settings: {...},
  // etc.
}
```

**If cookies are invalid:**
```javascript
❌ Error: 401 Unauthorized
// Or empty response
```

## Common Issues:

### 1. **Cookies are URL-encoded**
Try decoding first:
```javascript
const ESPN_S2_DECODED = decodeURIComponent(ESPN_S2_ENCODED);
// Then use ESPN_S2_DECODED in the fetch call
```

### 2. **Wrong API endpoint**
ESPN has multiple API endpoints:
- `https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/...` (recommended)
- `https://fantasy.espn.com/apis/v3/games/ffl/...`

Try both if one doesn't work.

### 3. **Missing league ID**
You must have the league ID from the URL:
```
https://fantasy.espn.com/football/league?leagueId=123456
                                                  ^^^^^^ this number
```

### 4. **Cookies expired**
ESPN cookies typically last ~2 years, but can expire. If nothing works:
- Log out of ESPN
- Log back in
- Extract fresh cookies

## For Your Web App

Your backend should:
1. Accept ESPN_S2 and SWID from user
2. Try BOTH encoded and decoded versions
3. Make API request to ESPN with cookies
4. Handle 401/403 errors gracefully

**Example backend code (Node.js):**
```javascript
const axios = require('axios');

async function getLeagueData(espn_s2, swid, leagueId) {
  // Try decoded version first
  const espn_s2_decoded = decodeURIComponent(espn_s2);

  try {
    const response = await axios.get(
      `https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/2024/segments/0/leagues/${leagueId}`,
      {
        headers: {
          'Cookie': `espn_s2=${espn_s2_decoded}; SWID=${swid}`
        }
      }
    );
    return response.data;
  } catch (error) {
    // Try encoded version if decoded fails
    const response = await axios.get(
      `https://lm-api-reads.fantasy.espn.com/apis/v3/games/ffl/seasons/2024/segments/0/leagues/${leagueId}`,
      {
        headers: {
          'Cookie': `espn_s2=${espn_s2}; SWID=${swid}`
        }
      }
    );
    return response.data;
  }
}
```

## Summary

✅ **Extension is working correctly** - extracting the right cookies
⚠️ **Web app needs debugging** - issue is with ESPN API integration

The cookies are valid, but your web app needs to:
1. Handle URL encoding/decoding properly
2. Get the league ID from the user
3. Make proper ESPN API requests with cookies in headers
4. Test with the manual console method above first
