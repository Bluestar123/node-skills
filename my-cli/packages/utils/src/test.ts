// import { getNpmInfo } from './versionUtils.js'

// const main = async () => {
//   const info = await getNpmInfo('create-vite')
//   console.log(info)
// }

// console.log(main())
import NpmPackage from './npmPackage.js'

import path from 'node:path'

async function main() {
  const pkg = new NpmPackage({
    targetPath: path.join(import.meta.dirname, '../aaa'),
    // name: 'create-vite',
    name: '@babel/core',
  })

  if (await pkg.exists()) {
    pkg.update()
  } else {
    pkg.install()
  }

  console.log(23423423)
  console.log(await pkg.getPackageJSON())
}

main()
