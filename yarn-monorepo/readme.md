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

### 使用 changeset 管理版本

changeset 就是一次改动的集合，可能一次改动会涉及到多个 package，多个包的版本更新，这合起来叫做一个 changeset

yarn add --dev -W @changesets/cli prettier-plugin-organize-imports prettier-plugin-packagejson

npx changeset init

- 指定 执行命令

yarn workspace @guang-yarn/core run build

yarn workspaces run build 全都跑 build

### semver 规范版本号

- 主版本号递增：当做了不兼容的API修改时，主版本号递增，1.x.x => 2.x.x
- 此版本号递增：当添加了新的功能但保持与主版本号的向后兼容，此版本号递增，1.0.0 => 1.1.0
- 修订号递增：当修复了程序错误但没有添加新功能或破坏性改动时，修订号递增，1.0.0 => 1.0.1

- npx changeset add 处理版本选择
- npx changeset version 生成最终版本信息
- git 操作完 执行 npx changeset publish

- changeset 的两个功能：

1. 根据用户选择来更新版本号，并且自动更新依赖的版本号和 dependencies 里的版本
2. 自动发布所有改动的包到 npm 仓库，并打 tag，和生成 CHAGELOG.md

- yarn workspaces info 查看包依赖信息
