import core from '@babel/core'

const code = `var age:number="12";`

const typeMap = {
  TSNumberKeyword: 'NumericLiteral',
}

const plugin = {
  pre(file) {
    file.set('errors', [])
  },
  post(file) {
    console.log(...file.get('errors'))
  },
  visitor: {
    VariableDeclarator(path, state) {
      const errors = state.file.get('errors')
      const { node } = path
      // 1. 获取声明的类型
      const type = typeMap[node.id.typeAnnotation.typeAnnotation.type] //拿到声明的类型 TSNumberKeyword
      // 2. 获取真实值的类型
      const valueType = node.init.type //拿到真实值的类型 StringLiteral
      if (type !== valueType) {
        // get(init) 把错误提示到 init 节点值上
        errors.push(path.get('init').buildCodeFrameError(`类型不匹配`, Error))
      }
    },
  },
}

const res = core.transformSync(code, {
  plugins: [plugin],
  parserOpts: { plugins: ['typescript'] }, // 解析 ts 语法
})
console.log(res.code)
