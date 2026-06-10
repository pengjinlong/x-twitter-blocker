// ==UserScript==
// @name         x-twitter-blocker
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  自动隐藏 X (Twitter) 上包含特定关键词的评论和推文
// @author       Gemini
// @match        *://x.com/*
// @match        *://twitter.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // ================= 配置区 =================
    // 在这里添加你想屏蔽的关键词，用英文逗号隔开，记得加引号
    const BLOCKED_KEYWORDS = [
        'sao',
        '卖片',
        '加微',
        '打✈️',
        '主页',
        '太涩',
        '好涩',
        '好湿',
        '反差',
        '返差',
        '花样多',
        '探路',
        '约拍',
        '有需要来',
        '探花',
        // '填入其他你不想看到的词'
    ];

    // Emoji 超过该数量时自动屏蔽（0 表示不启用此规则）
    const MAX_EMOJI_COUNT = 2;
    // ==========================================

    /**
     * 检查一段文本是否命中任一屏蔽关键词
     */
    function matchesKeyword(text) {
        if (!text) return false;
        return BLOCKED_KEYWORDS.some(keyword => keyword.trim() !== '' && text.includes(keyword.trim()));
    }

    /**
     * 统计一个 DOM 元素内的 emoji 数量
     * Twitter 将大多数 emoji 渲染为 <img draggable="false"> 标签，
     * 同时文本节点中也可能含有 Unicode emoji，两种都要计数。
     */
    function countEmojis(element) {
        if (!element) return 0;
        // ① 统计 Twitter emoji 图片（img[draggable="false"]）
        const imgCount = element.querySelectorAll('img[draggable="false"]').length;
        // ② 统计文本中的 Unicode emoji（\p{Extended_Pictographic} 覆盖绝大多数 emoji）
        const text = element.textContent || '';
        const unicodeMatches = text.match(/\p{Extended_Pictographic}/gu);
        const unicodeCount = unicodeMatches ? unicodeMatches.length : 0;
        return imgCount + unicodeCount;
    }

    /**
     * 评论区（replies）过滤：屏蔽内容包裹在 data-testid="cellInnerDiv" 中
     */
    function filterTweets() {
        const tweets = document.querySelectorAll('div[data-testid="cellInnerDiv"]:not([data-filtered="true"])');

        tweets.forEach(tweet => {
            tweet.setAttribute('data-filtered', 'true');

            let isBlocked = false;

            // ① 检测推文正文
            const textElement = tweet.querySelector('div[data-testid="tweetText"]');
            if (textElement) {
                const content = textElement.textContent || textElement.innerText;
                if (matchesKeyword(content)) {
                    isBlocked = true;
                    console.log(`[屏蔽插件] 评论正文命中关键词。预览: ${content.substring(0, 20)}...`);
                }
                if (!isBlocked && MAX_EMOJI_COUNT > 0) {
                    const emojiCount = countEmojis(textElement);
                    if (emojiCount > MAX_EMOJI_COUNT) {
                        isBlocked = true;
                        console.log(`[屏蔽插件] 评论正文 emoji 超限 (${emojiCount} > ${MAX_EMOJI_COUNT})。`);
                    }
                }
            }

            // ② 检测用户昵称（评论区用 span[dir="ltr"]）
            if (!isBlocked) {
                const userNameEl = tweet.querySelector('div[data-testid="User-Name"]');
                if (userNameEl) {
                    const displayNameEl = userNameEl.querySelector('span[dir="ltr"]');
                    const displayName = displayNameEl
                        ? (displayNameEl.textContent || displayNameEl.innerText)
                        : (userNameEl.textContent || userNameEl.innerText);
                    if (matchesKeyword(displayName)) {
                        isBlocked = true;
                        console.log(`[屏蔽插件] 评论昵称命中关键词。昵称: ${displayName.substring(0, 20)}`);
                    }
                    if (!isBlocked && MAX_EMOJI_COUNT > 0) {
                        const emojiEl = displayNameEl || userNameEl;
                        const emojiCount = countEmojis(emojiEl);
                        if (emojiCount > MAX_EMOJI_COUNT) {
                            isBlocked = true;
                            console.log(`[屏蔽插件] 昵称 emoji 超限 (${emojiCount} > ${MAX_EMOJI_COUNT})。昵称: ${displayName.substring(0, 20)}`);
                        }
                    }
                }
            }

            if (isBlocked) {
                // 彻底隐藏该元素
                tweet.style.display = 'none';
            }
        });
    }

    /**
     * 推文流过滤（主页时间线 / 用户主页）
     * 针对 article[data-testid="tweet"] 元素，DOM 结构来自截图：
     *   昵称路径：a[role="link"] > div > div[dir="ltr"] > span > span
     *   正文路径：div[data-testid="tweetText"] > span
     */
    function filterFeedTweets() {
        const articles = document.querySelectorAll('article[data-testid="tweet"]:not([data-feed-filtered="true"])');

        articles.forEach(article => {
            article.setAttribute('data-feed-filtered', 'true');

            let isBlocked = false;

            // ① 检测推文正文
            const textElement = article.querySelector('div[data-testid="tweetText"]');
            if (textElement) {
                const content = textElement.textContent || textElement.innerText;
                if (matchesKeyword(content)) {
                    isBlocked = true;
                    console.log(`[屏蔽插件] 推文正文命中关键词。预览: ${content.substring(0, 20)}...`);
                }
                if (!isBlocked && MAX_EMOJI_COUNT > 0) {
                    const emojiCount = countEmojis(textElement);
                    if (emojiCount > MAX_EMOJI_COUNT) {
                        isBlocked = true;
                        console.log(`[屏蔽插件] 推文正文 emoji 超限 (${emojiCount} > ${MAX_EMOJI_COUNT})。`);
                    }
                }
            }

            // ② 检测用户昵称（推文流用 a[role="link"] div[dir="ltr"]）
            if (!isBlocked) {
                const displayNameEl = article.querySelector('a[role="link"] div[dir="ltr"]');
                if (displayNameEl) {
                    const displayName = displayNameEl.textContent || displayNameEl.innerText;
                    if (matchesKeyword(displayName)) {
                        isBlocked = true;
                        console.log(`[屏蔽插件] 推文昵称命中关键词。昵称: ${displayName.substring(0, 20)}`);
                    }
                    if (!isBlocked && MAX_EMOJI_COUNT > 0) {
                        const emojiCount = countEmojis(displayNameEl);
                        if (emojiCount > MAX_EMOJI_COUNT) {
                            isBlocked = true;
                            console.log(`[屏蔽插件] 推文昵称 emoji 超限 (${emojiCount} > ${MAX_EMOJI_COUNT})。昵称: ${displayName.substring(0, 20)}`);
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

    // ================= 监听器 =================
    // 因为 X 是动态滚动加载的网页，我们需要监听 DOM 的变化
    const observer = new MutationObserver(() => {
        filterTweets();
        filterFeedTweets();
    });

    // 寻找 React 根节点并启动监听
    function init() {
        const targetNode = document.getElementById('react-root') || document.body;
        if (targetNode) {
            observer.observe(targetNode, {
                childList: true,
                subtree: true
            });
            // 初始页面加载时先执行一次
            filterTweets();
            filterFeedTweets();
        } else {
            // 如果页面还没准备好，500毫秒后重试
            setTimeout(init, 500);
        }
    }

    // 启动脚本
    init();
})();