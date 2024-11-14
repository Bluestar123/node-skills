- 创建包
  npm init -w packages/core -y
  npm init -w packages/cli -y

- cli 依赖 core
  npm install core --workspace cli

- 在单个包下 执行命令
  npm exec --workspace @aaron-yarn/npm-cli -- npx tsc --init

- 所有包都执行命令
  npm exec --workspaces -- npx tsc --init

- 安装包 npm exec --workspace @aaron-yarn/npm-core -- npx tsc

- npm exec --workspaces -- npx tsc
