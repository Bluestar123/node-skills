import { parentPort } from 'node:worker_threads'

function calc(num) {
  let total = 0
  for (let i = 0; i < num; i++) {
    total += i
  }
  return total
}

let tunnel
let id
// worker 发  parentPort接收
parentPort.on('message', (message) => {
  if (message.type === 'startup') {
    id = message.id
    tunnel = message.channel

    // port1 发 port2 收
    tunnel.on('message', (msg) => {
      // port2 发 port1 收
      tunnel.postMessage({
        id,
        res: calc(msg.value),
      })
    })
  }
})
