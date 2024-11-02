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
  expect(page.url()).toBe('https://parabank.parasoft.com/parabank/index.htm')
})

test('Verify about us button directs user to about us page', async ({ page }) => {
  await page.locator(".button > li:nth-child(2) > a:nth-child(1)").click()
  expect(page.url()).toBe('https://parabank.parasoft.com/parabank/about.htm')
})

test('Verify contact button directs user to the contact page', async ({ page }) => {
  await page.locator(".button > li:nth-child(3) > a:nth-child(1)").click()
  expect(page.url()).toBe('https://parabank.parasoft.com/parabank/contact.htm')
})

test('Verify about us link directs user to about us page', async ({ page }) => {
  await page.locator(".leftmenu > li:nth-child(2) > a:nth-child(1)").click()
  expect(page.url()).toBe('https://parabank.parasoft.com/parabank/about.htm')
})

test('Verify services link directs user to services page', async ({ page }) => {
  await page.locator(".leftmenu > li:nth-child(3) > a:nth-child(1)").click()
  expect(page.url()).toBe('https://parabank.parasoft.com/parabank/services.htm')
})

test('Verify products link directs user to products page', async ({ page }) => {
  await page.locator(".leftmenu > li:nth-child(4) > a:nth-child(1)").click()
  expect(page.url()).toBe('https://www.parasoft.com/products/')
})

test('Verify locations link directs user to locations page', async ({ page }) => {
  await page.locator(".leftmenu > li:nth-child(5) > a:nth-child(1)").click()
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
  expect(page.url()).toBe('https://parabank.parasoft.com/parabank/login.htm');
})

test('Verify User is not able to login when invalid credentials are provided in Customer Login page', async ({ page }) => {
  await page.locator('[class="input"][name="username"]').fill('');
  await page.locator('[class="input"][name="password"]').fill('');
  await page.getByRole('button', { name: "Log In" }).click();
  expect(page.url()).toBe('https://parabank.parasoft.com/parabank/login.htm');
  const loginErrorText = page.locator('.title')
  const loginSubText = page.locator('.error')
  await expect(loginErrorText).toContainText('Error!')
  await expect(loginSubText).toContainText('Please enter a username and password.')
})

test('Verify User is directed to lookup page when "Forgot login info?" is clicked', async ({ page }) => {
  await page.getByRole('link', { name: 'Forgot login info?' }).click()
  await page.waitForTimeout(500)
  expect(page.url()).toBe('https://parabank.parasoft.com/parabank/lookup.htm')
})

test('Verify User is able to lookup credentials', async ({ page }) => {
  await page.getByRole('link', { name: 'Forgot login info?' }).click()
  await page.locator('[id="firstName"][name="firstName"]').fill('Jax');
  await page.locator('[id="lastName"][name="lastName"]').fill('Xajus');
  await page.locator('[id="address.street"][name="address.street"]').fill('1234 Howard Street');
  await page.locator('[id="address.city"][name="address.city"]').fill('Tampa');
  await page.locator('[id="address.state"][name="address.state"]').fill('FL');
  await page.locator('[id="address.zipCode"][name="address.zipCode"]').fill('98765');
  await page.locator('[id="ssn"][name="ssn"]').fill('1234');
  await page.getByRole('button', { name: "Find My Login Info" }).click();
  const lookupTitleText = page.locator('.title')
  await expect(lookupTitleText).toContainText('Customer Lookup')
  await expect(page.getByText('Your login information was located successfully. You are now logged in.')).toBeVisible()
  await expect(page.getByText('Username: Jax8899')).toBeVisible()
  await expect(page.getByText('Password: Jax1234')).toBeVisible()
})

test('Verify user is not able to lookup credentials when all required fields are blank', async ({ page }) => {
  await page.getByRole('link', { name: 'Forgot login info?' }).click()
  await page.locator('[id="firstName"][name="firstName"]').fill('');
  await page.locator('[id="lastName"][name="lastName"]').fill('');
  await page.locator('[id="address.street"][name="address.street"]').fill('');
  await page.locator('[id="address.city"][name="address.city"]').fill('');
  await page.locator('[id="address.state"][name="address.state"]').fill('');
  await page.locator('[id="address.zipCode"][name="address.zipCode"]').fill('');
  await page.locator('[id="ssn"][name="ssn"]').fill('');
  await page.getByRole('button', { name: "Find My Login Info" }).click();
  await expect(page.getByText('First name is required.')).toBeVisible()
  await expect(page.getByText('Last name is required.')).toBeVisible()
  await expect(page.getByText('Address is required.')).toBeVisible()
  await expect(page.getByText('City is required.')).toBeVisible()
  await expect(page.getByText('State is required.')).toBeVisible()
  await expect(page.getByText('Zip Code is required.')).toBeVisible()
  await expect(page.getByText('Social Security Number is required.')).toBeVisible()
})

