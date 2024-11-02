import { add } from './calc.js'

/**
 * sourcemap 两个作用
 * 1.直接源码断点调试 （ts文件内）
 * 2.直接显示源码错误信息,正确显示源码位置 （ts文件内）
 * node 12 开始支持 --enable-source-maps 配置
 * node --enable-source-maps ./dist/sourcemap-demo/index.js
 *
 * node12之前的需要使用source-map-support
 * node -r a.cjs b.cjs
 * -r require， 会在 b.cjs 文件执行之前，先执行 a.cjs 文件, 一般是初始化相关工作
 */

const test = () => {
  console.log(add(1, 2))
}
function main() {
  test()
}

main()
