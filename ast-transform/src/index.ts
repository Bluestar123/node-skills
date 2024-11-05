import { PluginObj, transformFromAstSync } from '@babel/core'
import parser from '@babel/parser'
import template from '@babel/template'
import { isObjectExpression } from '@babel/types'
import prettier from 'prettier'

const sourceCode = `
import { Module } from '@nestjs/common';
@Module({})
export class AaaModule {}
`

function myPlugin(): PluginObj {
  return {
    //在 visitor 里声明要处理的节点，然后在回调函数里对节点做修改
    visitor: {
      // 找到 import 语句
      Program(path: any) {
        let index = 0 // 记录当前位置 当前行
        while (path.node.body[index].type === 'ImportDeclaration') {
          index++
        }
        const ast = template.statement(
          "import { AaaController } from './aaa.controller';",
        )()
        path.node.body.splice(index, 0, ast)
      },
      // 找到装饰器
      Decorator(path: any) {
        const decoratorName = path.node.expression.callee.name
        if (decoratorName !== 'Module') {
          return
        }

        const obj = path.node.expression.arguments[0]

        const controllers = obj.properties.find(
          (item: any) => item.key.name === 'controllers',
        )
        if (!controllers) {
          const expression = template.expression(
            '{controllers: [AaaController]}',
          )()

          if (isObjectExpression(expression)) {
            obj.properties.push(expression.properties[0])
          }
        } else {
          const property = template.expression('AaaController')()
          controllers.value.elements.push(property)
        }
      },
    },
  }
}

const ast = parser.parse(sourceCode, {
  sourceType: 'module', // 按照esmodule 解析
  plugins: ['decorators'], // 支持解析装饰器
})

const res = transformFromAstSync(ast, sourceCode, {
  plugins: [myPlugin],
  retainLines: true, // 保留行数跟源码一致
})

!(async function () {
  const formatedCode = await prettier.format(res?.code!, {
    filepath: 'aaa.ts', // 这里指定文件名是为了让 prettier 自动推断用啥 parser。
  })
  console.log(formatedCode)
})()
