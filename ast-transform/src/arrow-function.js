import core from '@babel/core'
import arrowFunctionPlugin from 'babel-plugin-transform-es2015-arrow-functions'
import types from '@babel/types'
// const code = `
// const sum = (a, b) => {
//   return a+b
// }
// `

/**
 * 思路：
 * 第一步：找到当前箭头函数要使用哪个作用域内的this，暂时称为父作用域
 * 第二步：往父作用域中加入_this变量，也就是var _this=this
 * 第三步：找出当前箭头函数内所有用到this的地方
 * 第四步：将当前箭头函数中的this，统一替换成_this
 */

const code = `const sum = (a, b) => {
  console.log(this)
  return a+b
}`

// const res = core.transform(code, { plugins: [arrowFunctionPlugin] })
// console.log(res.code)

// 处理 this 指向
function hoistFunctionEnvironment(path) {
  //1.确定当前箭头函数要使用哪个地方的this
  const thisEnv = path.findParent((parent) => {
    return (
      (parent.isFunction() && !parent.isArrowFunctionExpression()) ||
      parent.isProgram()
    ) //要求父节点是函数且不是箭头函数，找不到就返回根节点
  })

  //2.向父作用域内放入一个_this变量
  // var _this = this
  thisEnv.scope.push({
    id: types.identifier('_this'), //生成标识符节点,也就是变量名 vat _this
    init: types.thisExpression(), //生成this节点 也就是变量值
  })

  // 3.将当前节点内的的this都收集起来
  let thisPaths = [] //获取当前节点this的路径
  //遍历当前节点的子节点
  path.traverse({
    ThisExpression(thisPath) {
      thisPaths.push(thisPath)
    },
  })
  // 4.替换当前节点内的this
  thisPaths.forEach((thisPath) => {
    thisPath.replaceWith(types.identifier('_this'))
  })
}

const visitor = {
  ArrowFunctionExpression(path) {
    const { node } = path
    hoistFunctionEnvironment(path)
    node.type = 'FunctionExpression'
    // const sum = (a, b) => a+b
    if (!types.isBlockStatement(node.body)) {
      //生成一个块语句，并将内容return
      node.body = types.blockStatement([types.returnStatement(node.body)])
    }
  },
}
let res = core.transform(code, { plugins: [{ visitor }] })
console.log(res.code)
