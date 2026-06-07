import { chromium } from 'playwright'
import { readFileSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const existing = JSON.parse(readFileSync(join(__dirname, 'google-media.json'), 'utf8'))
const MAPS_URL =
  'https://www.google.com/maps/place/LS+Plumbing+%26+Heating+Limited/@53.8294412,-1.3440026,17z/data=!4m15!1m8!3m7!1s0x48795cafdee3dfd7:0x1dd394594da5d668!2sLS+Plumbing+%26+Heating+Limited!8m2!3d53.8294412!4d-1.3440026!10e1!16s%2Fg%2F1tfd6h6m!3m5!1s0x48795cafdee3dfd7:0x1dd394594da5d668!8m2!3d53.8294412!4d-1.3440026!16s%2Fg%2F1tfd6h6m'

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage()
const videos = new Set(existing.videos || [])

page.on('response', (res) => {
  const url = res.url()
  const type = res.headers()['content-type'] || ''
  if (url.includes('googlevideo.com') || url.includes('videoplayback') || url.includes('.mp4') || type.includes('video')) {
    videos.add(url)
  }
})

await page.goto(MAPS_URL, { waitUntil: 'networkidle', timeout: 90000 })
await page.waitForTimeout(3000)

for (const label of ['Accept all', 'Reject all']) {
  const btn = page.getByRole('button', { name: label }).first()
  if (await btn.isVisible({ timeout: 1500 }).catch(() => false)) await btn.click().catch(() => {})
}

const videoTab = page.getByRole('tab', { name: /video/i }).or(page.getByRole('button', { name: /video/i }))
if (await videoTab.first().isVisible({ timeout: 3000 }).catch(() => false)) {
  await videoTab.first().click()
  await page.waitForTimeout(4000)
}

const videoEls = page.locator('video, button[aria-label*="Video"], button[aria-label*="video"]')
const vCount = await videoEls.count()
for (let i = 0; i < Math.min(vCount, 10); i++) {
  await videoEls.nth(i).click().catch(() => {})
  await page.waitForTimeout(3000)
}

await browser.close()

writeFileSync(join(__dirname, 'google-media.json'), JSON.stringify({ ...existing, videos: [...videos] }, null, 2))
console.log('videos found:', videos.size)
;[...videos].forEach((v) => console.log(v.slice(0, 150)))
