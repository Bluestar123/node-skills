- pnpm 需要手动创建 packages/cli

- cli 中添加 core 依赖
  pnpm --filter pnpm-cli add core --workspace

--filter 是指定在那个包下执行 add, 对应的是 package.json 的name

-- workspace 是从本地查找

- pnpm add typescript @types/node -w --save-dev
  **-w 标识在根目录安装依赖**

- 编译 pnpm --filter pnpm-core exec npx tsc

- 安装三方包 pnpm --filter cli add chalk commander

- pnpm -r exec npx tsc 递归执行， cli 依赖 core， 会先执行 core

- pnpm -r exec rm -rf node_modules 删除所有 node_modules
