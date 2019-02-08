import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import filesize from 'rollup-plugin-filesize';
import pkg from './package.json';

export default [
  {
    external: ['algoliasearch/lite'],
    input: 'index.ts',
    output: {
      name: 'docsearch',
      file: pkg.browser,
      format: 'umd',
      globals: {
        'algoliasearch/lite': 'algoliasearch',
      },
    },
    plugins: [
      resolve({
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
      }),
      babel({
        exclude: 'node_modules/**',
        extensions: ['.js', '.ts', '.tsx'],
      }),
      commonjs(),
      filesize({
        showMinifiedSize: true,
        showGzippedSize: true,
      }),
    ],
  },
  // {
  //   external: ['algoliasearch/lite'],
  //   input: 'index.ts',
  //   output: [
  //     {
  //       file: pkg.main,
  //       format: 'cjs',
  //       globals: {
  //         'algoliasearch/lite': 'algoliasearch',
  //       },
  //     },
  //     {
  //       file: pkg.module,
  //       format: 'es',
  //       globals: {
  //         'algoliasearch/lite': 'algoliasearch',
  //       },
  //     },
  //   ],
  // },
];
