import chalk from "chalk";
import { BaseUi } from "./base-ui.js";

export class ScrollList extends BaseUi {
  curSeletecIndex = 0
  scrollTop = 0 // 向下滚动时，最上面元素索引位置
  constructor(private list: Array<string> = []) {
    super()
    this.clear()
    this.render()
  }

  onKeyInput(name: string) {
    if (name !=='up' && name !=='down' ) {
      return
    }
    const action:Function  = this.KEYS[name]
    // 清空当前所有行
    action()
    // 重绘，当前行高亮
    this.render()
  }

  private KEYS = {
    up: () => this.cursorUp(),
    down: () => this.cursorDown()
  }

  cursorUp() {
    this.moveCursor(-1)
  }

  cursorDown() {
    this.moveCursor(1)
  }

  private moveCursor(index: number): void {
    this.curSeletecIndex += index
    if (this.curSeletecIndex<0) {
      this.curSeletecIndex = 0
    }
    if (this.curSeletecIndex >= this.list.length) {
      this.curSeletecIndex = this.list.length - 1
    }
    this.fitScroll()
  }

  fitScroll() {
    const shouldScrollUp = this.curSeletecIndex < this.scrollTop
    const shouldScrollDown = this.curSeletecIndex > this.scrollTop + this.terminalSize.rows - 2
    if (shouldScrollUp) {
      this.scrollTop -= 1
    }

    if (shouldScrollDown) {
      this.scrollTop += 1
    }
    this.clear()
  }

  clear() {
    for(let row=0;row<this.terminalSize.rows;row++) {
      this.clearLine(row)
    }
  }

  bgRow(text: string) {
    return chalk.bgBlue(text + ' '.repeat(this.terminalSize.columns - text.length))
  }

  render() {
    const visibleList = this.list.slice(this.scrollTop, this.scrollTop + this.terminalSize.rows )
    visibleList.forEach((item: string, index:number) => {
      const row = index
      // this.clearLine(row) // 清除行
      let content = item

      if (this.curSeletecIndex === this.scrollTop + index) {
        content = this.bgRow(item)
      }
      this.printAt(content, {x: 0, y: row})
    })
  }
}