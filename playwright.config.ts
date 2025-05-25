import { defineConfig, devices } from '@playwright/test'

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
    testDir: './tests',
    /* 병렬로 실행할 테스트 수 */
    fullyParallel: true,
    /* CI에서 실패한 테스트 재시도 금지 */
    forbidOnly: !!process.env.CI,
    /* CI에서 재시도 횟수 */
    retries: process.env.CI ? 2 : 0,
    /* 병렬 워커 수 */
    workers: process.env.CI ? 1 : undefined,
    /* 리포터 설정 */
    reporter: 'html',
    /* 모든 테스트에 공통으로 적용할 설정 */
    use: {
        /* 느린 모드 설정 - SLOW_MO 환경변수가 설정된 경우에만 활성화 */
        ...(process.env.SLOW_MO && {
            launchOptions: {
                slowMo: parseInt(process.env.SLOW_MO) || 1000
            }
        }),
        /* 실패한 테스트의 스크린샷 수집 */
        screenshot: 'only-on-failure',
        /* 실패한 테스트의 비디오 수집 */
        video: 'retain-on-failure',
        /* 베이스 URL */
        baseURL: 'https://practice.expandtesting.com',
        /* 추적 수집 설정 */
        trace: 'on-first-retry',
        /* 브라우저 컨텍스트 설정 - 팝업 차단 */
        contextOptions: {
            /* 지리적 위치 차단 */
            geolocation: undefined,
            /* 알림 등 권한 차단 */
            permissions: ['notifications'],
            /* 광고 차단을 위한 추가 설정 */
            bypassCSP: true
        },
        /* 광고 및 팝업 차단 설정 */
        extraHTTPHeaders: {
            'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.8'
        },
        /* 팝업 자동 차단 */
        ignoreHTTPSErrors: true
    },

    /* 다양한 브라우저에서 테스트 실행 설정 */
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                /* Chrome 특정 설정 - 광고 및 팝업 차단 */
                launchOptions: {
                    args: [
                        '--disable-popup-blocking=false',
                        '--disable-extensions-except',
                        '--disable-extensions',
                        '--disable-plugins',
                        '--disable-dev-shm-usage',
                        '--no-sandbox',
                        '--disable-setuid-sandbox',
                        '--disable-web-security',
                        '--disable-features=VizDisplayCompositor',
                        '--block-new-web-contents'
                    ]
                }
            }
        },

        {
            name: 'firefox',
            use: {
                ...devices['Desktop Firefox'],
                /* Firefox 특정 설정 */
                launchOptions: {
                    firefoxUserPrefs: {
                        'dom.popup_maximum': 0,
                        'privacy.popups.showBrowserMessage': false,
                        'dom.disable_open_during_load': true,
                        'browser.link.open_newwindow': 1,
                        'browser.link.open_newwindow.restriction': 0
                    }
                }
            }
        },

        {
            name: 'webkit',
            use: {
                ...devices['Desktop Safari'],
                /* Safari 특정 설정 */
                launchOptions: {
                    args: ['--disable-popup-blocking=false']
                }
            }
        }

        /* 모바일 브라우저 테스트 */
        // {
        //   name: 'Mobile Chrome',
        //   use: { ...devices['Pixel 5'] },
        // },
        // {
        //   name: 'Mobile Safari',
        //   use: { ...devices['iPhone 12'] },
        // },

        /* 브랜드 브라우저 테스트 */
        // {
        //   name: 'Microsoft Edge',
        //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
        // },
        // {
        //   name: 'Google Chrome',
        //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
        // },
    ]

    /* 로컬 개발 서버 실행 설정 */
    // webServer: {
    //   command: 'npm run start',
    //   url: 'http://127.0.0.1:3000',
    //   reuseExistingServer: !process.env.CI,
    // },
})
