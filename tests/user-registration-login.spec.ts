import { test, expect } from '@playwright/test'

test.describe('회원가입 및 로그인 테스트', () => {
    test('AutomationExercise 웹사이트에서 회원가입, 로그인, 계정 삭제까지의 전체 사용자 플로우를 테스트합니다', async ({
        page
    }) => {
        // 현재 시간을 기반으로 고유한 이메일 생성
        const timestamp = new Date()
            .toISOString()
            .replace(/[-:.]/g, '')
            .slice(0, 14)
        const testEmail = `testuser${timestamp}@example.com`
        const testPassword = 'testpassword123'
        const testName = '테스트사용자'

        // 1. http://automationexercise.com 접속
        await page.goto('http://automationexercise.com')

        // 2. 홈페이지 확인
        await expect(page).toHaveTitle('Automation Exercise')
        await expect(
            page.getByRole('heading', { name: 'AutomationExercise', level: 1 })
        ).toBeVisible()

        // 3. 'Signup / Login' 버튼 클릭
        await page.getByRole('link', { name: ' Signup / Login' }).click()

        // 4. 'New User Signup!' 문구 확인
        await expect(
            page.getByRole('heading', { name: 'New User Signup!' })
        ).toBeVisible()

        // 5. 이름과 이메일 입력
        await page.getByPlaceholder('Name').fill(testName)
        await page
            .locator('form')
            .filter({ hasText: 'Signup' })
            .getByPlaceholder('Email Address')
            .fill(testEmail)

        // 6. 'Signup' 버튼 클릭
        await page.getByRole('button', { name: 'Signup' }).click()

        // 7. 'ENTER ACCOUNT INFORMATION' 문구 확인
        await expect(page.getByText('Enter Account Information')).toBeVisible()

        // 8. 필수 정보 입력
        // 성별 선택 (Mr.)
        await page.getByLabel('Mr.').check()

        // 비밀번호 입력
        await page.getByLabel('Password *').fill(testPassword)

        // 생년월일 선택
        await page.locator('#days').selectOption('15')
        await page.locator('#months').selectOption('5')
        await page.locator('#years').selectOption('1990')

        // 9. 뉴스레터 구독 체크박스 선택
        await page.getByLabel('Sign up for our newsletter!').check()

        // 10. 제휴사 특별 제안 수신 체크박스 선택
        await page
            .getByLabel('Receive special offers from our partners!')
            .check()

        // 주소 정보 입력
        await page.getByLabel('First name *').fill('테스트')
        await page.getByLabel('Last name *').fill('사용자')
        await page
            .getByLabel(
                'Address * (Street address, P.O. Box, Company name, etc.)'
            )
            .fill('123 테스트 거리')
        await page.getByLabel('State *').fill('테스트주')
        await page.getByLabel('City *').fill('테스트시')
        await page.locator('#zipcode').fill('12345')
        await page.getByLabel('Mobile Number *').fill('01012345678')

        // 11. 'Create Account' 버튼 클릭
        await page.getByRole('button', { name: 'Create Account' }).click()

        // 12. 'ACCOUNT CREATED!' 문구 확인
        await expect(
            page.getByRole('heading', { name: 'Account Created!' })
        ).toBeVisible()
        await expect(
            page.getByText(
                'Congratulations! Your new account has been successfully created!'
            )
        ).toBeVisible()

        // 13. 'Continue' 버튼 클릭
        await page.getByRole('link', { name: 'Continue' }).click()

        // 14. 'Logged in as 사용자명' 문구 확인
        await expect(page.getByText('Logged in as')).toBeVisible()
        await expect(page.getByText(testName)).toBeVisible()

        // 15. 로그아웃 후 재로그인
        // 로그아웃
        await page.getByRole('link', { name: ' Logout' }).click()

        // 재로그인
        await page
            .locator('form')
            .filter({ hasText: 'Login' })
            .getByPlaceholder('Email Address')
            .fill(testEmail)
        await page.getByRole('textbox', { name: 'Password' }).fill(testPassword)
        await page.getByRole('button', { name: 'Login' }).click()

        // 로그인 확인
        await expect(page.getByText('Logged in as')).toBeVisible()
        await expect(page.getByText(testName)).toBeVisible()

        // 16. 'Delete Account' 버튼 클릭
        await page.getByRole('link', { name: ' Delete Account' }).click()

        // 17. 'ACCOUNT DELETED!' 문구 확인 후 'Continue' 버튼 클릭
        await expect(
            page.getByRole('heading', { name: 'Account Deleted!' })
        ).toBeVisible()
        await expect(
            page.getByText('Your account has been permanently deleted!')
        ).toBeVisible()

        // Continue 버튼 클릭하여 홈페이지로 돌아가기
        await page.getByRole('link', { name: 'Continue' }).click()

        // 로그아웃 상태 확인 (Signup / Login 버튼이 다시 표시됨)
        await expect(
            page.getByRole('link', { name: ' Signup / Login' })
        ).toBeVisible()
    })
})
