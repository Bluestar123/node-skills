import si from 'systeminformation'
import contrib from 'blessed-contrib'

const parts: Record<string, any> = {
  p: 'pid',
  c: 'cpu',
  m: 'mem',
}
class ProcessMonitor {
  table: contrib.Widgets.TableElement

  interval: NodeJS.Timeout | null = null

  pSort: string = parts.c // 默认cpu排序
  reIndex: boolean = false // 是否按键排序了
  reverse: boolean = false

  constructor(table: contrib.widget.Table) {
    this.table = table
  }
  init() {
    const updater = () => {
      si.processes((data) => {
        this.updateData(data)
      })
    }
    updater()

    this.interval = setInterval(updater, 1000)

    this.table.screen.key(['m', 'c', 'p'], (ch) => {
      if (parts[ch] === this.pSort) {
        this.reverse = !this.reverse
      } else {
        this.reverse = false
        this.pSort = parts[ch] || this.pSort
      }
      this.reIndex = true
      updater()
    })
  }

  updateData(data: si.Systeminformation.ProcessesData) {
    const part = this.pSort
    const list = data.list
      .sort((a: any, b: any) => {
        return b[part] - a[part]
      })
      .map((p) => {
        return [p.pid + '', p.command, ' ' + p.cpu.toFixed(1), p.mem.toFixed(1)]
      })
    var headers = ['PID', 'Command', '%CPU', '%MEM']
    const position = {
      pid: 0,
      cpu: 2,
      mem: 3,
    }[part]!
    headers[position] += !this.reverse ? '▼' : '▲'
    this.table.setData({ headers, data: this.reverse ? list.reverse() : list })
    if (this.reIndex) {
      // 如果按键了, 索引默认选中0
      ;(this.table as any).rows.select(0)
      this.reIndex = false
    }

    this.table.screen.render()
  }
}

export default ProcessMonitor
