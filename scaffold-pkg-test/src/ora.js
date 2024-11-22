import ora from 'ora'

const spinner = ora('processing..').start()

setTimeout(() => {
  // spinner.color = 'blue'
  // spinner.text = 'loading'
  spinner.stop()
}, 3000)
