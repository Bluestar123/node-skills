执行打包

- npx rollup -c rollup.config.mjs

组件库的打包需求就是组件分别提供 esm、commonjs、umd 三种模块规范的代码，并且还有单独打包出的 css

处理 css

- npm install --save-dev rollup-plugin-postcss
