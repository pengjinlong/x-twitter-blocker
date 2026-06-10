// X/Twitter Keyword Blocker - Chrome Extension Content Script
// Automatically hides tweets and comments containing specific keywords.

const DEFAULT_KEYWORDS = [
    'sao货',
    '卖片',
    '加微',
    '打✈️',
    '主页'
];
const DEFAULT_MAX_EMOJI = 2;

let blockedKeywords = [...DEFAULT_KEYWORDS];
let maxEmojiCount = DEFAULT_MAX_EMOJI;

// Load settings from Chrome storage
chrome.storage.sync.get(['blockedKeywords', 'maxEmojiCount'], (result) => {
    if (result.blockedKeywords && result.blockedKeywords.length > 0) {
        blockedKeywords = result.blockedKeywords;
    }
    if (typeof result.maxEmojiCount === 'number') {
        maxEmojiCount = result.maxEmojiCount;
    }
    init();
});

/**
 * Check if a string matches any blocked keyword
 */
function matchesKeyword(text, keywords) {
    if (!text) return false;
    return keywords.some(keyword => keyword.trim() !== '' && text.includes(keyword.trim()));
}

/**
 * Count emoji in a DOM element.
 * Twitter renders most emoji as <img draggable="false"> tags;
 * plain-text Unicode emoji are also counted via regex.
 */
function countEmojis(element) {
    if (!element) return 0;
    // ① Twitter emoji images
    const imgCount = element.querySelectorAll('img[draggable="false"]').length;
    // ② Unicode emoji characters in text nodes
    const text = element.textContent || '';
    const unicodeMatches = text.match(/\p{Extended_Pictographic}/gu);
    const unicodeCount = unicodeMatches ? unicodeMatches.length : 0;
    return imgCount + unicodeCount;
}

/**
 * Core filtering function
 * Checks: ① tweet text (keyword + emoji count)  ② user display name (keyword + emoji count)
 */
function filterTweets() {
    const tweets = document.querySelectorAll('div[data-testid="cellInnerDiv"]:not([data-filtered="true"])');

    tweets.forEach(tweet => {
        tweet.setAttribute('data-filtered', 'true');

        let isBlocked = false;

        // ① Check tweet text content
        const textElement = tweet.querySelector('div[data-testid="tweetText"]');
        if (textElement) {
            const content = textElement.textContent || textElement.innerText;
            if (matchesKeyword(content, blockedKeywords)) {
                isBlocked = true;
                console.log(`[X Blocker] Comment text keyword matched. Preview: ${content.substring(0, 30)}...`);
            }
            if (!isBlocked && maxEmojiCount > 0) {
                const ec = countEmojis(textElement);
                if (ec > maxEmojiCount) {
                    isBlocked = true;
                    console.log(`[X Blocker] Comment text emoji over limit (${ec} > ${maxEmojiCount}).`);
                }
            }
        }

        // ② Check user display name (nickname)
        if (!isBlocked) {
            const userNameEl = tweet.querySelector('div[data-testid="User-Name"]');
            if (userNameEl) {
                const displayNameEl = userNameEl.querySelector('span[dir="ltr"]');
                const displayName = displayNameEl
                    ? (displayNameEl.textContent || displayNameEl.innerText)
                    : (userNameEl.textContent || userNameEl.innerText);
                if (matchesKeyword(displayName, blockedKeywords)) {
                    isBlocked = true;
                    console.log(`[X Blocker] Comment username keyword matched: ${displayName.substring(0, 20)}`);
                }
                if (!isBlocked && maxEmojiCount > 0) {
                    const emojiEl = displayNameEl || userNameEl;
                    const ec = countEmojis(emojiEl);
                    if (ec > maxEmojiCount) {
                        isBlocked = true;
                        console.log(`[X Blocker] Comment username emoji over limit (${ec} > ${maxEmojiCount}): ${displayName.substring(0, 20)}`);
                    }
                }
            }
        }

        if (isBlocked) {
            tweet.style.display = 'none';
        }
    });
}

/**
 * Filter timeline feed tweets
 */
function filterFeedTweets() {
    const articles = document.querySelectorAll('article[data-testid="tweet"]:not([data-feed-filtered="true"])');

    articles.forEach(article => {
        article.setAttribute('data-feed-filtered', 'true');

        let isBlocked = false;

        // ① Check tweet text content
        const textElement = article.querySelector('div[data-testid="tweetText"]');
        if (textElement) {
            const content = textElement.textContent || textElement.innerText;
            if (matchesKeyword(content, blockedKeywords)) {
                isBlocked = true;
                console.log(`[X Blocker] Feed text keyword matched. Preview: ${content.substring(0, 30)}...`);
            }
            if (!isBlocked && maxEmojiCount > 0) {
                const ec = countEmojis(textElement);
                if (ec > maxEmojiCount) {
                    isBlocked = true;
                    console.log(`[X Blocker] Feed text emoji over limit (${ec} > ${maxEmojiCount}).`);
                }
            }
        }

        // ② Check user display name (nickname)
        if (!isBlocked) {
            const displayNameEl = article.querySelector('a[role="link"] div[dir="ltr"]');
            if (displayNameEl) {
                const displayName = displayNameEl.textContent || displayNameEl.innerText;
                if (matchesKeyword(displayName, blockedKeywords)) {
                    isBlocked = true;
                    console.log(`[X Blocker] Feed username keyword matched: ${displayName.substring(0, 20)}`);
                }
                if (!isBlocked && maxEmojiCount > 0) {
                    const ec = countEmojis(displayNameEl);
                    if (ec > maxEmojiCount) {
                        isBlocked = true;
                        console.log(`[X Blocker] Feed username emoji over limit (${ec} > ${maxEmojiCount}): ${displayName.substring(0, 20)}`);
                    }
                }
            }
        }

        if (isBlocked) {
            const container = article.closest('div[data-testid="cellInnerDiv"]') || article;
            container.style.display = 'none';
        }
    });
}

/**
 * Listen for settings updates from the popup
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'UPDATE_SETTINGS') {
        blockedKeywords = message.keywords;
        maxEmojiCount = typeof message.maxEmojiCount === 'number' ? message.maxEmojiCount : DEFAULT_MAX_EMOJI;
        
        // Re-scan page with new settings (reset filtered flags and styles)
        document.querySelectorAll('div[data-testid="cellInnerDiv"][data-filtered="true"]')
            .forEach(el => {
                el.removeAttribute('data-filtered');
                el.style.display = '';
            });
        document.querySelectorAll('article[data-testid="tweet"][data-feed-filtered="true"]')
            .forEach(el => {
                el.removeAttribute('data-feed-filtered');
                const container = el.closest('div[data-testid="cellInnerDiv"]') || el;
                container.style.display = '';
            });
        
        filterTweets();
        filterFeedTweets();
        sendResponse({ success: true });
    }
});

// Set up MutationObserver to handle dynamically loaded content
const observer = new MutationObserver(() => {
    filterTweets();
    filterFeedTweets();
});

function init() {
    const targetNode = document.getElementById('react-root') || document.body;
    if (targetNode) {
        observer.observe(targetNode, {
            childList: true,
            subtree: true
        });
        filterTweets();
        filterFeedTweets();
    } else {
        setTimeout(init, 500);
    }
}
