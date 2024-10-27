import blessed from 'blessed'

const screen = blessed.screen({
  fullUnicode: true,
})

const progressBar = blessed.progressbar({
  parent: screen,
  top: 'center',
  left: 'center',
  height: 2,
  width: 20,
  style: {
    bg: 'gray',
    bar: {
      bg: 'green',
    },
  },
})

screen.key('C-c', function () {
  screen.destroy()
})

let total = 0
const timer = setInterval(() => {
  if (total > 100) {
    screen.destroy()
    clearInterval(timer)
    return
  }
  progressBar.setProgress(total)
  screen.render()

  total += 2
}, 100)

screen.render()
