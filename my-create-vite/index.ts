import chalk from 'chalk'
import minimist from 'minimist'
import path from 'path'
import prompts from 'prompts'
import { fileURLToPath } from 'url'
import fs from 'node:fs'
import FRAMEWORKS, { Framework, TEMPLATES } from './frameworks.js'
import { formatTargetDir, getHelp, write } from './utils.js'

// 1. 解析命令行参数
const argv = minimist<{ templete?: string; help?: boolean }>(
  process.argv.slice(2),
  {
    alias: { h: 'help', t: 'template' },
    string: ['_'],
  }
)

const defaultTargetDir = 'vite-project'

const init = async () => {
  const help = argv.help
  if (help) {
    console.log(getHelp())
    return
  }
  // node my-create-vite/index.ts project-name, 会被解析为 { _: ['project-name'] }
  const argTargetDir = formatTargetDir(argv._[0])
  const argTemplate = argv.template || argv.t
  let result: prompts.Answers<'projectName' | 'variant'>
  // 使用设置的项目名或者默认项目名，我们的项目文件夹
  let targetDir = argTargetDir || defaultTargetDir

  try {
    result = await prompts(
      [
        {
          type: argTargetDir ? null : 'text', // 如果参数设置了项目名，就不用再输入了。
          name: 'projectName',
          message: chalk.reset('Project name:'), // 重置颜色，不受之前设置的影响
          initial: defaultTargetDir,
          onState: (state) => {
            targetDir = formatTargetDir(state.value) || defaultTargetDir
          },
        },
        // 如果参数中有模板，同时存在，就不用再选择了
        {
          type:
            argTemplate && TEMPLATES.includes(argTemplate) ? null : 'select',
          name: 'framework',
          message: chalk.reset('Select a framework:'),
          initial: 0,
          choices: FRAMEWORKS.map((f) => ({
            title: f.color(f.display || f.name),
            value: f,
          })),
        },
        // 选择vue 或者 react 下具体的模板
        {
          type: (framework: Framework) => {
            // 如果是函数，会传入上一个问题的结果， 所以上面那个是 value: f
            return framework && framework.variants ? 'select' : null
          },
          name: 'variant',
          message: chalk.reset('Select a variant:'),
          choices: (framework: Framework) => {
            return framework.variants.map((v) => {
              return {
                title: framework.color(v.display || v.name),
                value: v.name,
              }
            })
          },
        },
      ],
      {
        onCancel: () => {
          throw new Error(chalk.red('✖') + ' Operation cancelled')
        },
      }
    )
  } catch (error: any) {
    console.log(error.message)
    return
  }

  console.log(result, targetDir)
  const { variant, projectName } = result
  // 当前执行命令行的路径 + 项目名
  const root = path.join(process.cwd(), targetDir)
  let template: string = variant || argTemplate
  // 获取模板路径
  const templateDir = path.resolve(
    fileURLToPath(import.meta.url), // import.meta.url 是当前模块的路径，但是file:///xx.js, 需要fileURLToPath转换为文件路径
    '../../..',
    `my-create-vite/template-${template}`
  )
  console.log(templateDir)

  // 当前文件夹下没有 目标文件夹，创建
  if (!fs.existsSync(root)) {
    fs.mkdirSync(root)
  }
  // 读取模板下的文件，写入到目标文件夹
  const files = fs.readdirSync(templateDir)
  for (const file of files) {
    write({ root, file, templateDir })
  }
  // path.relative a 目录到 b 目录的相对路径
  const cdProjectName = path.relative(process.cwd(), root) // 输出相对路径
  console.log(`\nDone. Now run: \n`)
  if (root !== process.cwd()) {
    // 文件可能 有空格
    console.log(
      `  cd ${
        cdProjectName.includes(' ') ? `"${cdProjectName}"` : cdProjectName
      }`
    )
  }
  console.log(`  npm install`)
  console.log(`  npm run dev`)
}

init().catch(console.error)
