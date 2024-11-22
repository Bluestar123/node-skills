import { input, password, select } from '@inquirer/prompts'

const name = await input({ message: 'What is your name?' })

const job = await select({
  message: 'What is your job?',
  choices: [
    {
      name: 'FE',
      value: 'fe',
    },
    {
      name: 'BE',
      value: 'be',
    },
  ],
})

const pass = await password({ message: 'What is your password?' })

console.log(name, job, pass)
