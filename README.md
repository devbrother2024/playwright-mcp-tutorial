# Playwright MCP Tutorial

AutomationExercise 웹사이트에서 회원가입 및 로그인 테스트를 위한 Playwright 자동화 테스트 프로젝트입니다.

## 📋 프로젝트 개요

이 프로젝트는 Playwright MCP(Model Context Protocol) 도구를 활용하여 실제 웹사이트에서 사용자 회원가입부터 계정 삭제까지의 전체 플로우를 자동화 테스트하는 튜토리얼 프로젝트입니다.

### 🎯 테스트 대상

- **웹사이트**: [AutomationExercise](http://automationexercise.com)

## 🚀 시작하기

### 필수 요구사항

- Node.js (v20 이상)
- npm 또는 yarn

### 설치

1. 저장소 클론

```bash
git clone <repository-url>
cd playwright-mcp-tutorial
```

2. 의존성 설치

```bash
npm install
```

3. Playwright 브라우저 설치

```bash
npx playwright install
```

## 🧪 테스트 실행

### 기본 테스트 실행

```bash
# 헤드리스 모드로 테스트 실행
npm test

# 브라우저를 보면서 테스트 실행
npm run test:headed

# UI 모드로 테스트 실행 (대화형)
npm run test:ui

# 디버그 모드로 테스트 실행
npm run test:debug
```

### 느린 모드 테스트 (시연용)

```bash
# 1초 지연으로 Chrome에서 실행
npm run test:slow

# 느린 모드 + UI
npm run test:slow:ui

# 느린 모드 + 디버그
npm run test:slow:debug
```

## 📁 프로젝트 구조

```
playwright-mcp-tutorial/
├── tests/                          # 테스트 파일들
│   ├── user-registration-login.spec.ts  # Playwright MCP 테스트 (TypeScript)
│   └── signup-login.spec.js            # 예제 테스트 (JavaScript)
├── scenario/                       # 테스트 시나리오 문서
│   └── signup-login.md             # 회원가입/로그인 시나리오
├── test-results/                   # 테스트 결과 (자동 생성)
├── playwright-report/              # HTML 리포트 (자동 생성)
├── playwright.config.ts            # Playwright 설정
├── package.json                    # 프로젝트 설정 및 의존성
└── README.md                       # 프로젝트 문서
```

## 🔧 설정

### Playwright 설정 (`playwright.config.ts`)

- **멀티 브라우저 지원**: Chrome, Firefox, Safari
- **병렬 실행**: 성능 최적화
- **스크린샷/비디오**: 실패 시 자동 캡처
- **느린 모드**: 시연 및 디버깅용
- **팝업/광고 차단**: 안정적인 테스트 환경

## 🛠️ 개발 가이드

### 디버깅 팁

```bash
# 특정 테스트만 실행
npx playwright test user-registration-login.spec.ts

# 브라우저 개발자 도구와 함께 실행
npx playwright test --debug

# 특정 브라우저에서만 실행
npx playwright test --project=chromium
```

## 📊 리포트

테스트 실행 후 HTML 리포트가 자동으로 생성됩니다:

```bash
# 리포트 보기
npx playwright show-report
```

리포트에는 다음이 포함됩니다:

- 테스트 결과 요약
- 실패한 테스트의 스크린샷
- 실행 비디오 (실패 시)
- 상세한 실행 로그
