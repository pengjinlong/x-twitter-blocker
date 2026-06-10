// X/Twitter Keyword Blocker - Popup Script (i18n + auto-save)

// ─── Translations ─────────────────────────────────────────────────────────────
const LANGS = {
    zh: {
        subtitle:      '自动屏蔽含关键词的推文和评论',
        labelKeywords: '屏蔽关键词',
        keywordHint:   '（支持推文正文与用户显示昵称）',
        placeholder:   '输入关键词，按 Enter 添加',
        btnAdd:        '添加',
        emptyHint:     '暂无屏蔽关键词\n添加后立即生效',
        labelEmoji:    'Emoji 超限屏蔽',
        emojiLabel:    'Emoji 数量上限',
        emojiSub:      '超过此数量则屏蔽，设为 0 关闭',
        emojiOff:      '关闭',
        btnClear:      '清空全部',
        saved:         '✅ 已保存并生效',
        duplicate:     '⚠️ 该关键词已存在',
        cleared:       '已清空所有关键词',
    },
    en: {
        subtitle:      'Auto-block spam tweets and comments',
        labelKeywords: 'Blocked Keywords',
        keywordHint:   '(Matches tweet text and user display names)',
        placeholder:   'Enter keyword, press Enter to add',
        btnAdd:        'Add',
        emptyHint:     'No blocked keywords yet\nAdd one to get started',
        labelEmoji:    'Emoji Flood Detection',
        emojiLabel:    'Emoji count limit',
        emojiSub:      'Block if exceeded; 0 = disabled',
        emojiOff:      'Off',
        btnClear:      'Clear All',
        saved:         '✅ Saved & applied',
        duplicate:     '⚠️ Keyword already exists',
        cleared:       'All keywords cleared',
    },
    ja: {
        subtitle:      'スパムツイートを自动ブロック',
        labelKeywords: 'ブロックキーワード',
        keywordHint:   '（ツイート本文とユーザー表示名に対応）',
        placeholder:   'キーワードを入力して Enter',
        btnAdd:        '追加',
        emptyHint:     'キーワードがありません\n追加してください',
        labelEmoji:    'Emoji 数量チェック',
        emojiLabel:    'Emoji 上限数',
        emojiSub:      '超過するとブロック；0で無効',
        emojiOff:      '無効',
        btnClear:      '全削除',
        saved:         '✅ 保存・適用しました',
        duplicate:     '⚠️ 既に存在します',
        cleared:       '全キーワードを削除しました',
    },
    ko: {
        subtitle:      '스팸 트윗 자동 차단',
        labelKeywords: '차단 키워드',
        keywordHint:   '(트윗 본문 및 사용자 닉네임 지원)',
        placeholder:   '키워드 입력 후 Enter',
        btnAdd:        '추가',
        emptyHint:     '차단 키워드가 없습니다\n키워드를 추가하세요',
        labelEmoji:    'Emoji 초과 감지',
        emojiLabel:    'Emoji 개수 제한',
        emojiSub:      '초과 시 차단；0으로 비활성화',
        emojiOff:      '끄기',
        btnClear:      '전체 삭제',
        saved:         '✅ 저장 및 적용됨',
        duplicate:     '⚠️ 이미 존재하는 키워드',
        cleared:       '모든 키워드가 삭제됨',
    },
    de: {
        subtitle:      'Spam-Tweets automatisch blockieren',
        labelKeywords: 'Gesperrte Keywords',
        keywordHint:   '(Filtert Tweet-Texte und Anzeigenamen)',
        placeholder:   'Keyword eingeben und Enter drücken',
        btnAdd:        'Hinzufügen',
        emptyHint:     'Keine Keywords vorhanden\nKeyword hinzufügen',
        labelEmoji:    'Emoji-Überflutung',
        emojiLabel:    'Emoji-Grenzwert',
        emojiSub:      'Blockiert bei Überschreitung；0 = aus',
        emojiOff:      'Aus',
        btnClear:      'Alle löschen',
        saved:         '✅ Gespeichert & angewendet',
        duplicate:     '⚠️ Keyword existiert bereits',
        cleared:       'Alle Keywords gelöscht',
    },
    es: {
        subtitle:      'Bloquear tweets de spam automáticamente',
        labelKeywords: 'Palabras bloqueadas',
        keywordHint:   '(Filtra texto de tweet y nombre de usuario)',
        placeholder:   'Escribe y presiona Enter para añadir',
        btnAdd:        'Añadir',
        emptyHint:     'No hay palabras bloqueadas\nAñade una para empezar',
        labelEmoji:    'Detección de Emoji',
        emojiLabel:    'Límite de emojis',
        emojiSub:      'Bloquear si excede；0 = desactivado',
        emojiOff:      'Desact.',
        btnClear:      'Borrar todo',
        saved:         '✅ Guardado y aplicado',
        duplicate:     '⚠️ La palabra ya existe',
        cleared:       'Todas las palabras eliminadas',
    },
};

