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
