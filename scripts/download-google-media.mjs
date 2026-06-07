import { readFileSync, writeFileSync, createWriteStream, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import https from 'https'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '..', 'public', 'images')
mkdirSync(outDir, { recursive: true })

const media = JSON.parse(readFileSync(join(__dirname, 'google-media.json'), 'utf8'))

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(dest)
    https
      .get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          file.close()
          return download(res.headers.location, dest).then(resolve).catch(reject)
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`))
          return
        }
        res.pipe(file)
        file.on('finish', () => file.close(() => resolve(dest)))
      })
      .on('error', reject)
  })
}

const manifest = []

for (let i = 0; i < media.images.length; i++) {
  const url = media.images[i]
  const dest = join(outDir, `gallery-${String(i + 1).padStart(2, '0')}.jpg`)
  try {
    await download(url, dest)
    manifest.push({ file: `/images/gallery-${String(i + 1).padStart(2, '0')}.jpg`, url })
    console.log('OK', dest)
  } catch (err) {
    console.error('FAIL', url.slice(0, 80), err.message)
  }
}

writeFileSync(join(__dirname, 'media-manifest.json'), JSON.stringify({ images: manifest, videos: media.videos || [] }, null, 2))
