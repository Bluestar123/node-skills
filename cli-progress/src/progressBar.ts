import ansiEscapes from 'ansi-escapes';
import chalk from 'chalk';
// 换行符，兼容不同平台
import { EOL } from 'os';

// 确保每次调用 write，this都是指向 process.stdout
const write = process.stdout.write.bind(process.stdout);


export class ProgressBar {
  total: number = 0
  value: number = 0

  constructor() { }

  start(total: number, initValue: number) {
    this.total = total;
    this.value = initValue;
    write(ansiEscapes.cursorHide);
    write(ansiEscapes.cursorSavePosition);

    this.render()
  }

  render() {
    let progress = this.value / this.total

    if (progress < 0) {
      progress = 0
    } else if (progress >= 1) {
      progress = 1
      this.value = this.total
    }
    // 总长, 40个字符 进度条长度
    const barSize = 40
    // 完成的长度
    const completeSize = Math.floor(progress * barSize)

    const incompleteSize = barSize - completeSize
    write(ansiEscapes.cursorRestorePosition)

    write(chalk.blue('█').repeat(completeSize));
    write('░'.repeat(incompleteSize));
    write(`${this.value} / ${this.total} ${EOL}`)
  }
  update(value: number) {
    this.value = value
    this.render()
  }
  getTotalSize() {
    return this.total
  }

  stop() {
    write(ansiEscapes.cursorShow);
    write(EOL);
  }
}