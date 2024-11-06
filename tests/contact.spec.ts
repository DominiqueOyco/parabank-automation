import { test, expect } from '@playwright/test';

const name = "Jax";
const email = "Jax@test.com";
const phone = "11111111";
const message = "This is a test";

test.beforeEach(async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/contact.htm');
})

test('Verify Customer Care title and subtext are available in the contact page', async ({ page }) => {
    const customerCareTitle = page.locator('.title')
    await expect(customerCareTitle).toContainText('Customer Care')
    await expect(page.locator('#rightPanel')).toContainText('Email support is available by filling out the following form.')
})

test('Verify Customer Care form is available in contact page', async ({ page }) => {
    await expect(page.locator('#contactForm')).toBeVisible()
})

test('Verify Name field is editable in contact page', async ({ page }) => {
    await expect(page.locator('input#name')).toBeEditable()
})

test('Verify Email field is editable in contact page', async ({ page }) => {
    await expect(page.locator('input#email')).toBeEditable()
})

test('Verify Phone field is editable in contact page', async ({ page }) => {
    await expect(page.locator('input#phone')).toBeEditable()
})

test('Verify Message field is editable in contact page', async ({ page }) => {
    await expect(page.locator('#message')).toBeEditable()
})

test('Verify Send to Customer Care CTA is visible contact page', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Send to Customer Care' })).toBeVisible()
})

test('Verify user is able to send the form in contact page', async ({ page }) => {
    await page.locator('input#name').fill(name)
    await page.locator('input#email').fill(email)
    await page.locator('input#phone').fill(phone)
    await page.locator('#message').fill(message)
    await page.getByRole('button', { name: 'Send to Customer Care' }).click()
    await expect(page.getByRole('heading', { name: 'Customer Care' })).toBeVisible()
    await expect(page.getByText('Thank you ' + name)).toBeVisible()
    await expect(page.getByText('A Customer Care Representative will be contacting you.')).toBeVisible()
})

test('Verify user is not able to send the form in contact page if all required fields are blank', async ({ page }) => {
    await page.locator('input#name').fill('')
    await page.locator('input#email').fill('')
    await page.locator('input#phone').fill('')
    await page.locator('#message').fill('')
    await page.getByRole('button', { name: 'Send to Customer Care' }).click()
    await expect(page.getByText('Name is required.')).toBeVisible()
    await expect(page.getByText('Email is required.')).toBeVisible()
    await expect(page.getByText('Phone is required.')).toBeVisible()
    await expect(page.getByText('Message is required.')).toBeVisible()
})




