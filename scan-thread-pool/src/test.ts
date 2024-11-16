import { filter, map, Subject } from 'rxjs'

const stream$ = new Subject<number>()

// 单独对值进行处理
const result$ = stream$.pipe(map((x) => x * x)).pipe(filter((x) => x % 2 === 0))

// 订阅 next 返回值
result$.subscribe((v) => {
  console.log('subscribe 1:', v)
})
result$.subscribe((v) => {
  console.log('subscribe 2:', v)
})

stream$.next(1)

setTimeout(() => {
  stream$.next(2)
}, 1000)

setTimeout(() => {
  stream$.next(3)
}, 2000)
