const config = require('../config.json')
const defaultConfig = require('./default_config.json')

// merge
for (const key in defaultConfig) {
  if (!config[key]) {
    config[key] = defaultConfig[key]
  }
}

function conbineLang(lang1, lang2) {
  for (const key in lang2) {
    // index 1 is custom sequence, index 0 is refer sequence
    let seq = lang2[key][1] || lang2[key][0]
    seq && (lang1[key] = seq)
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
conbineLang(lang, selectLang)
// merge
conbineLang(lang, customLang)

const { setLocalizedDiagnosticMessages } = require('typescript/lib/tsserver.js')

setLocalizedDiagnosticMessages(lang)
