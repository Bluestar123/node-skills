import semver from 'semver'

// 版本比较
if (semver.valid('1.2.3')) {
  console.log('1.2.3 is a valid version')
} else {
  console.log('1.2.3 is not a valid version')
}

if (semver.gt('1.2.3', '4.5.6')) {
  console.log('有新版本可以安装')
} else {
  console.log('当前版本已经是最新版本')
}

if (semver.lte(process.version, 'v24.0.0')) {
  console.log('当前 Node.js 版本低于 v24.0.0')
}
