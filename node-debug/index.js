import fs from 'fs/promises'

async function fn() {
  const fileContent = await fs.readFile('./package.json', {
    encoding: 'utf-8',
  })
  await fs.writeFile('./package-demo.json', fileContent)
}
fn()
