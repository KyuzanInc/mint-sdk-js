import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'src/index.ts',
  output: {
    sourcemap: 'inline', // devとかに応じて変えないと
    file: 'dist/index.js',
  },
  plugins: [
    commonjs(),
    typescript({
      declaration: true,
      rootDir: './src',
      declarationDir: './dist/types',
    }),
  ],
}
