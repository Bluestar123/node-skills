//从 npm 仓库下载模版到本地的临时目录，这时候就可以用 npminstall 这个包

import npminstall from 'npminstall'

const main = async () => {
  //安装 chalk 最新版本到 dest 目录下
  // 实现的是pnpm 逻辑，软连接
  await npminstall({
    root: process.cwd() + '/dest',
    // storeDir: process.cwd() + '/node_modules',
    registry: 'https://registry.npmjs.org',
    pkgs: [{ name: 'vue', version: '2.6.10' }],
  })
}

main()
