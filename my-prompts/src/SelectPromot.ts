import ansiEscapes from 'ansi-escapes'
import { Key, Prompts } from './Prompts.js'
import chalk from 'chalk'

export interface SelectPromptOptions {
  type: 'select'
  name: string
  message: string
  choices: Array<string>
}

export class SelectPrompt extends Prompts {
  out = process.stdout
  index = 0

  constructor(private options: SelectPromptOptions) {
    super()
    this.value = options.choices[0]
  }

  onKeyInput(str: string, key: Key): void {
    if (key.name !== 'up' && key.name !== 'down') {
      return
    }
    if (key.name === 'up') {
      this.index--
      if (this.index < 0) {
        this.index = this.options.choices.length - 1
      }
    }
    if (key.name === 'down') {
      this.index++
      if (this.index >= this.options.choices.length) {
        this.index = 0
      }
    }
    this.value = this.options.choices[this.index]
    this.render()
  }

  render() {
    this.out.write(ansiEscapes.eraseLine)
    this.out.write(ansiEscapes.cursorSavePosition)
    // 光标移到第0列，从头开始写
    this.out.write(ansiEscapes.cursorTo(0))
    this.out.write(
      [
        chalk.bold(this.options.message),
        chalk.gray(' > '),
        chalk.blue(this.value),
      ].join('')
    )

    for (let i = 0; i < this.options.choices.length; i++) {
      const choice = this.options.choices[i]
      this.out.write(ansiEscapes.cursorDown(1))
      this.out.write(ansiEscapes.cursorTo(0))
      if (this.value === choice) {
        this.out.write(chalk.blue('> ' + choice))
      } else {
        this.out.write('  ' + choice)
      }
    }
    this.out.write(ansiEscapes.cursorRestorePosition)
  }

  close() {
    this.out.write(ansiEscapes.cursorSavePosition)
    for (let i = 0; i < this.options.choices.length; i++) {
      this.out.write(ansiEscapes.cursorDown(1))
      this.out.write(ansiEscapes.eraseLine)
    }
    this.out.write(ansiEscapes.cursorRestorePosition)

    super.close()
  }
}
