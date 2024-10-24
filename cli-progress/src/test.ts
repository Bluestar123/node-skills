import ansiEscapes from 'ansi-escapes'

// 如果不记录光标位置，会导致光标位置不断下移，打印的背景拼接在一起
// 记录了光标位置，每次都会从最开始打印，新的就会覆盖旧的背景
process.stdout.write(ansiEscapes.cursorHide)
process.stdout.write(ansiEscapes.cursorSavePosition)
process.stdout.write('░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░')

setTimeout(() => {
  // 恢复光标位置 重新打印
  process.stdout.write(ansiEscapes.cursorRestorePosition)
  process.stdout.write('████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░')
}, 1000)

setTimeout(() => {
  process.stdout.write(ansiEscapes.cursorRestorePosition)
  process.stdout.write('███████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░');
}, 2000)

setTimeout(() => {
  process.stdout.write(ansiEscapes.cursorRestorePosition)
  process.stdout.write('██████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░');
}, 3000)