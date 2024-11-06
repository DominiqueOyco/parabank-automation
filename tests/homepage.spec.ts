import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/');
})

test.describe('Homepage Verification', () => {
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
})

test.describe('Footer Verification', () => {
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
})