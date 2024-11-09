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
