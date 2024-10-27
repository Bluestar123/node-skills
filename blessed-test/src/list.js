import blessed from 'blessed'

// 根组件
const screen = blessed.screen({ fullUnicode: true }) // fullUnicode: true 支持中文

const data = [
  '红楼梦',
  '西游记',
  '水浒传',
  '三国演义',
  '儒林外史',
  '金瓶梅',
  '聊斋志异',
  '白鹿原',
  '平凡的世界',
  '围城',
  '活着',
  '百年孤独',
  '围城',
  '红高粱家族',
  '梦里花落知多少',
  '倾城之恋',
  '悲惨世界',
  '哈利波特',
  '霍乱时期的爱情',
  '白夜行',
  '解忧杂货店',
  '挪威的森林',
  '追风筝的人',
  '小王子',
  '飘',
  '麦田里的守望者',
  '时间简史',
  '人类简史',
  '活着为了讲述',
  '白夜行',
  '百鬼夜行',
]

const list = blessed.list({
  width: '50%',
  height: '50%',
  border: 'line',
  right: 0,
  bottom: 0,
  align: 'left',
  keys: true,
  style: {
    fg: 'white',
    bg: 'default',
    selected: {
      bg: 'blue',
    },
  },
  items: data,
})
// 子组建使用 append 添加
screen.append(list)
list.select(0)
// enter 选中触发
list.on('select', function (item) {
  screen.destroy()
  console.log(item.getText())
})
// control + c 退出
screen.key('C-c', function () {
  screen.destroy()
})

list.focus()
screen.render()
