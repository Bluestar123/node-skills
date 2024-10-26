import ansiEscapes from 'ansi-escapes'
import { Key, Prompts } from './Prompts.js'
import chalk from 'chalk'

export interface textPromptOptions {
  type: 'text'
  name: string
  message: string
}

function isNonPrintableChar(char: string) {
  return /^[\x00-\x1F\x7F]$/.test(char)
}

export class TextPrompt extends Prompts {
  out = process.stdout
  cursor = 0

  constructor(private options: textPromptOptions) {
    super()
    // this.out.write(ansiEscapes.clearTerminal)
  }

  onKeyInput(str: string, key: Key) {
    if (key.name === 'backspace') {
      this.cursor--
      this.value = this.value.slice(0, this.cursor)
    }
    // 如果是 控制字符，例如 ESC 不做处理
    if (!isNonPrintableChar(str)) {
      this.value += str
      this.cursor++
    }

    this.render()
  }

  render() {
    //1.删除行
    this.out.write(ansiEscapes.eraseLine)
    // 2. 光标移动到第一列
    this.out.write(ansiEscapes.cursorTo(0))

    // 3.每次输入的时候，重新渲染， value和光标位置都变了
    this.out.write(
      [
        chalk.bold(this.options.message),
        chalk.gray(' >'),
        ' ',
        chalk.blue(this.value),
      ].join('')
    )

    this.out.write(ansiEscapes.cursorSavePosition)
    this.out.write(ansiEscapes.cursorDown(1) + ansiEscapes.cursorTo(0))

    // 如果有问题就打印错误信息
    if (this.value === '') {
      this.out.write(chalk.red('请输入名字'))
    } else {
      // 没有问题就把错误信息删除，因为当前光标在问题下一行
      this.out.write(ansiEscapes.eraseLine)
    }

    // 光标回到 save 的位置
    this.out.write(ansiEscapes.cursorRestorePosition)
  }
}
