- package.json 添加 bin 字段，指定命令名和对应的文件

```json
"bin": {
    "my-cli": "./dist/local-npm/cli.js"
  },
```

- 文件开头添加 `#!/usr/bin/env node`
  这行代码是告诉 shell 用 node 去执行这个文件，就和我们 node ./dist/cli.js 一样

- 执行 npm link

- 任何目录都可以执行 my-cli

- 卸载 npm uninstall -g <package-name> package.json 中的name

- npm link 是 软连接，类似快捷方式

- npm get prefix 全局仓库位置
  open "$(npm get prefix)/bin" 打开文件目录

- 全局安装包的时候做了两件事：
  往 npm get prefix 下的 lib/node_modules 安装了这个包 （用 ln -s 创建的软链）
  往 npm get prefix 下的 bin 里放了这个包里注册的命令 （用 ln -s 创建的软链）
  把这个 bin 目录加到环境变量 $PATH 里 `echo $PATH`

- 在其他项目中安装 npm link cli-progress
  软链的原路径是全局仓库，node_module 和 bin 两个目录下

### 总结

npm link 会做两件事：

在 npm get prefix 下的 lib/node_modules 安装了这个包（用 ln -s 创建的软链）
在 npm get prefix 下的 bin 里放了这个包里注册的命令（用 ln -s 创建的软链）
而 npm link xxx 则是再把这个包 link 到项目的 node_modules 下，并且把命令 link 到项目的 node_modules/.bin 下。

其实和 npm install 一样，就是用软链模拟的 npm install 的过程。
所以删除自然也是用 npm uninstall
