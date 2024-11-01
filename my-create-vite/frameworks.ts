import chalk from 'chalk'

export type FrameworkVariant = {
  name: string
  display: string
  color: Function
  customCommand?: string
}

export type Framework = {
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

// [vue, vuew-ts, react, react-ts]
export const TEMPLATES = FRAMEWORKS.map((f) => {
  return f.variants.map((v) => v.name)
}).reduce((acc, cur) => acc.concat(cur), [])
export default FRAMEWORKS
