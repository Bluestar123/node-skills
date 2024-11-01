import chalk from 'chalk'
import path from 'path'
import fs from 'fs'

export function formatTargetDir(targetDirt: string | undefined) {
  // aaa/ => aaa
  return targetDirt?.trim().replace(/\/+$/g, '')
}

export function getHelp() {
  // \ 表示这一行 取消空行
  const helpMessage = `\
Usage: create-vite [OPTION]... [DIRECTORY]

Create a new Vite project in JavaScript or TypeScript.
With no arguments, start the CLI in interactive mode.

Options:
  -t, --template NAME        use a specific template

Available templates:
${chalk.yellow('vanilla-ts     vanilla')}
${chalk.green('vue-ts         vue')}
${chalk.cyan('react-ts       react')}
${chalk.cyan('react-swc-ts   react-swc')}
${chalk.magenta('preact-ts      preact')}
${chalk.redBright('lit-ts         lit')}
${chalk.red('svelte-ts      svelte')}
${chalk.blue('solid-ts       solid')}
${chalk.blueBright('qwik-ts        qwik')}`
  return helpMessage
}

const renameFiles: Record<string, string> = {
  _gitignore: '.gitignore',
}
export const write = ({
  root,
  file,
  content,
  templateDir,
}: {
  root: string
  file: string
  content?: string
  templateDir: string
}) => {
  const targetPath = path.join(root, renameFiles[file] ?? file)
  if (content) {
    fs.writeFileSync(targetPath, content)
  } else {
    // 模板下的 file 文件 复制到 targetPath 下
    copy(path.join(templateDir, file), targetPath)
  }
}

// 目录复制，递归
function copyDir(srcDir: string, destDir: string) {
  fs.mkdirSync(destDir, { recursive: true }) // 如果目标有父目录，递归创建
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file)
    const destFile = path.resolve(destDir, file)
    copy(srcFile, destFile)
  }
}

function copy(src: string, dest: string) {
  const stat = fs.statSync(src)
  if (stat.isDirectory()) {
    copyDir(src, dest)
  } else {
    fs.copyFileSync(src, dest)
  }
}
