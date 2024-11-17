/**
 * _ underscore
 * - hyphen
 */

import { MessagePort, parentPort } from 'worker_threads'
import { opendir } from 'fs/promises'
import { Dir, Dirent } from 'fs'
import EventEmitter from 'events'
import { join } from 'path'
import { WorkerMessage } from './scan.js'

function fn() {
  let id = 0
  let fileWalker: FileWalker
  let tunnel: MessagePort
  if (parentPort === null) {
    throw new Error('Worker 只能被 parent thread 启动，不能单独跑')
  }
  parentPort.on('message', (data: WorkerMessage) => {
    const { type, value } = data
    if (type === 'startup') {
      tunnel = value.channel
      id = value.id
      fileWalker = new FileWalker()
      initTunnelListeners()
      initFileWalkerListenners()
    }
  })

  function initTunnelListeners() {
    // port 监听另一个端口传得信息
    tunnel.on('message', (data: WorkerMessage) => {
      const { type, value } = data
      if (type === 'scan') {
        fileWalker.enquenueTask(value.path)
      }
    })
  }

  function initFileWalkerListenners() {
    fileWalker.events.on('newResult', ({ results }) => {
      tunnel.postMessage({
        type: 'scanResult',
        value: { results },
      })
    })
  }
}

fn()

interface Task {
  path: string
}

class FileWalker {
  readonly events = new EventEmitter()
  private readonly taskQueue: Task[] = []
  enquenueTask(path: string) {
    this.taskQueue.push({ path })
    this.processQueue()
  }

  private processQueue() {
    while (this.taskQueue.length > 0) {
      const path = this.taskQueue.shift()?.path
      if (!path) {
        return
      }
      this.run(path)
    }
  }
  private async run(path: string) {
    try {
      const dir = await opendir(path)
      await this.analizeDir(path, dir)
    } catch (error) {}
  }
  private async analizeDir(path: string, dir: Dir) {
    const results: Array<Record<string, any>> = []
    let entry: Dirent | null = null
    // dir.read 会遍历目录，把遍历到的每个目录都通过 newResult 返回
    while ((entry = await dir.read().catch(() => null)) !== null) {
      this.newDirEntry(path, entry, results)
    }
    this.events.emit('newResult', { results })
    await dir.close()
  }
  newDirEntry(path: string, entry: Dirent, results: any[]) {
    const subpath = join(path, entry.name)
    const shouldSkip = !entry.isDirectory()
    if (shouldSkip) {
      return
    }
    results.push({ path: subpath, isTarget: entry.name === 'node_modules' })
  }
}
