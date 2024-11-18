//new Buffer 的方式被废弃了，创建 Buffer 一般用 Buffer.alloc 或者 Buffer.from
const buf1 = Buffer.alloc(10, 6) // 是分配一个 10 个字节的 buffer，用 6 填充, 也可以不填充

const buf2 = Buffer.from('aaron', 'utf-8')

const buf3 = Buffer.from([1, 2, 3]) //是根据传入的字节数组来创建 buffer。

console.log(buf1.toString('hex'))

console.log(buf2.toString('utf-8'))
console.log(buf2.toString('base64'))

console.log(buf3.toString('hex'))
