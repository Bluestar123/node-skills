import { cpus } from 'os'
import { MessageChannel, MessagePort, Worker } from 'worker_threads'
import { Subject } from 'rxjs'
import { dirname, extname } from 'path'

interface WorkerJob {
  job: 'scan'
  value: {
    path: string
  }
}

export type WorkerMessage =
  | {
      type: 'scanResult'
      value: {
        results: Array<{
          path: string
          isTarget: boolean
        }>
      }
    }
  | {
      type: 'scan'
      value: {
        path: string
      }
    }
  | {
      type: 'startup'
      value: {
        channel: MessagePort
        id: number
      }
    }

export class ScanService {
  private index = 0
  private workers: Worker[] = []
  private tunnels: MessagePort[] = [] // 左 port1 和右 port2 的通道

  startScan(stream$: Subject<string>, path: string) {
    this.initWorkers()
    this.listenEvents(stream$)
    this.addJob({ job: 'scan', value: { path } })
  }

  private listenEvents(stream$: Subject<string>) {
    this.tunnels.forEach((tunnel) => {
      tunnel.on('message', (data: WorkerMessage) => {
        this.newWorkerMessage(data, stream$)
      })
    })
  }

  private newWorkerMessage(message: WorkerMessage, stream$: Subject<string>) {
    const { type, value } = message
    if (type === 'scanResult') {
      const results: Array<{ path: string; isTarget: boolean }> = value.results
      results.forEach((result) => {
        const { path, isTarget } = result
        if (isTarget) {
          stream$.next(path)
        } else {
          this.addJob({ job: 'scan', value: { path } })
        }
      })
    }
  }

  private initWorkers(): void {
    const size = this.getPoolSize()
    for (let i = 0; i < size; i++) {
      const worker = new Worker(this.getWorkerPath())
      const { port1, port2 } = new MessageChannel() // 创建通道, port1 和 port2 互相通信, 一组
      worker.postMessage(
        { type: 'startup', value: { channel: port2, id: i } },
        [port2],
      )
      this.workers.push(worker)
      this.tunnels.push(port1)
    }
  }

  getWorkerPath(): URL {
    // esmodule 里面的 import.meta.url 可以获取当前文件的路径
    // 不能使用 __dirname 和 __filename
    const realPath = import.meta.url
    const dirPath = dirname(realPath)
    const extension = extname(realPath)
    const workerName = 'scan.worker'
    return new URL(`${dirPath}/${workerName}${extension}`)
  }

  private getPoolSize(): number {
    const size = cpus().length
    return size
  }

  private addJob(job: WorkerJob): void {
    if (job.job === 'scan') {
      const tunnel = this.tunnels[this.index]
      tunnel.postMessage({ type: 'scan', value: job.value })
      this.index = this.index >= this.tunnels.length - 1 ? 0 : this.index + 1
    }
  }
}
