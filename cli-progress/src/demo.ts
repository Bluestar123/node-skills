import https from 'node:https';
import fs from 'node:fs';
import { ProgressBar } from './progressBar.js';
const URLS = {
  linux: 'https://storage.googleapis.com/chromium-browser-snapshots/Linux_x64/970501/chrome-linux.zip',
  darwin: 'https://storage.googleapis.com/chromium-browser-snapshots/Mac/970501/chrome-mac.zip',
  win32: 'https://storage.googleapis.com/chromium-browser-snapshots/Win/970501/chrome-win32.zip',
  win64: 'https://storage.googleapis.com/chromium-browser-snapshots/Win_x64/970501/chrome-win32.zip',
};

const bar= new ProgressBar()
let value = 0
https.get(URLS.darwin, res => {
  const file = fs.createWriteStream('./download/chromium.zip')
  res.pipe(file) // 写入文件, 文件才能使用。如果不加这一行，文件不会被写入，能下载，但是不能使用
  const totalBytes = parseInt(res.headers['content-length']!, 10)
  bar.start(totalBytes, 0)
  res.on('data', (chunk) => {
    value += chunk.length
    bar.update(value)
    if (value > bar.getTotalSize()) {
      bar.stop()
    }
  })
})