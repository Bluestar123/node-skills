import core from '@babel/core'
import types from '@babel/types'
const code = `
import { flatten, concat } from "lodash";
console.log(flatten, concat);
`

const plugin = {
  visitor: {
    ImportDeclaration(path, state) {
      // const { libraryName, libraryDirectory = 'lib' } = state.opts
      const libraryName = 'lodash'
      const { node } = path
      const { specifiers } = node //获取批量导入声明数组
      //如果当前的节点的模块名称是我们需要的库的名称，并且导入不是默认导入才会进来
      if (
        node.source.value === libraryName &&
        !types.isImportDefaultSpecifier(specifiers[0])
      ) {
        // 批量便利导入声明数组
        const declarations = specifiers.map((specifier) => {
          // 返回 importDeclaration 节点
          return types.importDeclaration(
            //导入声明importDefaultSpecifier flatten
            [types.importDefaultSpecifier(specifier.local)],
            //导入模块source lodash/flatten
            types.stringLiteral(`${libraryName}/${specifier.local.name}`),
          )
        })
        path.replaceWithMultiple(declarations)
      }
    },
  },
}

const res = core.transformSync(code, {
  plugins: [plugin],
  // libraryName: 'lodash',
})
console.log(res.code)
