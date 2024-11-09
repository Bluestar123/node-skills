import path from 'path'
import { transformFile } from './transform.js'

async function fn() {
  const filePath = path.join(process.cwd(), './code.ts')
  const code = await transformFile(filePath)
  console.log(code)
}

fn()
