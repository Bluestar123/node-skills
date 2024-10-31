import chalk from 'chalk'
import minimist from 'minimist'
import path from 'path'
import prompts from 'prompts'
import { fileURLToPath } from 'url'

const argv = minimist<{ templete?: string; help?: boolean }>(
  process.argv.slice(2),
  {
    alias: { h: 'help', t: 'template' },
    string: ['_'],
  }
)

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

const defaultTargetDir = 'vite-project'

type FrameworkVariant = {
  name: string
  display: string
  color: Function
  customCommand?: string
}

type Framework = {
  name: string
  display: string
  color: Function
  variants: FrameworkVariant[]
}

const FRAMEWORKS: Framework[] = [
  {
    name: 'vue',
    display: 'Vue',
    color: chalk.green,
    variants: [
      { name: 'vue-ts', display: 'TypeScript', color: chalk.blue },
      { name: 'vue', display: 'JavaScript', color: chalk.yellow },
    ],
  },
  {
    name: 'react',
    display: 'React',
    color: chalk.cyan,
    variants: [
      {
        name: 'react-ts',
        display: 'TypeScript',
        color: chalk.blue,
      },
      {
        name: 'react-swc-ts',
        display: 'TypeScript + SWC',
        color: chalk.blue,
      },
      {
        name: 'react',
        display: 'JavaScript',
        color: chalk.yellow,
      },
      {
        name: 'react-swc',
        display: 'JavaScript + SWC',
        color: chalk.yellow,
      },
    ],
  },
]
const TEMPLATES = FRAMEWORKS.map((f) => {
  return f.variants.map((v) => v.name)
}).reduce((acc, cur) => acc.concat(cur), [])

function formatTargetDir(targetDirt: string | undefined) {
  // aaa/ => aaa
  return targetDirt?.trim().replace(/\/+$/g, '')
}

const init = async () => {
  const help = argv.help
  if (help) {
    console.log(helpMessage)
    return
  }
  const argTargetDir = formatTargetDir(argv._[0])
  const argTemplate = argv.template || argv.t
  let result: prompts.Answers<'projectName'>
  let targetDir = argTargetDir || defaultTargetDir

  try {
    result = await prompts(
      [
        {
          type: argTargetDir ? null : 'text', // 如果设置了项目名，就不用再输入了。
          name: 'projectName',
          message: chalk.reset('Project name:'), // 重置颜色，不受之前设置的影响
          initial: defaultTargetDir,
          onState: (state) => {
            targetDir = formatTargetDir(state.value) || defaultTargetDir
          },
        },
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
  const { framework, variant, projectName } = result
  const root = path.join(process.cwd(), targetDir)
  let template: string = variant || argTemplate
  const templateDir = path.resolve(
    fileURLToPath(import.meta.url), // import.meta.url 是当前模块的路径，但是file:///, 需要fileURLToPath转换为文件路径
    '../../..',
    `template-${template}`
  )
  console.log(templateDir)
}

init().catch(console.error)
