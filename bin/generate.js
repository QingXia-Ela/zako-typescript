const fs = require('node:fs')

const args = process.argv
const template = fs.readFileSync('./template/diagnosticMessage.js', 'utf-8')

const writeFile = (path, content) => {
  try {
    fs.ensureFileSync(path)
    console.log('There is already a file: ' + path);
    process.exit(1)
  } catch (e) {
    // no file or dir. can create file safe
    const finalPath = path.split('/').slice(0, -1).join('/')
    fs.mkdirSync(finalPath, { recursive: true })
    fs.writeFileSync(path, content, 'utf-8')
  }
}

/**
 * @param {string[]} args process args
 */
const getIOLang = (args) => {
  if (args.length < 4) {
    console.log('Usage: pnpm generate -input:<basicLang> -output:<langName/localLangName>');
    console.log('Example: pnpm generate -input:zh-cn -output:zako/zh-cn');
    process.exit(1)
  }

  // TODO!: validate input and output
  const input = args.filter(x => x.startsWith('-input:'))[0].split(':')[1]
  const output = args.filter(x => x.startsWith('-output:'))[0].split(':')[1]

  return {
    input,
    output
  }
}

/**
 * generate lang file template
 * @param {string} input 
 * @param {string} output 
 * @returns {string}
 */
const generateTemplate = (input, output) => {
  const [name, localName] = output.split('/')
  const lang = require('typescript/lib/' + input + '/diagnosticMessages.generated.json')

  for (const key in lang) {
    // first is the refer sequence, second is the custom sequence
    lang[key] = [
      lang[key]
    ]
  }

  return template.replace('/* @template_fill */', JSON.stringify(lang, null, 2))
}

const { input, output } = getIOLang(args)

const content = generateTemplate(input, output)

writeFile('./lang/' + output + '/diagnosticMessages.js', content)
