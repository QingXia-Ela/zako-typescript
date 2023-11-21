const config = require('../config.json')
const defaultConfig = require('./default_config.json')

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

const { setLocalizedDiagnosticMessages } = require('typescript/lib/tsserver.js')

setLocalizedDiagnosticMessages(lang)
