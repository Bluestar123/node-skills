//npm i @babel/core -D 里面包含了@babel/parser、@babel/traverse、@babel/generate、@babel/types等

//源代码
// const hello = () => {};
//需要修改为：
// const world = () => {};
import parser from '@babel/parser'
import traverse from '@babel/traverse'
import generator from '@babel/generator'

const code = `const hello = () => {};`
// 1. 解析代码，生成ast
const ast = parser.parse(code)
// 2. 遍历ast，找到对应节点
traverse.default(ast, {
  // traverse 会遍历树节点，只要节点的 type 在 visitor 对象中出现，变化调用该方法
  Identifier(path) {
    const { node } = path //从path中解析出当前 AST 节点
    if (node.name === 'hello') {
      node.name = 'world' //找到hello的节点，替换成world
    }
  },
})
const res = generator.default(ast, {}, code)
console.log(res.code)
