import chalk from 'chalk'
import minimist from 'minimist'
import prompts from 'prompts'

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
}

init().catch(console.error)
