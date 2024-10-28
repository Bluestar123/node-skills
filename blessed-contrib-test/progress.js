import blessed from 'blessed'
import BlessedContrib from 'blessed-contrib'

const screen = blessed.screen({ fullUnicode: true })

const progress = BlessedContrib.gauge({
  label: '进度',
  stroke: 'green',
  fill: 'blue',
  width: 'half',
})
screen.append(progress)

let total = 0

const timer = setInterval(() => {
  if (total > 100) {
    return clearInterval(timer)
  }
  progress.setPercent(total)
  screen.render()
  total += 2
}, 100)

screen.key('C-c', function () {
  screen.destroy()
})
screen.render()
