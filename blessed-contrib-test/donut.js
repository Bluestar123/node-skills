import blessed from 'blessed'
import BlessedContrib from 'blessed-contrib'

const screen = blessed.screen({ fullUnicode: true })

const donut = BlessedContrib.donut({
  label: '进度条',
  radius: 20,
  arcWidth: 5,
  remainColor: 'yellow', // 背景色
  data: [
    { percent: 0, label: 'aaa 进度', color: 'green' },
    { percent: 0, label: 'bbb 进度', color: 'red' },
    { percent: 0, label: 'ccc 进度', color: [242, 178, 25] },
  ],
})
screen.append(donut)

var pct = 0
setInterval(() => {
  if (pct > 0.99) {
    pct = 0
  }

  donut.update([
    { percent: parseFloat(pct).toFixed(2), label: 'aaa 进度', color: 'green' },
    { percent: parseFloat(pct).toFixed(2), label: 'bbb 进度', color: 'red' },
    {
      percent: parseFloat(pct).toFixed(2),
      label: 'ccc 进度',
      color: [242, 178, 25],
    },
  ])
  screen.render()

  pct += 0.05
}, 100)

screen.key('C-c', function () {
  screen.destroy()
})
screen.render()
