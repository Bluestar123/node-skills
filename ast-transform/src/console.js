import types from '@babel/types'
import core from '@babel/core'
import pathlib from 'path'
/**
 *  第一步：先找出console节点的部分
    第二步：判断是否是这几个方法名中的某一个："log"、"info"、"warn"、"error"
    第三步：往节点的arguments中添加参数
 */
console.log(__dirname)
const code = `console.log('hello world')`

const logPlugin = {
  visitor: {
    CallExpression(path, state) {
      const { node } = path
      const { callee } = node
      if (types.isMemberExpression(callee)) {
        if (callee.object.name === 'console') {
          if (['log', 'info', 'warn', 'error'].includes(callee.property.name)) {
            // node.arguments.unshift(types.stringLiteral('prefix'))
            //找到方法名
            const { line, column } = node.loc.start //找到所处位置的行和列
            node.arguments.push(types.stringLiteral(`${line}:${column}`)) //向右边添加我们的行和列信息
            // //找到文件名
            const filename = state.file.opts.filename
            // //输出文件的相对路径
            // const relativeName = pathlib
            //   .relative(__dirname, filename)
            //   .replace(/\\/g, '/') //兼容window
            node.arguments.push(types.stringLiteral(filename)) //向右边添加我们的行和列信息
          }
        }
      }
    },
  },
}

const res = core.transform(code, {
  plugins: [logPlugin],
  filename: 'hello.js', // mock filename
})
console.log(res.code)
