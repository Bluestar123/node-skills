import si, { cpu } from 'systeminformation'
import contrib from 'blessed-contrib'

const colors = ['magenta', 'cyan', 'blue', 'yellow', 'green', 'red']

type CpuData = {
  title: string
  style: {
    line: string
  }
  x: number[]
  y: number[]
}

class CpuMonitor {
  lineChart: contrib.Widgets.PictureElement
  cpuData: CpuData[] = []
  interval: NodeJS.Timeout | null = null

  constructor(line: contrib.Widgets.PictureElement) {
    // 构造器传入 lineChart 实例
    this.lineChart = line
  }

  init() {
    si.currentLoad((data) => {
      this.cpuData = data.cpus.map((cpu, i) => {
        return {
          title: 'CPU' + (i + 1),
          style: {
            line: colors[i % colors.length],
          },
          // 默认渲染 60个数据点，为了 x 轴渲染成 ....... 默认没有数据
          x: Array(60)
            .fill(0)
            .map((_, i) => 60 - i), // 有值就行，不展示横坐标
          y: Array(60).fill(0),
        }
      })
      this.updateData(data)

      this.interval = setInterval(() => {
        si.currentLoad((data) => {
          // 每一秒更新一次数据
          this.updateData(data)
        })
      }, 1000)
    })
  }
  updateData(data: si.Systeminformation.CurrentLoadData) {
    data.cpus.forEach((cpu, i) => {
      let loadString = cpu.load.toFixed(1).toString()
      while (loadString.length < 6) {
        loadString = ' ' + loadString
      }
      loadString = loadString + '%'
      this.cpuData[i].title = 'CPU' + (i + 1) + loadString
      // 头删一个 尾加一个
      this.cpuData[i].y.shift()
      this.cpuData[i].y.push(cpu.load)
    })
    this.lineChart.setData(this.cpuData)
    this.lineChart.screen.render()
  }
}
export default CpuMonitor
