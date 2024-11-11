- package.json 中添加

```
"private": "true", // 不把这个目录发到npm上
"workspaces": [
    "packages/*"
],
```

- 初始化项目
  npm init -w packages/cli -y
  npm init -w packages/core -y

-w 是 --workspace，会自动添加 包到 package.json 的workspaces 数组中。

- yarn workspace cli add core@1.0.0
  这里 core 需要版本号，否则会从 npm 仓库查找依赖。yarn 历史 bug

- 编译 npx tsc
- 执行 node dist/indexjs

- 某个 workspace 下安装依赖
  yarn workspace `cli` add `chalk commander`
  删除依赖用 yarn workspace xxx remove

- 如果报错 You must sign up for private packages

```
"publishConfig": {
    "access": "public"
},
```

- Scope not found
  需要npm创建组织
