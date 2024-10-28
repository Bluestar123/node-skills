import blessed from 'blessed'
import contrib from 'blessed-contrib'

const screen = blessed.screen({
  fullUnicode: true,
})

const tree = contrib.tree({
  fg: 'green',
})
tree.focus()

tree.on('select', function (node) {
  console.log(node.myCustomProperty)
})
tree.setData({
  extended: true, // 第一层默认展开
  children: {
    src: {
      children: {
        'aaa.ts': {},
        'bbb.ts': {},
        'ccc.ts': {},
        components: {
          children: {
            'xxx.tsx': {},
            'yyy.tsx': {},
            'zzz.tsx': {
              name: 'zzz.tsx',
              myCustomProperty: '自定义属性',
            },
          },
        },
      },
    },
    dist: {
      children: {
        'aaa.png': {},
        'bbb.js': {},
        'ccc.js': {},
      },
    },
  },
})

screen.append(tree)

screen.key('C-c', function () {
  screen.destroy()
})

screen.render()
