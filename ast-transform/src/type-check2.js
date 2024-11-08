import core from '@babel/core'

/**
 * 第一步：先获取左侧变量的定义（age）
第二步：在获取左侧变量定义的类型（number）
第三步：获取右侧的值的类型（“12”）
第四步：判断变量的左侧变量的类型和右侧的值的类型是否相同
 */
const code = `
var a: number
a = "12"
`

function transformType(type) {
  switch (type) {
    case 'TSNumberKeyword':
    case 'NumberTypeAnnotation':
      return 'number'
    case 'TSStringKeyword':
    case 'StringTypeAnnotation':
      return 'string'
  }
}

const plugin = {
  pre(file) {
    file.set('errors', [])
  },
  post(file) {
    console.log(...file.get('errors'))
  },
  visitor: {
    AssignmentExpression(path, state) {
      const errors = state.file.get('errors')
      const { node } = path
      // 1. 获取左侧变量的定义 对象
      const leftVar = path.scope.getBinding(path.get('left'))
      // 2. 获取左侧变量定义的类型
      const leftAn = leftVar.path.get('id').getTypeAnnotation()
      const leftType = transformType(leftAn.type)
      //3 获取右侧的值的类型
      const rightType = transformType(
        path.get('right').getTypeAnnotation().type,
      )
      // 4. 判断左侧变量的类型和右侧的值的类型是否相同
      if (leftType !== rightType) {
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
