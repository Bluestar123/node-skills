import minimist from 'minimist'

let argv = minimist(process.argv.slice(2))
console.log(argv)

//node ./index.js -x 3 -y -u 2 -z
// z 不会被解析
argv = minimist(process.argv.slice(2), {
  string: ['x'],
  boolean: ['y'],
  unknown: function (arg) {
    return arg === '-u'
  },
  default: { x: 'xxxx' },
  alias: { p: 'port', t: 'template' },
})
console.log(argv)
