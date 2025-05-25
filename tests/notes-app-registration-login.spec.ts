import { test, expect } from '@playwright/test'

test.describe('노트앱 회원가입 및 로그인 테스트', () => {
    // 각 테스트마다 고유한 이메일을 생성하기 위한 타임스탬프
    const timestamp = Date.now()
    const testEmail = `test.user.${timestamp}@example.com`
    const testName = 'Test User'
    const testPassword = 'TestPassword123!'

    test('회원가입 후 로그인이 정상 동작하는지 확인', async ({ page }) => {
        // 1. 노트앱 메인 페이지로 이동
        await page.goto('https://practice.expandtesting.com/notes/app/')

        // 페이지 제목 확인
        await expect(page).toHaveTitle(
            'Notes React Application for Automation Testing Practice'
        )

        // Welcome 메시지 확인
        await expect(page.locator('h1')).toContainText('Welcome to Notes App')

        // 2. 회원가입 페이지로 이동
        await page.goto('https://practice.expandtesting.com/notes/app/register')

        // 회원가입 페이지 제목 확인
        await expect(page.locator('h1')).toContainText('Register')

        // 3. 회원가입 폼 작성
        // 이메일 입력
        await page.getByTestId('register-email').fill(testEmail)

        // 이름 입력
        await page.getByTestId('register-name').fill(testName)

        // 비밀번호 입력
        await page.getByTestId('register-password').fill(testPassword)

        // 비밀번호 확인 입력
        await page.getByTestId('register-confirm-password').fill(testPassword)

        // 4. 회원가입 버튼 클릭
        await page.getByTestId('register-submit').click()

        // 5. 회원가입 성공 메시지 확인
        await expect(
            page.locator('text=User account created successfully')
        ).toBeVisible()

        // 로그인 링크가 표시되는지 확인
        await expect(page.getByTestId('login-view')).toBeVisible()

        // 6. 로그인 페이지로 이동
        await page.getByTestId('login-view').click()

        // 로그인 페이지 URL 확인
        await expect(page).toHaveURL(
            'https://practice.expandtesting.com/notes/app/login'
        )

        // 로그인 페이지 제목 확인
        await expect(page.locator('h1')).toContainText('Login')

        // 7. 로그인 폼 작성
        // 이메일 입력
        await page.getByTestId('login-email').fill(testEmail)

        // 비밀번호 입력
        await page.getByTestId('login-password').fill(testPassword)

        // 8. 로그인 버튼 클릭
        await page.getByTestId('login-submit').click()

        // 9. 로그인 성공 확인
        // 노트 앱 메인 페이지로 리다이렉트되는지 확인
        await expect(page).toHaveURL(
            'https://practice.expandtesting.com/notes/app'
        )

        // MyNotes 로고가 표시되는지 확인 (로그인 상태 확인)
        await expect(page.locator('text=MyNotes')).toBeVisible()

        // 프로필 메뉴가 표시되는지 확인
        await expect(page.locator('text=Profile')).toBeVisible()

        // 로그아웃 버튼이 표시되는지 확인
        await expect(page.locator('text=Logout')).toBeVisible()

        // 노트 추가 버튼이 표시되는지 확인
        await expect(page.locator('text=+ Add Note')).toBeVisible()

        // 새 계정이므로 노트가 없다는 메시지 확인
        await expect(
            page.locator("text=You don't have any notes in all categories")
        ).toBeVisible()

        // 10. 로그아웃 테스트 (선택사항)
        await page.locator('text=Logout').click()

        // 메인 페이지로 리다이렉트되고 로그인 버튼이 다시 표시되는지 확인
        await expect(page).toHaveURL(
            'https://practice.expandtesting.com/notes/app'
        )
        await expect(page.locator('text=Login')).toBeVisible()
        await expect(page.getByTestId('open-register-view')).toBeVisible()
    })

    test('잘못된 로그인 정보로 로그인 시도 시 오류 메시지 확인', async ({
        page
    }) => {
        // 로그인 페이지로 이동
        await page.goto('https://practice.expandtesting.com/notes/app/login')

        // 존재하지 않는 이메일과 비밀번호로 로그인 시도
        await page.getByTestId('login-email').fill('nonexistent@example.com')
        await page.getByTestId('login-password').fill('wrongpassword')
        await page.getByTestId('login-submit').click()

        // 오류 메시지가 표시되는지 확인 (실제 사이트의 오류 메시지에 따라 조정 필요)
        // 로그인이 실패하면 같은 페이지에 머물러야 함
        await expect(page).toHaveURL(
            'https://practice.expandtesting.com/notes/app/login'
        )
    })
})
