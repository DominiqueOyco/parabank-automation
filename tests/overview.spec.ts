import { test, expect } from '@playwright/test';

const userNameCredential = 'Jax8899'
const passWordCredential = 'Jax1234'

test.beforeEach(async ({ page }) => {
    //TODO: POM -> Create a public method and call to perform task on multiple files
    await page.goto('https://parabank.parasoft.com/');
    await page.locator('[class="input"][name="username"]').fill(userNameCredential);
    await page.locator('[class="input"][name="password"]').fill(passWordCredential);
    await page.getByRole('button', { name: "Log In" }).click();
})

test('Verify account services links are available', async ({ page }) => {
    await expect(page.locator('#leftPanel > ul:nth-child(3) > li:nth-child(1) > a:nth-child(1)')).toBeVisible();
    await expect(page.locator('#leftPanel > ul:nth-child(3) > li:nth-child(2) > a:nth-child(1)')).toBeVisible();
    await expect(page.locator('#leftPanel > ul:nth-child(3) > li:nth-child(3) > a:nth-child(1)')).toBeVisible();
    await expect(page.locator('#leftPanel > ul:nth-child(3) > li:nth-child(4) > a:nth-child(1)')).toBeVisible();
    await expect(page.locator('#leftPanel > ul:nth-child(3) > li:nth-child(5) > a:nth-child(1)')).toBeVisible();
    await expect(page.locator('#leftPanel > ul:nth-child(3) > li:nth-child(6) > a:nth-child(1)')).toBeVisible();
    await expect(page.locator('#leftPanel > ul:nth-child(3) > li:nth-child(7) > a:nth-child(1)')).toBeVisible();
    await expect(page.locator('#leftPanel > ul:nth-child(3) > li:nth-child(8) > a:nth-child(1)')).toBeVisible();
})

test('Verify Open New Account link directs user to open account page', async ({ page }) => {
    await page.locator('#leftPanel > ul:nth-child(3) > li:nth-child(1) > a:nth-child(1)').click()
    expect(page.url()).toBe('https://parabank.parasoft.com/parabank/openaccount.htm')
    await expect(page.locator('#openAccountForm .title')).toContainText('Open New Account')
})

test('Verify Accounts Overview link directs user to accounts overview page', async ({ page }) => {
    await page.locator('#leftPanel > ul:nth-child(3) > li:nth-child(2) > a:nth-child(1)').click()
    expect(page.url()).toBe('https://parabank.parasoft.com/parabank/overview.htm')
})

test('Verify Transfer Funds link directs user to transfer funds page', async ({ page }) => {
    await page.locator('#leftPanel > ul:nth-child(3) > li:nth-child(3) > a:nth-child(1)').click()
    expect(page.url()).toBe('https://parabank.parasoft.com/parabank/transfer.htm')
})

test('Verify Bill Pay link directs user to bill pay page', async ({ page }) => {
    await page.locator('#leftPanel > ul:nth-child(3) > li:nth-child(4) > a:nth-child(1)').click()
    expect(page.url()).toBe('https://parabank.parasoft.com/parabank/billpay.htm')
})

test('Verify Find Transactions link directs user to find transaction page', async ({ page }) => {
    await page.locator('#leftPanel > ul:nth-child(3) > li:nth-child(5) > a:nth-child(1)').click()
    expect(page.url()).toBe('https://parabank.parasoft.com/parabank/findtrans.htm')
})

test('Verify Update Contact Info link directs user to update profile page', async ({ page }) => {
    await page.locator('#leftPanel > ul:nth-child(3) > li:nth-child(6) > a:nth-child(1)').click()
    expect(page.url()).toBe('https://parabank.parasoft.com/parabank/updateprofile.htm')
})

test('Verify Request Loan link directs user to loan request page', async ({ page }) => {
    await page.locator('#leftPanel > ul:nth-child(3) > li:nth-child(7) > a:nth-child(1)').click()
    expect(page.url()).toBe('https://parabank.parasoft.com/parabank/requestloan.htm')
})

test('Verify Log out link directs user to the login page', async ({ page }) => {
    await page.locator('#leftPanel > ul:nth-child(3) > li:nth-child(8) > a:nth-child(1)').click()
    expect(page.url()).toBe('https://parabank.parasoft.com/parabank/index.htm')
})

