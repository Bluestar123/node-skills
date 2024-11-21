import postcss from 'rollup-plugin-postcss'
import myExtractCssRollupPlugin from './extract-css.js'

//上面的 @type 是 jsdoc 的语法，也就是 ts 支持的在 js 里声明类型的方式。
/** @type {import("rollup").RollupOptions} */
export default {
  input: 'src/index.js',
  output: [
    {
      file: './dist/cjs.js',
      format: 'cjs',
    },
    {
      file: './dist/esm.js',
      format: 'esm',
    },
    {
      file: './dist/umd.js',
      format: 'umd',
      name: 'Aaron',
    },
  ],
  // treeshake: false,
  plugins: [
    myExtractCssRollupPlugin({
      filename: 'xx.css',
    }),
    // postcss({
    //   // extract: true,
    //   extract: 'index.css', // 单独打包一份 css 文件
    // }),
  ],
}
