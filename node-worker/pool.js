/**
 * 我们知道，线程数的上限就是 cpu 的核心数。

我们得多创建几个工作线程来备用。

我们可以创建一个线程池，充分利用 cpu 来最大程度优化代码。

 */

import os from 'os'
console.log(os.cpus().length)

import { Worker, MessageChannel } from 'node:worker_threads'

const poolSize = os.cpus().length

const workers = []
const tunnels = []

for (let i = 0; i < poolSize; i++) {
  const { port1, port2 } = new MessageChannel()

  const worker = new Worker('./pool-worker.js')
  worker.postMessage(
    {
      type: 'startup',
      id: i,
      channel: port2,
    },
    [port2],
  )

  tunnels.push(port1)
  workers.push(worker)
}

for (let i = 0; i < tunnels.length; i++) {
  // port1 收
  tunnels[i].on('message', (msg) => {
    console.log(`线程 ${msg.id} 计算出了结果 ${msg.res}`)
  })
}

let curIndex = 0

function addJob(num) {
  const tunnel = tunnels[curIndex]

  tunnel.postMessage({
    value: num,
  })

  curIndex = curIndex >= workers.length - 1 ? 0 : curIndex + 1
}

for (let i = 0; i < 100; i++) {
  addJob(Math.floor(Math.random() * 1000000))
}
