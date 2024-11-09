import { PluginObj, transformFromAstSync } from '@babel/core'
import parser from '@babel/parser'
import template from '@babel/template'
import { isObjectExpression } from '@babel/types'
import prettier from 'prettier'
import { readFile } from 'fs/promises'

function myPlugin(): PluginObj {
  return {
    visitor: {
      Program(path) {
        let index = 0

        while (path.node.body[index].type === 'ImportDeclaration') {
          index++ // 找到第一个不是 ImportDeclaration 的节点，插入到最后
        }

        const ast = template.statement(
          "import { AaaController } from './aaa.controller';",
        )()
        path.node.body.splice(index, 0, ast)
      },
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

export async function transformFile(filePath: string) {
  const sourceCode = await readFile(filePath, 'utf-8') //获取源码

  const ast = parser.parse(sourceCode, {
    sourceType: 'module',
    plugins: ['decorators'],
  }) // 解析源码为 AST
  const res = transformFromAstSync(ast, sourceCode, {
    plugins: [myPlugin],
    retainLines: true,
  }) // 转换 AST
  const formatedCode = await prettier.format(res?.code!, { filepath: filePath })
  return formatedCode
}
