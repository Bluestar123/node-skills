- private: true, 最外层的不发布

- 复制 需要的模板 npm i --no-save create-vite

- changeset 发布
- pnpm add --save-dev -w @changesets/cli prettier-plugin-organize-imports prettier-plugin-packagejson
- -w 是根目录安装

- npx changeset init 初始化

- 代码改动 npx changeset add

- 多了临时文件

- npx changeset version 合并

- 执行 git 操作

- npx changeset publish 发布包

---

cli 添加 create 作为依赖

- pnpm --filter cli add @aaron-wang/create --workspace
  --filter 指定 cli 包下执行 add
  --workspace 本地查找

- 包下执行 命令 pnpm --filter cli exec npx tsc --init

pnpm --filter cli exec npx tsc

---

pnpm --filter cli add commander fs-extra

pnpm --filter cli add --save-dev @types/fs-extra
