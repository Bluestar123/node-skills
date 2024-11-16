import { cpus } from 'os'
import { MessageChannel, MessagePort, Worker } from 'worker_threads'
import { Subject } from 'rxjs'

interface WorkerJob {
  job: 'scan'
  value: {
    path: string
  }
}
