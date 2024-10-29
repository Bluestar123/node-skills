import si from 'systeminformation'

// cpu
// si.currentLoad((data) => {
//   console.log(data)
// })

// file size
// si.fsSize(console.log)

// memories
// si.mem(console.log)

// si.networkInterfaceDefault((iface) => {
//   console.log(iface)
//   si.networkStats(iface, console.log)
// })

// 断点查看
si.processes((data) => {
  console.log(data)
})
