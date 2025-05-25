# 노트앱 회원가입 및 로그인 테스트

[Practice Expand Testing](https://practice.expandtesting.com/notes/app/) 노트 애플리케이션에서 회원가입 후 로그인이 정상적으로 동작하는지 확인하는 Playwright 자동화 테스트입니다.

## 테스트 시나리오

### 주요 테스트 케이스

1. **회원가입 후 로그인 테스트**

    - 노트앱 메인 페이지 접속
    - 회원가입 페이지로 이동
    - 회원가입 폼 작성 (이메일, 이름, 비밀번호, 비밀번호 확인)
    - 회원가입 완료 확인
    - 로그인 페이지로 이동
    - 로그인 폼 작성 (이메일, 비밀번호)
    - 로그인 성공 확인
    - 로그아웃 테스트

2. **잘못된 로그인 정보 테스트**
    - 존재하지 않는 계정으로 로그인 시도
    - 오류 처리 확인

## 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. Playwright 브라우저 설치

```bash
npx playwright install
```

### 3. 테스트 실행

#### 기본 테스트 실행 (헤드리스 모드)

```bash
npm test
```

#### 브라우저 UI와 함께 테스트 실행

```bash
npm run test:headed
```

#### Playwright UI 모드로 테스트 실행

```bash
npm run test:ui
```

#### 디버그 모드로 테스트 실행

```bash
npm run test:debug
```

#### 느린 모드로 테스트 실행 (각 액션 사이에 1초 지연)

```bash
# 느린 모드 + 브라우저 표시
npm run test:slow

# 느린 모드 + UI 모드
npm run test:slow:ui

# 느린 모드 + 디버그 모드
npm run test:slow:debug
```

#### 사용자 정의 느린 모드 (지연 시간 조정)

```bash
# 500ms 지연
SLOW_MO=500 npm run test:headed

# 2초 지연
SLOW_MO=2000 npm run test:headed
```

## 테스트 파일 구조

```
├── tests/
│   └── notes-app-registration-login.spec.ts  # 메인 테스트 파일
├── playwright.config.ts                      # Playwright 설정
├── package.json                              # 프로젝트 의존성
└── README.md                                 # 프로젝트 설명
```

## 테스트 특징

- **고유한 테스트 데이터**: 각 테스트 실행마다 타임스탬프를 사용하여 고유한 이메일 주소 생성
- **다중 브라우저 지원**: Chromium, Firefox, WebKit에서 테스트 실행
- **스크린샷 및 비디오**: 실패한 테스트의 스크린샷과 비디오 자동 수집
- **상세한 검증**: 각 단계별로 UI 요소와 상태 확인
- **느린 모드 지원**: 테스트 과정을 천천히 관찰할 수 있는 느린 모드 제공

## 테스트 데이터

- **이메일**: `test.user.{timestamp}@example.com`
- **이름**: `Test User`
- **비밀번호**: `TestPassword123!`

## 주의사항

- 테스트는 실제 웹사이트 (https://practice.expandtesting.com/notes/app/)에서 실행됩니다
- 각 테스트 실행마다 새로운 계정이 생성됩니다
- 네트워크 연결이 필요합니다
- 느린 모드는 테스트 시간을 늘리므로 개발/디버깅 목적으로만 사용하세요