test('Verify user is not able to lookup credentials', async ({ page }) => {
  await page.getByRole('link', { name: 'Forgot login info?' }).click()
  await page.locator('[id="firstName"][name="firstName"]').fill('e');
  await page.locator('[id="lastName"][name="lastName"]').fill('e');
  await page.locator('[id="address.street"][name="address.street"]').fill('e');
  await page.locator('[id="address.city"][name="address.city"]').fill('e');
  await page.locator('[id="address.state"][name="address.state"]').fill('e');
  await page.locator('[id="address.zipCode"][name="address.zipCode"]').fill('00000');
  await page.locator('[id="ssn"][name="ssn"]').fill('0000');
  await page.getByRole('button', { name: "Find My Login Info" }).click();
  const lookupErrorText = page.locator('.title')
  const lookupSubText = page.locator('.error')
  await expect(lookupErrorText).toContainText('Error!')
  await expect(lookupSubText).toContainText('The customer information provided could not be found.')
})

test('Verify footer links are available', async ({ page }) => {
  await expect(page.locator('#footerPanel > ul:nth-child(1) > li:nth-child(1) > a:nth-child(1)')).toBeVisible();
  await expect(page.locator('#footerPanel > ul:nth-child(1) > li:nth-child(2) > a:nth-child(1)')).toBeVisible();
  await expect(page.locator('#footerPanel > ul:nth-child(1) > li:nth-child(3) > a:nth-child(1)')).toBeVisible();
  await expect(page.locator('#footerPanel > ul:nth-child(1) > li:nth-child(4) > a:nth-child(1)')).toBeVisible();
  await expect(page.locator('#footerPanel > ul:nth-child(1) > li:nth-child(5) > a:nth-child(1)')).toBeVisible();
  await expect(page.locator('#footerPanel > ul:nth-child(1) > li:nth-child(6) > a:nth-child(1)')).toBeVisible();
  await expect(page.locator('#footerPanel > ul:nth-child(1) > li:nth-child(7) > a:nth-child(1)')).toBeVisible();
  await expect(page.locator('#footerPanel > ul:nth-child(1) > li:nth-child(8) > a:nth-child(1)')).toBeVisible();
})

test('Verify footer Home link redirects user to the homepage', async ({ page }) => {
  await page.locator("#footerPanel > ul:nth-child(1) > li:nth-child(1) > a:nth-child(1)").click()
  expect(page.url()).toBe('https://parabank.parasoft.com/parabank/index.htm')
})

test('Verify footer About Us link redirects user to the about us page', async ({ page }) => {
  await page.locator("#footerPanel > ul:nth-child(1) > li:nth-child(2) > a:nth-child(1)").click()
  expect(page.url()).toBe('https://parabank.parasoft.com/parabank/about.htm')
})

test('Verify footer Services link redirects user to the services page', async ({ page }) => {
  await page.locator("#footerPanel > ul:nth-child(1) > li:nth-child(3) > a:nth-child(1)").click()
  expect(page.url()).toBe('https://parabank.parasoft.com/parabank/services.htm')
})

test('Verify footer Products link redirects user to the products page', async ({ page }) => {
  await page.locator("#footerPanel > ul:nth-child(1) > li:nth-child(4) > a:nth-child(1)").click()
  expect(page.url()).toBe('https://www.parasoft.com/products/')
})

test('Verify footer Locations link redirects user to the solutions', async ({ page }) => {
  await page.locator("#footerPanel > ul:nth-child(1) > li:nth-child(5) > a:nth-child(1)").click()
  expect(page.url()).toBe('https://www.parasoft.com/solutions/')
})

test('Verify footer Forums link redirects user to the forums page', async ({ page }) => {
  await page.locator("#footerPanel > ul:nth-child(1) > li:nth-child(6) > a:nth-child(1)").click()
  expect(page.url()).toBe('https://forums.parasoft.com/')
})

test('Verify footer Sitemap link redirects user to the sitemap', async ({ page }) => {
  await page.locator("#footerPanel > ul:nth-child(1) > li:nth-child(7) > a:nth-child(1)").click()
  expect(page.url()).toBe('https://parabank.parasoft.com/parabank/sitemap.htm')
})

test('Verify footer Contact Us link redirects user to the Contact Us page', async ({ page }) => {
  await page.locator("#footerPanel > ul:nth-child(1) > li:nth-child(8) > a:nth-child(1)").click()
  expect(page.url()).toBe('https://parabank.parasoft.com/parabank/contact.htm')
})

test('Verify footer texts are present', async ({ page }) => {
  await expect(page.getByText('© Parasoft. All rights reserved.')).toBeVisible()
  await expect(page.locator('.visit > li:nth-child(1)')).toContainText('Visit us at:')
  await expect(page.locator('.visit > li:nth-child(2) > a:nth-child(1)')).toContainText('www.parasoft.com')
  const [newParaSoftTab] = await Promise.all([ //clicking the link opens in new tab
    page.waitForEvent('popup'),
    page.click('.visit > li:nth-child(2) > a:nth-child(1)')
  ]);
  expect(newParaSoftTab.url()).toBe('https://www.parasoft.com/')
})

