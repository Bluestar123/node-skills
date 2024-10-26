import { prompt, PromptOptions } from './index.js'

const questions: PromptOptions[] = [
  {
    message: '你的名字?',
    type: 'text',
    name: 'name',
  },
  {
    message: '年龄?',
    type: 'text',
    name: 'age',
  },
]
async function fn() {
  const answers = await prompt(questions)
  console.log(answers)
}

fn()
