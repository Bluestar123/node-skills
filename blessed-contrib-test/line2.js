import blessed from 'blessed'
import BlessedContrib from 'blessed-contrib'

const screen = blessed.screen({
  fullUnicode: true,
})

const lineChart = BlessedContrib.line({
  style: {
    line: 'yellow',
    text: 'green',
    baseline: 'blue',
  },
  showLegend: true,
  label: '气温变化',
})

const data1 = {
  title: '北京',
  x: ['10 月 1 日', '10 月 2 日', '10 月 3 日', '10 月 4 日'],
  y: [4, 10, 3, 5],
  style: {
    line: 'red',
  },
}
const data2 = {
  title: '上海',
  x: ['10 月 1 日', '10 月 2 日', '10 月 3 日', '10 月 4 日'],
  y: [6, 13, 8, 10],
  style: {
    line: 'green',
  },
}

screen.append(lineChart)
lineChart.setData([data1, data2])

screen.key('C-c', function () {
  screen.destroy()
})
screen.render()
