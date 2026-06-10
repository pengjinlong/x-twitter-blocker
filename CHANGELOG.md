# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-06-10

### Added
- Initial release
- Tampermonkey userscript (`index.js`) for keyword-based tweet filtering
- Chrome Extension (`chrome-extension/`) with:
  - Visual popup UI for keyword management
  - Chrome Storage sync for persistent keyword lists
  - Real-time update messaging between popup and content script
- MutationObserver-based dynamic content detection
- Support for both x.com and twitter.com domains
- Multilingual documentation (Chinese, English, Japanese, Korean, German, Spanish)
- MIT License
