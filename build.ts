import * as path from 'path'
import { argv } from 'process'
import { build, BuildOptions } from 'esbuild'

const isProduction = argv[2] === 'production'

const options: BuildOptions = {
  entryPoints: [path.resolve(__dirname, 'src/index.ts')] as string[],
  minify: isProduction,
  bundle: true,
  target: ['es6'],
  platform: 'neutral',
  format: 'esm',
  watch: argv[3] === 'w',
  sourcemap: !isProduction,
  outdir: path.resolve(__dirname, 'lib'),
  tsconfig: path.resolve(__dirname, 'tsconfig.json'),
}

build(options).catch((err) => {
  process.stderr.write(err.stderr)
  process.exit(1)
})
