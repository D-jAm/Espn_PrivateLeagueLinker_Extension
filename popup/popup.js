/**
 * How We Lookin - ESPN Cookie Helper
 *
 * This script extracts ESPN_S2 and SWID cookies for authenticating
 * with ESPN Fantasy Football API through the How We Lookin web app.
 *
 * Security: Cookies are only read when user clicks the extract button.
 * No automatic transmission to any server.
 */

// ============================================================================
// State Management
// ============================================================================

let extractedCookies = {
  espn_s2: null,
  swid: null
};

// ============================================================================
// DOM Elements
// ============================================================================

const extractBtn = document.getElementById('extractBtn');
const results = document.getElementById('results');
const successState = document.getElementById('successState');
const errorState = document.getElementById('errorState');
const loadingState = document.getElementById('loadingState');
const espnS2ValueEl = document.getElementById('espnS2Value');
const swidValueEl = document.getElementById('swidValue');
const copyS2Btn = document.getElementById('copyS2');
const copySWIDBtn = document.getElementById('copySWID');

// ============================================================================
// Cookie Extraction
// ============================================================================

/**
 * Extract ESPN authentication cookies from the browser
 * @async
 * @returns {Promise<void>}
 */
async function extractCookies() {
  try {
    // Show loading state immediately
    showState('loading');
    console.log('[ESPN Cookie Helper] Starting cookie extraction...');

    // Get ESPN_S2 cookie
    const espnS2Cookie = await chrome.cookies.get({
      url: 'https://fantasy.espn.com',
      name: 'espn_s2'
    });

    // Get SWID cookie
    const swidCookie = await chrome.cookies.get({
      url: 'https://fantasy.espn.com',
      name: 'SWID'
    });

    // Validate both cookies exist
    if (!espnS2Cookie || !swidCookie) {
      console.error('[ESPN Cookie Helper] Cookies not found. User may not be logged in.');
      console.log('[ESPN Cookie Helper] ESPN_S2:', espnS2Cookie ? 'Found' : 'Missing');
      console.log('[ESPN Cookie Helper] SWID:', swidCookie ? 'Found' : 'Missing');
      showState('error');
      return;
    }

    // Additional validation: check if cookies have values
    if (!espnS2Cookie.value || !swidCookie.value) {
      console.error('[ESPN Cookie Helper] Cookies exist but have no value.');
      showState('error');
      return;
    }

    // Store extracted cookies in memory
    extractedCookies.espn_s2 = espnS2Cookie.value;
    extractedCookies.swid = swidCookie.value;

    // Display cookies (truncated for security/UX)
    espnS2ValueEl.textContent = truncateCookie(espnS2Cookie.value);
    espnS2ValueEl.title = espnS2Cookie.value; // Full value in tooltip
    swidValueEl.textContent = swidCookie.value; // SWID is usually short
    swidValueEl.title = swidCookie.value;

    // Show success state
    showState('success');

    console.log('[ESPN Cookie Helper] ✅ Cookies extracted successfully');
    console.log('[ESPN Cookie Helper] ESPN_S2 length:', espnS2Cookie.value.length);
    console.log('[ESPN Cookie Helper] SWID:', swidCookie.value);

  } catch (error) {
    console.error('[ESPN Cookie Helper] Error during extraction:', error);
    console.error('[ESPN Cookie Helper] Error stack:', error.stack);
    showState('error');
  }
}

// ============================================================================
// UI State Management
// ============================================================================

/**
 * Show different UI states (loading, success, error)
 * @param {string} state - The state to display ('loading', 'success', 'error')
 */
function showState(state) {
  // Show results container
  results.classList.remove('hidden');

  // Hide all state divs first
  successState.classList.add('hidden');
  errorState.classList.add('hidden');
  loadingState.classList.add('hidden');

  // Show the requested state
  if (state === 'success') {
    successState.classList.remove('hidden');
  } else if (state === 'error') {
    errorState.classList.remove('hidden');
  } else if (state === 'loading') {
    loadingState.classList.remove('hidden');
  }

  console.log('[ESPN Cookie Helper] UI state changed to:', state);
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Truncate long cookie values for display
 * @param {string} value - The cookie value to truncate
 * @param {number} maxLength - Maximum length before truncation (default: 50)
 * @returns {string} Truncated string with ellipsis if needed
 */
function truncateCookie(value, maxLength = 50) {
  if (!value) return '';
  if (value.length <= maxLength) return value;
  return value.substring(0, maxLength) + '...';
}

/**
 * Copy text to clipboard with visual feedback
 * @async
 * @param {string} text - The text to copy
 * @param {HTMLElement} buttonEl - The button element to update with feedback
 */
async function copyToClipboard(text, buttonEl) {
  try {
    // Validate input
    if (!text) {
      console.error('[ESPN Cookie Helper] No text provided to copy');
      alert('No cookie value to copy. Please extract cookies first.');
      return;
    }

    // Use Clipboard API
    await navigator.clipboard.writeText(text);

    // Visual feedback - store original text
    const originalText = buttonEl.textContent;
    buttonEl.textContent = '✓ Copied!';
    buttonEl.classList.add('copied');

    // Reset button after 2 seconds
    setTimeout(() => {
      buttonEl.textContent = originalText;
      buttonEl.classList.remove('copied');
    }, 2000);

    console.log('[ESPN Cookie Helper] ✅ Copied to clipboard (length:', text.length, ')');

  } catch (error) {
    console.error('[ESPN Cookie Helper] Failed to copy to clipboard:', error);

    // Fallback error message
    alert('Failed to copy to clipboard. Please try again or copy manually from the display.');
  }
}

// ============================================================================
// Event Listeners
// ============================================================================

// Extract button click handler
extractBtn.addEventListener('click', () => {
  console.log('[ESPN Cookie Helper] Extract button clicked');
  extractCookies();
});

// Copy ESPN_S2 button handler
copyS2Btn.addEventListener('click', () => {
  console.log('[ESPN Cookie Helper] Copy ESPN_S2 button clicked');
  copyToClipboard(extractedCookies.espn_s2, copyS2Btn);
});

// Copy SWID button handler
copySWIDBtn.addEventListener('click', () => {
  console.log('[ESPN Cookie Helper] Copy SWID button clicked');
  copyToClipboard(extractedCookies.swid, copySWIDBtn);
});

// ============================================================================
// Initialization
// ============================================================================

// Optional: Auto-extract on popup open
// Uncomment the line below to automatically extract cookies when popup opens
// This is disabled by default for privacy/user control
// document.addEventListener('DOMContentLoaded', extractCookies);

console.log('[ESPN Cookie Helper] Extension popup loaded and ready');
