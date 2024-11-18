const blob = new Blob(['神说要有光'])

const { port1, port2 } = new MessageChannel()

port1.onmessage = async ({ data }) => {
  console.log(data)
  console.log(await data.text())
  console.log(await data.arrayBuffer())
}

port2.postMessage(blob)
