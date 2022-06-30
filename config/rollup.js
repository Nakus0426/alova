/*
 * @Date: 2020-04-09 11:06:01
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2022-06-12 10:04:03
 */
var typescript = require('rollup-plugin-typescript2');
var pkg = require('../package.json');
var version = pkg.version;
var name = pkg.name;
var author = pkg.author;

var banner =
  `/**
  * ${pkg.name} ${version} (https://github.com/${author}/${name})
  * API https://github.com/${author}/${name}/blob/master/doc/api.md
  * Copyright ${(new Date).getFullYear()} ${author}. All Rights Reserved
  * Licensed under MIT (https://github.com/${author}/${name}/blob/master/LICENSE)
  */
`;

const getCompiler = (opt = {
  // objectHashIgnoreUnknownHack: true,
  // clean: true,
  tsconfigOverride: {
    compilerOptions: {
      module: 'ES2015'
    }
  }
}) => typescript(opt);
exports.name = pkg.name;
exports.banner = banner;
exports.getCompiler = getCompiler;
exports.external = ['vue', 'react'];
const compilePaths = {
  core: {
    input: 'src/index.ts',
    output: suffix => `dist/${pkg.name}.${suffix}.js`,
  },
  vue: {
    input: 'src/predefine/VueHook.ts',
    output: suffix => `dist/hooks/vuehook.${suffix}.js`,
  },
  react: {
    input: 'src/predefine/ReactHook.ts',
    output: suffix => `dist/hooks/reacthook.${suffix}.js`,
  }
};
const compileModule = process.env.MODULE || 'core';
exports.compilePath = compilePaths[compileModule];