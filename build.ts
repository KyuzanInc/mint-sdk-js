const { argv } = require('process')
const { build } = require('esbuild')
const path = require('path')

const isProduction = argv[2] === 'production'

const options = {
  entryPoints: [path.resolve(__dirname, 'src/index.ts')],
  minify: isProduction,
  bundle: true,
  target: ['es6'],
  platform: 'browser',
  format: 'cjs',
  watch: argv[3] === 'w',
  sourcemap: !isProduction,
  outdir: path.resolve(__dirname, 'dist'),
  tsconfig: path.resolve(__dirname, 'tsconfig.json'),
}

build(options).catch((err) => {
  process.stderr.write(err.stderr)
  process.exit(1)
})
