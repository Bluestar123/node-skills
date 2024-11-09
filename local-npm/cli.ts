#!/usr/bin/env node
import chalk from 'chalk'
import { Command } from 'commander'
import { access, writeFile } from 'fs/promises'
import path from 'path'
import { transformFile } from './transform.js'

const program = new Command()

program.name('my-nest-cli').description('自动添加controller').version('1.0.0')

program
  .command('transform')
  .description('修改 module 代码 添加 controller')
  .argument('path', '需要转化的文件路径')
  .action(async (filePath: string) => {
    console.log(filePath)
    if (!filePath) {
      return console.log(chalk.red('请输入文件路径'))
    }
    const p = path.join(process.cwd(), filePath)
    try {
      await access(p) // 先访问看是否存在
      const code = await transformFile(filePath)
      writeFile(p, code)
      console.log(chalk.green('修改成功'))
    } catch (error) {
      console.log(chalk.red('文件不存在'))
    }
  })
program.parse()
