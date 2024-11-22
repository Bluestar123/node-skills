import { glob } from 'glob'
// 文件匹配
const main = async () => {
  const files = await glob('**', {
    cwd: process.cwd(),
    nodir: true,
    ignore: 'node_modules/**',
  })
  console.log(files)
}

main()
