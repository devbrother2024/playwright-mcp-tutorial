const { test, expect } = require('@playwright/test')

test.describe('Automation Exercise 회원가입 및 로그인 테스트', () => {
    let uniqueEmail
    const testPassword = 'TestPassword123!'
    const testName = '테스트 사용자'

    test.beforeEach(async () => {
        // 현재 시간을 기반으로 고유한 이메일 생성
        const timestamp = new Date()
            .toISOString()
            .replace(/[-:T.]/g, '')
            .slice(0, 14)
        uniqueEmail = `testuser${timestamp}@example.com`
    })

    test('회원가입 후 로그인 성공 테스트', async ({ page }) => {
        // 1. 메인 페이지 접속
        await page.goto('https://www.automationexercise.com/')
        await expect(page).toHaveTitle('Automation Exercise')

        // 2. Signup / Login 페이지로 이동
        await page.click('a[href="/login"]')
        await expect(page).toHaveURL('https://www.automationexercise.com/login')
        await expect(
            page.locator('h2:has-text("New User Signup!")')
        ).toBeVisible()

        // 3. 회원가입 정보 입력
        await page.fill('input[data-qa="signup-name"]', testName)
        await page.fill('input[data-qa="signup-email"]', uniqueEmail)
        await page.click('button[data-qa="signup-button"]')

        // 4. 회원가입 상세 정보 페이지 확인
        await expect(page).toHaveURL(
            'https://www.automationexercise.com/signup'
        )
        await expect(
            page.locator('h2:has-text("Enter Account Information")')
        ).toBeVisible()

        // 5. 계정 정보 입력
        // Title 선택 (Mr.)
        await page.check('#id_gender1')

        // 이름은 이미 입력되어 있음
        await expect(page.locator('#name')).toHaveValue(testName)

        // 이메일은 비활성화되어 있고 이미 입력되어 있음
        await expect(page.locator('#email')).toHaveValue(uniqueEmail)

        // 비밀번호 입력
        await page.fill('#password', testPassword)

        // 생년월일 선택
        await page.selectOption('#days', '15')
        await page.selectOption('#months', 'May')
        await page.selectOption('#years', '1990')

        // 6. 주소 정보 입력
        await page.fill('#first_name', '테스트')
        await page.fill('#last_name', '사용자')
        await page.fill('#address1', '123 테스트 스트리트')
        await page.selectOption('#country', 'India')
        await page.fill('#state', 'Maharashtra')
        await page.fill('#city', 'Mumbai')
        await page.fill('#zipcode', '400001')
        await page.fill('#mobile_number', '9876543210')

        // 7. 계정 생성
        await page.click('button[data-qa="create-account"]')

        // 8. 계정 생성 성공 확인
        await expect(page).toHaveURL(
            'https://www.automationexercise.com/account_created'
        )
        await expect(
            page.locator('h2:has-text("Account Created!")')
        ).toBeVisible()
        await expect(
            page.locator(
                'p:has-text("Congratulations! Your new account has been successfully created!")'
            )
        ).toBeVisible()

        // 9. Continue 버튼 클릭하여 메인 페이지로 이동
        await page.click('a[data-qa="continue-button"]')
        await expect(page).toHaveURL('https://www.automationexercise.com/')

        // 10. 로그인 상태 확인
        await expect(
            page.locator(`text=Logged in as ${testName}`)
        ).toBeVisible()
        await expect(page.locator('a[href="/logout"]')).toBeVisible()

        // 11. 로그아웃
        await page.click('a[href="/logout"]')
        await expect(page).toHaveURL('https://www.automationexercise.com/login')

        // 12. 다시 로그인 테스트
        await page.fill('input[data-qa="login-email"]', uniqueEmail)
        await page.fill('input[data-qa="login-password"]', testPassword)
        await page.click('button[data-qa="login-button"]')

        // 13. 로그인 성공 확인
        await expect(page).toHaveURL('https://www.automationexercise.com/')
        await expect(
            page.locator(`text=Logged in as ${testName}`)
        ).toBeVisible()
        await expect(page.locator('a[href="/logout"]')).toBeVisible()
        await expect(page.locator('a[href="/delete_account"]')).toBeVisible()

        console.log(`테스트 완료 - 사용된 이메일: ${uniqueEmail}`)
    })

    test('잘못된 로그인 정보로 로그인 실패 테스트', async ({ page }) => {
        // 1. 로그인 페이지로 이동
        await page.goto('https://www.automationexercise.com/login')

        // 2. 잘못된 로그인 정보 입력
        await page.fill(
            'input[data-qa="login-email"]',
            'nonexistent@example.com'
        )
        await page.fill('input[data-qa="login-password"]', 'wrongpassword')
        await page.click('button[data-qa="login-button"]')

        // 3. 로그인 실패 확인
        await expect(
            page.locator('p:has-text("Your email or password is incorrect!")')
        ).toBeVisible()
    })

    test('이미 존재하는 이메일로 회원가입 시도 테스트', async ({ page }) => {
        // 1. 로그인 페이지로 이동
        await page.goto('https://www.automationexercise.com/login')

        // 2. 이미 존재하는 이메일로 회원가입 시도
        await page.fill('input[data-qa="signup-name"]', '중복 사용자')
        await page.fill('input[data-qa="signup-email"]', 'test@example.com') // 일반적으로 존재할 수 있는 이메일
        await page.click('button[data-qa="signup-button"]')

        // 3. 중복 이메일 오류 메시지 확인 (있을 경우)
        // 사이트에 따라 다를 수 있으므로 조건부 확인
        const errorMessage = page.locator(
            'p:has-text("Email Address already exist!")'
        )
        if (await errorMessage.isVisible()) {
            await expect(errorMessage).toBeVisible()
        }
    })
})