const DEFAULT_KEYWORDS  = ['sao货', '卖片', '加微', '打✈️', '主页'];
const DEFAULT_MAX_EMOJI = 2;
const DEFAULT_LANG      = 'zh';

// ─── State ────────────────────────────────────────────────────────────────────
let keywords     = [];
let maxEmojiCount = DEFAULT_MAX_EMOJI;
let currentLang  = DEFAULT_LANG;

// ─── DOM refs ─────────────────────────────────────────────────────────────────
const keywordListEl      = document.getElementById('keywordList');
const newKeywordInput    = document.getElementById('newKeyword');
const btnAdd             = document.getElementById('btnAdd');
const btnClear           = document.getElementById('btnClear');
const btnEmojiMinus      = document.getElementById('btnEmojiMinus');
const btnEmojiPlus       = document.getElementById('btnEmojiPlus');
const emojiCountDisplay  = document.getElementById('emojiCountDisplay');
const statusBar          = document.getElementById('statusBar');

// ─── i18n helpers ─────────────────────────────────────────────────────────────
function t(key) {
    return (LANGS[currentLang] || LANGS[DEFAULT_LANG])[key] || '';
}

function applyLang() {
    document.getElementById('subtitle').textContent      = t('subtitle');
    document.getElementById('labelKeywords').textContent = t('labelKeywords');
    document.getElementById('keywordHint').textContent    = t('keywordHint');
    document.getElementById('labelEmoji').textContent    = t('labelEmoji');
    document.getElementById('emojiLabel').textContent    = t('emojiLabel');
    document.getElementById('emojiSub').textContent      = t('emojiSub');
    newKeywordInput.placeholder                          = t('placeholder');
    btnAdd.textContent                                   = t('btnAdd');
    btnClear.textContent                                 = t('btnClear');

    // Update active lang button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });

    renderList();
    renderEmojiCount();
}

// ─── Render ───────────────────────────────────────────────────────────────────
function escapeHtml(text) {
    const d = document.createElement('div');
    d.appendChild(document.createTextNode(text));
    return d.innerHTML;
}

function renderList() {
    if (keywords.length === 0) {
        const lines = t('emptyHint').split('\n');
        keywordListEl.innerHTML =
            `<div class="empty-hint">${lines.map(l => escapeHtml(l)).join('<br>')}</div>`;
        return;
    }
    keywordListEl.innerHTML = keywords.map((kw, idx) => `
        <div class="keyword-item">
            <span class="keyword-text">${escapeHtml(kw)}</span>
            <button class="btn-remove" data-index="${idx}" title="×">×</button>
        </div>
    `).join('');

    keywordListEl.querySelectorAll('.btn-remove').forEach(btn => {
        btn.addEventListener('click', () => {
            keywords.splice(parseInt(btn.dataset.index), 1);
            renderList();
            saveAndApply();
        });
    });
}

