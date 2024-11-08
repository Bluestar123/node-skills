import core from '@babel/core'
import types from '@babel/types'

//传入的模版代码帮助我们生成对应的节点
// 不用官网对照 ast 对比，直接生成对应的节点
import template from '@babel/template'

//四种声明函数的方式
// function sum(a, b) {
//   return a + b
// }
// const multiply = function (a, b) {
//   return a * b
// }
// const minus = (a, b) => a - b
// class Calculator {
//   divide(a, b) {
//     return a / b
//   }
// }
// 得到的样子
// import loggerLib from 'logger'

// function sum(a, b) {
//   loggerLib()
//   return a + b
// }
// const multiply = function (a, b) {
//   loggerLib()
//   return a * b
// }
// const minus = (a, b) => {
//   loggerLib()
//   return a - b
// }
// class Calculator {
//   divide(a, b) {
//     loggerLib()
//     return a / b
//   }
// }
/**
 * 第一步：先判断源代码中是否引入了logger库
  第二步：如果引入了，就找出导入的变量名，后面直接使用该变量名即可
  第三步：如果没有引入我们就在源代码的顶部引用一下
  第四步：在函数中插入引入的函数
 */

const code = `
//四种声明函数的方式
  function sum(a, b) {
    return a + b;
  }
  const multiply = function (a, b) {
    return a * b;
  };
  const minus = (a, b) => a - b;
  class Calculator {
    divide(a, b) {
      return a / b;
    }
  }
`

function help(path, state) {
  const { loggerNode } = state
  const { node } = path
  if (types.isBlockStatement(node.body)) {
    // 在函数体的第一个节点插入
    node.body.body.unshift(loggerNode)
  } else {
    // 箭头函数
    //生成一个块级语句，在第一行中插入loggerNode，然后return 之前的内容
    node.body = types.blockStatement([
      loggerNode,
      types.returnStatement(node.body),
    ])
  }
}
const loggerPlugin = {
  visitor: {
    // state是当前插件的状态，整个生命周期 共享数据
    Program(path, state) {
      let loggerId
      // 遍历当前节点的子节点
      path.traverse({
        ImportDeclaration(path) {
          const { node } = path
          if (node.source.value === 'logger') {
            // 源文件已经倒入了
            const specifier = node.specifiers[0]
            loggerId = specifier.local.name
            path.stop()
          }
        },
      })

      if (!loggerId) {
        // 没有导入，需要顶层插入

        // 自定义名防止冲突
        //如源代码中已经有别的命名叫loggerLib，那它就会变成_loggerLib
        loggerId = path.scope.generateUid('loggerLib')
        // path.node.body.unshift(
        //   types.importDeclaration(
        //     [types.importDefaultSpecifier(types.identifier(loggerId))],
        //     types.stringLiteral('logger'), // 从 logger 引入
        //   ),
        // )
        path.node.body.unshift(
          template.statement(`import ${loggerId} from 'logger'`)(),
        )
      }

      //loggerId就是loggerLib，第二个参数【】代表执行该函数无传参
      // 存储在 state 上
      // state.loggerNode = types.expressionStatement(
      //   types.callExpression(types.identifier(loggerId), []),
      // )
      state.loggerNode = template.statement(`${loggerId}()`)()
    },
    //四种函数方式，这是插件能够识别的语法，这是四种函数的type
    FunctionDeclaration: help,
    FunctionExpression: help,
    ArrowFunctionExpression: help,
    ClassMethod: help,
  },
}

const res = core.transformSync(code, {
  plugins: [loggerPlugin],
})
console.log(res.code)
