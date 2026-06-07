import { chromium } from 'playwright'
import { writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const MAPS_URL =
  'https://www.google.com/maps/place/LS+Plumbing+%26+Heating+Limited/@53.8294412,-1.3440026,17z/data=!4m15!1m8!3m7!1s0x48795cafdee3dfd7:0x1dd394594da5d668!2sLS+Plumbing+%26+Heating+Limited!8m2!3d53.8294412!4d-1.3440026!10e1!16s%2Fg%2F1tfd6h6m!3m5!1s0x48795cafdee3dfd7:0x1dd394594da5d668!8m2!3d53.8294412!4d-1.3440026!16s%2Fg%2F1tfd6h6m'

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({
  userAgent:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  locale: 'en-GB',
})
const page = await context.newPage()

const images = new Set()
const videos = new Set()
const allUrls = []

const track = (url) => {
  allUrls.push(url)
  if (!url.includes('googleusercontent.com') && !url.includes('googlevideo') && !url.includes('ggpht')) return
  if (url.includes('googlevideo') || url.includes('videoplayback') || url.includes('.mp4')) {
    videos.add(url)
    return
  }
  if (url.includes('=s40') || url.includes('=s60') || url.includes('=s120') || url.includes('-k-no-')) return
  if (url.includes('/a/') || url.includes('/b/') || url.includes('gps-cs-s') || url.includes('gpms-cs-s') || url.includes('/p/AF1Qip')) {
    images.add(url.split('=')[0] + '=w1600-h1200-k-no')
  }
}

page.on('request', (req) => track(req.url()))
page.on('response', (res) => track(res.url()))

await page.goto(MAPS_URL, { waitUntil: 'networkidle', timeout: 90000 })
await page.waitForTimeout(4000)

for (const label of ['Accept all', 'Reject all']) {
  const btn = page.getByRole('button', { name: label }).first()
  if (await btn.isVisible({ timeout: 2000 }).catch(() => false)) {
    await btn.click().catch(() => {})
    await page.waitForTimeout(1500)
  }
}

// Click main place photo thumbnail
const photoThumb = page.locator('button[aria-label*="Photo"], button[aria-label*="photo"], img[src*="googleusercontent"]').first()
if (await photoThumb.isVisible({ timeout: 5000 }).catch(() => false)) {
  await photoThumb.click().catch(() => {})
  await page.waitForTimeout(3000)
}

// Try Photos tab in place panel
const photosTab = page.getByRole('tab', { name: /photos/i }).or(page.getByRole('button', { name: /photos/i }))
if (await photosTab.first().isVisible({ timeout: 3000 }).catch(() => false)) {
  await photosTab.first().click().catch(() => {})
  await page.waitForTimeout(3000)
}

// Cycle through gallery
for (let i = 0; i < 15; i++) {
  const next = page.locator('button[aria-label="Next"], button[aria-label="Next photo"], button[jsaction*="next"]').first()
  if (await next.isVisible({ timeout: 1000 }).catch(() => false)) {
    await next.click().catch(() => {})
    await page.waitForTimeout(1200)
  } else {
    await page.keyboard.press('ArrowRight').catch(() => {})
    await page.waitForTimeout(800)
  }
}

// Collect visible images
const imgSrcs = await page.evaluate(() =>
  [...document.querySelectorAll('img, video, source')].map((el) => el.src || el.getAttribute('src') || '').filter(Boolean),
)
imgSrcs.forEach(track)

await page.screenshot({ path: join(__dirname, 'maps-debug.png'), fullPage: true })
await browser.close()

const filtered = [...images].filter((u) => u.length > 100)
writeFileSync(
  join(__dirname, 'google-media.json'),
  JSON.stringify({ images: filtered, videos: [...videos], allGoogleUrls: allUrls.filter((u) => u.includes('googleusercontent') || u.includes('googlevideo')) }, null, 2),
)
console.log('images', filtered.length, 'videos', videos.size)
filtered.forEach((u) => console.log(u.slice(0, 130)))
;[...videos].forEach((u) => console.log('VID', u.slice(0, 130)))