function renderEmojiCount() {
    const isOff = maxEmojiCount === 0;
    emojiCountDisplay.textContent = isOff ? t('emojiOff') : String(maxEmojiCount);
    emojiCountDisplay.className   = isOff ? 'off' : '';
    btnEmojiMinus.disabled        = maxEmojiCount <= 0;
}

// ─── Status bar ───────────────────────────────────────────────────────────────
let statusTimer = null;
function showStatus(msg, type = '') {
    statusBar.textContent = msg;
    statusBar.className   = 'status-bar ' + type;
    clearTimeout(statusTimer);
    statusTimer = setTimeout(() => {
        statusBar.textContent = '';
        statusBar.className   = 'status-bar';
    }, 2200);
}

// ─── Core: save + notify content script ──────────────────────────────────────
function saveAndApply(statusMsg) {
    chrome.storage.sync.set({ blockedKeywords: keywords, maxEmojiCount, uiLang: currentLang }, () => {
        if (chrome.runtime.lastError) return;
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0] && (tabs[0].url?.includes('x.com') || tabs[0].url?.includes('twitter.com'))) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    type: 'UPDATE_SETTINGS',
                    keywords,
                    maxEmojiCount,
                });
            }
        });
        if (statusMsg !== false) showStatus(statusMsg ?? t('saved'), 'success');
    });
}

// ─── Add keyword ──────────────────────────────────────────────────────────────
function addKeyword() {
    const val = newKeywordInput.value.trim();
    if (!val) return;
    if (keywords.includes(val)) {
        showStatus(t('duplicate'), 'error');
        return;
    }
    keywords.unshift(val);
    newKeywordInput.value = '';
    renderList();
    saveAndApply();
}

// ─── Init: load from storage ──────────────────────────────────────────────────
chrome.storage.sync.get(['blockedKeywords', 'maxEmojiCount', 'uiLang'], (result) => {
    keywords = result.blockedKeywords?.length ? [...result.blockedKeywords] : [...DEFAULT_KEYWORDS];
    maxEmojiCount = typeof result.maxEmojiCount === 'number' ? result.maxEmojiCount : DEFAULT_MAX_EMOJI;
    currentLang   = LANGS[result.uiLang] ? result.uiLang : detectBrowserLang();
    applyLang();
});

function detectBrowserLang() {
    const nav = (navigator.language || 'zh').toLowerCase();
    if (nav.startsWith('zh')) return 'zh';
    if (nav.startsWith('ja')) return 'ja';
    if (nav.startsWith('ko')) return 'ko';
    if (nav.startsWith('de')) return 'de';
    if (nav.startsWith('es')) return 'es';
    return 'en';
}

// ─── Event listeners ─────────────────────────────────────────────────────────
btnAdd.addEventListener('click', addKeyword);
newKeywordInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') addKeyword(); });

btnEmojiMinus.addEventListener('click', () => {
    if (maxEmojiCount > 0) {
        maxEmojiCount--;
        renderEmojiCount();
        saveAndApply(false); // silent save (no toast for each button press)
    }
});
btnEmojiPlus.addEventListener('click', () => {
    maxEmojiCount++;
    renderEmojiCount();
    saveAndApply(false);
});

// Show saved status on emoji buttons after a short debounce
let emojiDebounce = null;
function emojiSaveWithFeedback() {
    clearTimeout(emojiDebounce);
    emojiDebounce = setTimeout(() => showStatus(t('saved'), 'success'), 600);
}
btnEmojiMinus.addEventListener('click', emojiSaveWithFeedback);
btnEmojiPlus.addEventListener('click', emojiSaveWithFeedback);

btnClear.addEventListener('click', () => {
    if (!keywords.length) return;
    keywords = [];
    renderList();
    saveAndApply(t('cleared'));
});

// Language switcher
document.getElementById('langSwitcher').addEventListener('click', (e) => {
    const btn = e.target.closest('.lang-btn');
    if (!btn) return;
    currentLang = btn.dataset.lang;
    chrome.storage.sync.set({ uiLang: currentLang });
    applyLang();
});
