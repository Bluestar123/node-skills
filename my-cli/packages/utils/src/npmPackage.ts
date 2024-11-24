// 安装逻辑

// @ts-ignore
import npminstall from 'npminstall'
import path from 'path'
import fse from 'fs-extra'

import fs from 'fs'
import { getlatestVersion, getNpmregistry } from './versionUtils.js'

export interface NpmPackageOptions {
  name: string
  targetPath: string
}

class NpmPackage {
  name: string
  version: string = ''
  targetPath: string
  storePath: string

  constructor(options: NpmPackageOptions) {
    this.targetPath = options.targetPath
    this.name = options.name
    this.storePath = path.resolve(this.targetPath, 'node_modules')
  }

  async prepare() {
    if (!fs.existsSync(this.targetPath)) {
      fs.mkdirSync(this.targetPath, { recursive: true })
    }
    const version = await getlatestVersion(this.name)
    this.version = version
  }

  async install() {
    await this.prepare()
    return npminstall({
      pkgs: [
        {
          name: this.name,
          version: this.version,
        },
      ],
      registry: getNpmregistry(),
      root: this.targetPath,
    })
  }

  get npmFilePath() {
    // @aaron-wang/cli@1.1.1 => @aaron-wang+cli@1.1.1
    return path.resolve(
      this.storePath,
      `.store/${this.name.replace('/', '+')}@${this.version}/node_modules/${this.name}`,
    )
  }

  async exists() {
    await this.prepare()
    return fs.existsSync(this.npmFilePath) // 判断包是否存在
  }

  async getPackageJSON() {
    if (await this.exists()) {
      return fse.readJsonSync(path.resolve(this.npmFilePath, 'package.json'))
    }
    return null
  }

  async getLatestVersion() {
    return getlatestVersion(this.name)
  }

  async update() {
    const latestVersion = await this.getLatestVersion()
    return npminstall({
      root: this.targetPath, // 在哪里安装
      registry: getNpmregistry(),
      pkgs: [
        {
          name: this.name,
          version: latestVersion,
        },
      ],
    })
  }
}

export default NpmPackage
