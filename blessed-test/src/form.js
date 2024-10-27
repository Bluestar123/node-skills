import blessed from 'blessed'

const screen = blessed.screen({ fullUnicode: true }) // fullUnicode: true 支持中文

// 类似 window.prompt
const prompt = blessed.prompt({
  parent: screen, // 没用 append 添加，创建时直接指定父组件
  border: 'line',
  height: 'shrink', // 按照内容适应
  width: 'half',
  top: 'center',
  left: 'center',
  label: '{blue-fg}登录{/blue-fg}',
  tags: true,
})

const msg = blessed.message({
  parent: screen,
  border: 'line',
  width: 'half',
  height: 'shrink',
  top: 'center',
  left: 'center',
  label: '{blue-fg}提示{/blue-fg}',
  tags: true,
  hidden: true,
})

prompt.input('请输入用户名', '', (err, username) => {
  prompt.input('请输入密码', '', (err, password) => {
    if (username === 'admin' && password === 'admin') {
      msg.display('登录成功', 1)
    } else {
      msg.display('用户名或密码错误', 1)
    }
    setTimeout(() => {
      screen.destroy()
      console.log(username, password)
    }, 1000)
  })
})
prompt.on('click', (e) => {
  console.log('用户取消了输入', e)
  // screen.destroy()
})

screen.key('C-c', function () {
  screen.destroy()
})

screen.render()
