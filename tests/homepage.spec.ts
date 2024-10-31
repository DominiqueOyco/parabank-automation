import { test, expect } from '@playwright/test';

const userNameCredential = 'Jax8899'
const passWordCredential = 'Jax1234'

test.beforeEach(async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/');
})

test('Verify header contains Para Bank logo, subtext, and images', async ({ page }) => {
  const parabankLogo = page.getByAltText('ParaBank')
  const headerSubText = page.locator('[class="caption"]')
  expect(parabankLogo).toBeVisible
  await expect(headerSubText).toBeVisible();
  await expect(headerSubText).toHaveText('Experience the difference')
})

test('Verify home button directs user to the login page', async ({ page }) => {
  await page.locator('.button > li:nth-child(1) > a:nth-child(1)').click()
  await page.waitForTimeout(500)
  expect(page.url()).toBe('https://parabank.parasoft.com/parabank/index.htm')
})

test('Verify about us button directs user to about us page', async ({ page }) => {
  await page.locator(".button > li:nth-child(2) > a:nth-child(1)").click()
  await page.waitForTimeout(500)
  expect(page.url()).toBe('https://parabank.parasoft.com/parabank/about.htm')
})

test('Verify contact button directs user to the contact page', async ({ page }) => {
  await page.locator(".button > li:nth-child(3) > a:nth-child(1)").click()
  await page.waitForTimeout(500)
  expect(page.url()).toBe('https://parabank.parasoft.com/parabank/contact.htm')
})

test('Verify about us link directs user to about us page', async ({ page }) => {
  const aboutUsLink = await page.locator(".leftmenu > li:nth-child(2) > a:nth-child(1)").click()
  await page.waitForTimeout(500)
  expect(page.url()).toBe('https://parabank.parasoft.com/parabank/about.htm')
})

test('Verify services link directs user to services page', async ({ page }) => {
  const servicesLink = await page.locator(".leftmenu > li:nth-child(3) > a:nth-child(1)").click()
  await page.waitForTimeout(500)
  expect(page.url()).toBe('https://parabank.parasoft.com/parabank/services.htm')
})

test('Verify products link directs user to products page', async ({ page }) => {
  const productsLink = await page.locator(".leftmenu > li:nth-child(4) > a:nth-child(1)").click()
  await page.waitForTimeout(500)
  expect(page.url()).toBe('https://www.parasoft.com/products/')
})

test('Verify locations link directs user to locations page', async ({ page }) => {
  const locationsLink = await page.locator(".leftmenu > li:nth-child(5) > a:nth-child(1)").click()
  await page.waitForTimeout(500)
  expect(page.url()).toBe('https://www.parasoft.com/solutions/')
})

test('Verify Customer Login is available', async ({ page }) => {
  const customerLoginText = page.getByText('Customer Login')
  const usernameField = page.locator('[class="input"][name="username"]');
  const passwordField = page.locator('[class="input"][name="password"]');
  await expect(customerLoginText).toContainText('Customer Login');
  await expect(usernameField).toBeVisible()
  await expect(usernameField).toBeEditable()
  await expect(passwordField).toBeVisible()
  await expect(passwordField).toBeEditable()
});

test('Verify user is able to create a new account', async ({ page }) => {
  await page.getByRole('link', { name: 'Register' }).click()
  await page.waitForTimeout(500)
  //TODO: create another class that generates random first name, last name, address, phone number, and ssn
  await page.locator('[id="customer.firstName"][name="customer.firstName"]').fill('Jax');
  await page.locator('[id="customer.lastName"][name="customer.lastName"]').fill('Xajus');
  await page.locator('[id="customer.address.street"][name="customer.address.street"]').fill('1234 Howard Street');
  await page.locator('[id="customer.address.city"][name="customer.address.city"]').fill('Tampa');
  await page.locator('[id="customer.address.state"][name="customer.address.state"]').fill('FL');
  await page.locator('[id="customer.address.zipCode"][name="customer.address.zipCode"]').fill('98765');
  await page.locator('[id="customer.phoneNumber"][name="customer.phoneNumber"]').fill('8888888');
  await page.locator('[id="customer.ssn"][name="customer.ssn"]').fill('1234');
  await page.locator('[id="customer.username"][name="customer.username"]').fill(userNameCredential);
  await page.locator('[id="customer.password"][name="customer.password"]').fill(passWordCredential);
  await page.locator('[id="repeatedPassword"][name="repeatedPassword"]').fill(passWordCredential);
  await page.getByRole('button', { name: "Register" }).click();
  expect(page.url()).toBe('https://parabank.parasoft.com/parabank/register.htm');
})

test('Verify User is able to login when valid credentials are provided in Customer Login page', async ({ page }) => {
  await page.locator('[class="input"][name="username"]').fill('Jax888');
  await page.locator('[class="input"][name="password"]').fill('1234');
  await page.getByRole('button', { name: "Log In" }).click();
  expect(page.url()).toBe('https://parabank.parasoft.com/parabank/overview.htm');
})

test('Verify User is not able to login when invalid credentials are provided in Customer Login page', async ({ page }) => {

})

test('Verify User is able change credentials', async ({ page }) => {

})