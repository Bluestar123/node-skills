/**
 * Bindings，它是变量引用的集合
 */

import core from '@babel/core'
import types from '@babel/types'

const code = `
 function getAge(){
   var age = 12;
   console.log(age);
   var name = 'zhufeng';
   console.log(name);
 }
 `

const plugin = {
  visitor: {
    //这是一个别名，用于捕获所有作用域节点：函数、类的函数、函数表达式、语句快、if else 、while、for
    Scopable(path) {
      //path.scope.bindings 取出作用域内的所有变量
      Object.entries(path.scope.bindings).forEach(([key, binding]) => {
        const name = path.scope.generateUid()
        binding.path.scope.rename(key, name)
      })
    },
  },
}

const res = core.transformSync(code, { plugins: [plugin] })

console.log(res.code)
