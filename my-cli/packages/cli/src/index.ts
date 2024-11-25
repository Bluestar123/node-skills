#!/usr/bin/env node
import create from '@aaron-wang/create'
import { Command } from 'commander'
import fse from 'fs-extra'
import path from 'path'

console.log(import.meta.dirname)
const pkgJson = fse.readJsonSync(
  path.join(import.meta.dirname, '../package.json'),
)

const program = new Command()

program.name('my-cli').description('My CLI').version(pkgJson.version)

program
  .command('create')
  .description('Create a new project')
  .action(async () => {
    create()
  })

program.parse()
