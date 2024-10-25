import readline from 'node:readline'

// 开启键盘按键事件
readline.emitKeypressEvents(process.stdin)

// 禁用内置的键盘处理时间 ctrl+c
process.stdin.setRawMode(true)

process.stdin.on('keypress', (str, key) => {
  console.log(str, key)
  if (key.sequence === '\u0003') {
    process.exit()
  }
})