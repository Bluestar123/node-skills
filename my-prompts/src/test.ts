import prompts, { PromptObject } from 'prompts'

const questions: PromptObject[] = [
  {
    type: 'text',
    name: 'name',
    message: 'What is your name?',
    initial: 'Aaron',
  },
  {
    type: 'number',
    name: 'age',
    message: 'How old are you?',
    validate: (value) => (value < 18 ? `Please enter a number` : true),
  },
  {
    type: 'password',
    name: 'secret',
    message: 'set a password',
  },
  {
    type: 'confirm',
    name: 'confirmed',
    message: 'Can you confirm?',
  },
  {
    type: 'toggle',
    name: 'sex',
    message: 'sex',
    active: 'male',
    inactive: 'female',
  },
  {
    type: 'select',
    name: 'color',
    message: 'Pick a color',
    choices: [
      { title: 'Red', description: 'This is red', value: '#ff0000' },
      { title: 'Green', description: 'This is green', value: '#00ff00' },
      { title: 'Blue', description: 'This is blue', value: '#0000ff' },
    ],
  },
  {
    type: 'multiselect',
    name: 'multiColor',
    message: 'Pick colors',
    choices: [
      { title: 'Red', description: 'This is red', value: '#ff0000' },
      { title: 'Green', value: '#00ff00' },
      { title: 'Blue', value: '#0000ff' },
    ],
  },
  {
    type: 'date',
    name: 'birthday',
    message: 'When is your birthday?',
    validate: (value) => (value < new Date() ? `Please enter a date` : true),
  },
]

const fn = async () => {
  const answers = await prompts(questions)

  console.log(answers)
}

fn()
