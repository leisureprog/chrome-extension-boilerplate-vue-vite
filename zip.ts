import fs from 'fs'
import archiver from 'archiver'

const output = fs.createWriteStream('extension.zip')
const archive = archiver('zip', {
  zlib: { level: 9 },
})

output.on('close', () => {
  console.log(`${archive.pointer()} байт записано в архив`)
})

archive.on('error', (err) => {
  throw err
})

archive.pipe(output)

archive.directory('dist/', false)
archive.finalize()