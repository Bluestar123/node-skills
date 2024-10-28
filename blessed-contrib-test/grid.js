import blessed from 'blessed'
import contrib from 'blessed-contrib'
const screen = blessed.screen({
  fullUnicode: true,
})

// 创建 grid ，指定 行和列都是 12份
const grid = new contrib.grid({ rows: 12, cols: 12, screen: screen })
// 0,0 位置渲染width 和 高度都是 6份的 guage
const guage = grid.set(0, 0, 6, 6, contrib.gauge, {
  label: '下载进度',
  width: 'half',
  stroke: 'green',
  fill: 'white',
  percent: 0.3,
})
// 在0，6位置渲染width 和 高度都是 6份的 sparkline
const donut = grid.set(0, 6, 6, 6, contrib.donut, {
  label: '进度',
  radius: 10,
  arcWidth: 2,
  remainColor: 'black',
  data: [
    { percent: 0.3, label: 'aaa 进度', color: 'green' },
    { percent: 0.5, label: 'bbb 进度', color: 'red' },
  ],
})

const tree = grid.set(6, 6, 6, 6, contrib.tree, {
  fg: 'green',
  label: '文件目录',
})
tree.setData({
  extended: true, // 第一层默认展开
  children: {
    src: {},
  },
})

screen.key('C-c', function () {
  screen.destroy()
})

screen.render()
