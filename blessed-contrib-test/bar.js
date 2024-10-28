import blessed from 'blessed'
import BlessedContrib from 'blessed-contrib'

const screen = blessed.screen({ fullUnicode: true })

const bar = BlessedContrib.bar({
  label: '气温变化',
  barWidth: 8,
  barSpacing: 20,
  maxHeight: 20,
})

screen.append(bar)
bar.setData({
  titles: ['北京', '上海', '广州', '深圳'],
  data: [10, 20, 30, 40],
})
screen.key('C-c', function () {
  screen.destroy()
})
screen.render()
