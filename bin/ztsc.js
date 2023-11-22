const ts = require('typescript')


const config = require('../config.json')
const defaultConfig = require('../lib/default_config.json')

// merge
for (const key in defaultConfig) {
  if (!config[key]) {
    config[key] = defaultConfig[key]
  }
}

/**
 * @type {import('typescript/lib/zh-cn/diagnosticMessages.generated.json')}
 * 
 * import basic lang tips
 * 
 * TODO!: Resolve en-us lang file
 */
const lang = require('typescript/lib/' + config.basicLang + '/diagnosticMessages.generated.json')
// import preset lang
const selectLang = require('../lang/' + config.lang + '/diagnosticMessages.js')
// import user custom lang
const customLang = require('../customLang.js')

// merge
for (const key in selectLang) {
  lang[key] = selectLang[key]
}
// merge
for (const key in customLang) {
  lang[key] = customLang[key]
}

// diag = function ({ key, ...args }) {
//   return { key, ...args, message: lang[key] }
// }

// require('typescript/lib/tsc.js')
let fileNames = ['./test.ts'];

// 设置编译选项
let options = {
  noEmitOnError: true,
  noImplicitAny: true,
  target: ts.ScriptTarget.ES5,
  module: ts.ModuleKind.CommonJS
};

// 创建一个程序
let program = ts.createProgram(fileNames, options);

// 获取预发射诊断信息
let diagnostics = ts.getPreEmitDiagnostics(program);

console.log(program.getSemanticDiagnostics);

const host = {
  getCurrentDirectory: () => '',
  getNewLine: () => '\n',
  getCanonicalFileName: (x) => x,
}

// 打印诊断信息
diagnostics.forEach((diagnostic) => {
  console.log(ts.formatDiagnosticsWithColorAndContext([diagnostic], host));
});