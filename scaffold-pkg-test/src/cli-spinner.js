// cli 中的 loading

import { Spinner } from 'cli-spinner'

const spinner = new Spinner('processing.. %s')
spinner.start()

setTimeout(() => {
  spinner.stop(true)
}, 3000)
