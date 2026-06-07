import { chromium, devices } from 'playwright'
import { writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const MAPS_URL =
  'https://www.google.com/maps/place/LS+Plumbing+%26+Heating+Limited/@53.8294412,-1.3440026,17z/data=!4m15!1m8!3m7!1s0x48795cafdee3dfd7:0x1dd394594da5d668!2sLS+Plumbing+%26+Heating+Limited!8m2!3d53.8294412!4d-1.3440026!10e1!16s%2Fg%2F1tfd6h6m!3m5!1s0x48795cafdee3dfd7:0x1dd394594da5d668!8m2!3d53.8294412!4d-1.3440026!16s%2Fg%2F1tfd6h6m'

function extractIds(text) {
  const ids = new Set()
  for (const m of text.match(/gps-cs-s\/[A-Za-z0-9_-]{30,}/g) || []) ids.add(m)
  for (const m of text.match(/gpms-cs-s\/[A-Za-z0-9_-]{30,}/g) || []) ids.add(m)
  return ids
}

const browser = await chromium.launch({ channel: 'chrome', headless: true })
const page = await browser.newPage({ ...devices['iPhone 13'], locale: 'en-GB' })
const photoIds = new Set()

const ingest = (text) => extractIds(text).forEach((id) => photoIds.add(id))
page.on('response', async (res) => {
  try {
    ingest(await res.text())
  } catch { /* ignore */ }
})

await page.goto(MAPS_URL, { waitUntil: 'networkidle', timeout: 120000 })
for (const label of ['Accept all', 'Reject all']) {
  const btn = page.getByRole('button', { name: label }).first()
  if (await btn.isVisible({ timeout: 2000 }).catch(() => false)) await btn.click()
}
await page.waitForTimeout(4000)
ingest(await page.content())

// Click each carousel photo thumbnail
const photoBtns = page.locator('button[aria-label^="Photo "]')
const btnCount = await photoBtns.count()
console.log('Carousel buttons:', btnCount)
for (let i = 0; i < btnCount; i++) {
  await photoBtns.nth(i).click({ timeout: 1500 }).catch(() => {})
  await page.waitForTimeout(500)
  ingest(await page.content())
}

// Swipe through with next button repeatedly
for (let i = 0; i < 25; i++) {
  await page.locator('button[aria-label="Next"]').first().click({ timeout: 500 }).catch(() => {})
  await page.keyboard.press('ArrowRight').catch(() => {})
  await page.waitForTimeout(400)
  ingest(await page.content())
}

// Reviews for additional photos
const reviewsTab = page.getByRole('tab', { name: /reviews/i })
if (await reviewsTab.isVisible({ timeout: 2000 }).catch(() => false)) {
  await reviewsTab.click()
  await page.waitForTimeout(2500)
  for (let i = 0; i < 20; i++) {
    await page.evaluate(() => window.scrollBy(0, 700))
    await page.waitForTimeout(350)
    ingest(await page.content())
  }
}

const images = [...photoIds].map((id) => `https://lh3.googleusercontent.com/${id}=w1920-h1440-k-no`)
writeFileSync(join(__dirname, 'google-media.json'), JSON.stringify({ images, count: images.length }, null, 2))
console.log('Total photos:', images.length)
await browser.close()
