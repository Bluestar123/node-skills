import { TextPrompt, textPromptOptions } from './TextPrompt.js'

export type PromptOptions = textPromptOptions

const map: Record<string, any> = {
  text: TextPrompt,
}

async function runPrompt(question: PromptOptions, index: number) {
  const PromptClass = map[question.type]

  if (!PromptClass) {
    return null
  }

  return new Promise((resolve) => {
    const prompt = new PromptClass(question)
    prompt.render()
    index === 0 && prompt.moveTop()
    prompt.on('submit', (answer: string) => {
      resolve(answer)
    })
  })
}

export async function prompt(questions: PromptOptions[]) {
  const answers: Record<string, any> = {}
  for (let i = 0; i < questions.length; i++) {
    const name = questions[i].name
    answers[name] = await runPrompt(questions[i], i)
  }
  return answers
}
