import { select, input } from '@inquirer/prompts'

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
  console.log(projectName, projectTemplate)
}
create()
export default create
