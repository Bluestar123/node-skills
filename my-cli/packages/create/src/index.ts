import { select, input, confirm } from '@inquirer/prompts'
import { NpmPackage } from '@aaron-wang/utils'
import path from 'path'
import os from 'os'
import ora from 'ora'
import fse from 'fs-extra'
import { glob } from 'glob'
import ejs from 'ejs'

const checkIsExistProjectName = async (projectName: string) => {
  const targetPath = path.join(process.cwd(), projectName)
  if (fse.existsSync(targetPath)) {
    const empty = await confirm({
      message: 'The directory already exists, do you want to empty it?',
    })
    if (empty) {
      fse.emptyDirSync(targetPath)
    } else {
      process.exit(0)
    }
  }
}

const create = async () => {
  const projectTemplate = await select({
    message: 'Please select a project template',
    choices: [
      {
        name: 'React',
        value: '@aaron-wang/template-react',
      },
      {
        name: 'Vue',
        value: '@aaron-wang/template-vue',
      },
    ],
  })
  let projectName = ''
  while (!projectName) {
    projectName = await input({
      message: 'Please input a project name',
    })
  }

  // 判断项目名称 目录是否存在，是否要清空
  await checkIsExistProjectName(projectName)

  const pkg = new NpmPackage({
    name: projectTemplate,
    targetPath: path.join(os.homedir(), '.aaron-wang-cli'),
  })

  if (!(await pkg.exists())) {
    const spinner = ora('Downloading template...').start()
    await pkg.install()
    await sleep(3000)
    spinner.stop()
  } else {
    const spinner = ora('Updating template...').start()
    await pkg.update()
    await sleep(3000)
    spinner.stop()
  }

  const spinner = ora('创建项目中...').start()
  await sleep(1000)

  const templatePath = path.join(pkg.npmFilePath, 'template')
  const targetPath = path.join(process.cwd(), projectName)

  fse.copySync(templatePath, targetPath)

  spinner.stop()

  // 遍历模板内的文件，查找文件，依次渲染模板
  const files = await glob('**', {
    cwd: targetPath,
    nodir: true,
    ignore: ['**/node_modules/**'],
  })
  for (let i = 0; i < files.length; i++) {
    const filePath = path.join(targetPath, files[i])
    const renderResult = await ejs.renderFile(filePath, { projectName })
    fse.writeFileSync(filePath, renderResult)
  }
}
function sleep(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout)
  })
}
create()
export default create
