// fs-extra 拓展了 fs 方法，例如 copyDir

import fse from 'fs-extra'
fse.copySync('./src', './dest/a')
