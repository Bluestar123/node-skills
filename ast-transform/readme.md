AST的生成过程通常包括两个阶段：
• 解析（Parsing）和转换（Transformation）。
• 解析是将源代码转换为AST，而转换则是对AST进行优化和扩展。

用 astexplorer.net 访问查看类型

- 解析有哪些节点
  https://github.com/estree/estree?tab=readme-ov-file

- js ast 工具 babel 插件：
  @babel/parser 可以把源码转换成AST
  @babel/traverse 用于对 AST 的遍历，维护了整棵树的状态，并且负责替换、移除和添加节点
  @babel/generate 可以把AST生成源码，同时生成sourcemap
  @babel/types 用于 AST 节点的 Lodash 式工具库, 它包含了构造、验证以及变换 AST 节点的方法，对编写处理 AST 逻辑非常有用
  @babel/core Babel 的编译器，核心 API 都在这里面，比如常见的 transform、parse，并实现了插件功能
