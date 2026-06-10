# X/Twitter 키워드 차단기

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![Platform](https://img.shields.io/badge/platform-Chrome%20%7C%20Tampermonkey-orange.svg)

**언어:**
[🇨🇳 中文](../README.md) · [🇺🇸 English](README_en.md) · [🇯🇵 日本語](README_ja.md) · [🇰🇷 한국어](README_ko.md) · [🇩🇪 Deutsch](README_de.md) · [🇪🇸 Español](README_es.md)

</div>

---

## 📖 소개

**X/Twitter 키워드 차단기**는 X(구 Twitter)에서 특정 키워드가 포함된 트윗과 댓글을 자동으로 숨겨주는 가볍고 강력한 브라우저 도구입니다. **Chrome 확장 프로그램**과 **Tampermonkey 유저스크립트** 두 가지 방식을 모두 지원합니다.

> [!IMPORTANT]
> **기본 키워드 목록은 중국어**로 작성되어 있으며 중국어 스팸 패턴을 대상으로 합니다. 이 도구를 사용하기 전에 **반드시 본인의 언어로 키워드를 설정해야 합니다** — 그렇지 않으면 비중국어 콘텐츠에 대해 차단기가 작동하지 않습니다. (키워드 필터링은 **트윗 본문** 및 **사용자 닉네임** 모두 지원합니다)
>
> - **Chrome 확장 프로그램**: 확장 아이콘 클릭 → 키워드 추가 (설정은 자동으로 저장 및 적용됩니다)
> - **Tampermonkey**: 스크립트의 `BLOCKED_KEYWORDS` 배열을 편집하고 필요에 따라 `MAX_EMOJI_COUNT`를 설정하세요

### ✨ 주요 기능

- 🚫 **키워드 필터링** — 본문 또는 사용자 닉네임에 설정된 키워드가 포함된 트윗·댓글 자동 숨김
- ⚡ **실시간 처리** — `MutationObserver`로 스크롤 로딩 콘텐츠도 처리
- 💾 **설정 영구 저장** — Chrome 확장 버전은 키워드 설정을 브라우저 로컬에 자동으로 저장
- 🎨 **시각적 관리 UI** — Chrome 확장은 팝업 UI로 키워드를 쉽게 관리
- 🪶 **경량·무의존성** — 순수 Vanilla JS, 페이지 성능에 영향 없음
- 🔒 **개인정보 보호** — 모든 처리가 로컬에서 이루어지며 데이터 전송 없음

---

## 🚀 두 가지 사용 방법

---

### 방법 1: Chrome 확장 프로그램 (권장)

코드 수정 없이 팝업 UI로 키워드를 관리할 수 있습니다.

#### 설치 방법

**1. 저장소 다운로드**

```bash
git clone https://github.com/pengjinlong/x-twitter-blocker.git
```

**2. Chrome 확장 관리 페이지 열기**

주소창에 입력하여 접속:

```
chrome://extensions/
```

**3. 개발자 모드 활성화**

페이지 우측 상단의 **「개발자 모드」** 스위치를 켭니다.

**4. 확장 프로그램 로드**

**「압축해제된 확장 프로그램을 로드합니다」** 를 클릭하고, 프로젝트의 `chrome-extension/` 폴더를 선택합니다.

**5. 완료!**

[x.com](https://x.com) 또는 [twitter.com](https://twitter.com)에 접속한 후, 브라우저 툴바의 확장 아이콘을 클릭하여 키워드를 관리하세요.

#### 사용법

| 동작 | 설명 |
|------|------|
| 확장 아이콘 클릭 | 설정 팝업 열기 |
| 키워드 입력 + 「추가」 클릭 | 새 차단 키워드 추가 (Enter 키 가능, 자동으로 저장 및 적용) |
| 키워드 옆 `×` 클릭 | 해당 키워드 삭제 (자동으로 저장 및 적용) |
| 「전체 삭제」 클릭 | 모든 키워드 삭제 |
| Emoji 기준치의 `−` / `+` 클릭 | emoji 과다 차단 기준치 조정 (자동 저장, 기본값 2, 0으로 비활성화) |

> **Emoji 과다 감지 안내**: X/Twitter의 스팸 계정은 닉네임이나 게시물에 대량의 emoji를 넣어 스팸성 콘텐츠를 비렍니다. 이 기능은 Twitter가 렌더링하는 emoji 이미지와 Unicode emoji 문자를 모두 카운트하여 기준치 초과 시 자동으로 숨깁니다.

---

### 방법 2: Tampermonkey 유저스크립트

Tampermonkey가 이미 설치되어 있고 코드를 직접 편집하고 싶은 사용자에게 적합합니다.

#### 설치 방법

**1. Tampermonkey 설치**

브라우저 확장 스토어에서 [Tampermonkey](https://www.tampermonkey.net/)를 설치합니다.

**2. 스크립트 설치**

- Tampermonkey 대시보드 열기
- **「+」** 를 클릭하여 새 스크립트 생성
- [`index.js`](../index.js) 전체 내용을 붙여넣기
- `Ctrl + S` 로 저장

**3. 키워드 및 Emoji 기준치 설정**

스크립트 상단의 설정 구역에서 다음 두 항목을 수정합니다:

```javascript
// 차단 키워드 목록
const BLOCKED_KEYWORDS = [
    '스팸단어',
    '차단할단어',
    // 여기에 추가
];

// emoji 과다 체크 기준치 (0으로 설정하면 비활성화)
const MAX_EMOJI_COUNT = 2;
```

**4. 완료!**

X/Twitter 페이지를 새로 고침하면 즉시 적용됩니다.

---

## 📄 라이선스

이 프로젝트는 [MIT License](../LICENSE)로 공개되어 있습니다.

---

<div align="center">

⭐ 유용하다면 Star를 눌러주세요!

</div>
