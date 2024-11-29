import OpenAI from 'openai'
import fs from 'fs'
const client = new OpenAI({
  apiKey: 'sk-qTUq88pfNq1Khe3QeUaW00nqbmwfu5wBjAgkc7Dq11oCZcCg',
  baseURL: 'https://api.302.ai/v1',
})

const main = async () => {
  const stream = await client.chat.completions.create({
    model: 'gpt-4',
    // 上下文，聊天记录
    messages: [
      // 指定 system.md 定制角色
      // AI 的回答方式就被限定了
      { role: 'system', content: fs.readFileSync('./system.md', 'utf-8') },
      { role: 'user', content: '生成一个 table 的 react 组件' },
      {
        role: 'assistant',
        content: fs.readFileSync('./response1.md', 'utf-8'),
      },
      {
        role: 'user',
        content: '在这个基础上加上 sass 写下样式，并且不要用 table',
      },
    ],
    stream: true, // 流式返回
  })
  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '')
  }
}

main()
