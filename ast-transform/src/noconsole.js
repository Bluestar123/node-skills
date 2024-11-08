import core from '@babel/core' //babel核心模块

const code = `
var a = 1;
console.log(a);
var b = 2;
`
// no-console 禁用 console fix=true 代表自动修复
const eslintPlugin = ({ fix }) => {
  return {
    // 遍历前
    pre(file) {
      file.set('errors', [])
    },
    post(file) {
      const errors = file.get('errors')
      console.log(...errors)
    },

    visitor: {
      CallExpression(path, state) {
        const errors = state.file.get('errors')
        const { node } = path
        if (node.callee.object?.name === 'console') {
          errors.push(path.buildCodeFrameError(`禁止使用console`, Error))
          if (fix) {
            // 启动了就删除该节点
            path.parentPath.remove()
          }
        }
      },
    },
  }
}

const res = core.transformSync(code, {
  plugins: [eslintPlugin({ fix: true })],
  filename: 'hello.js', // mock filename
})

console.log(res.code)
