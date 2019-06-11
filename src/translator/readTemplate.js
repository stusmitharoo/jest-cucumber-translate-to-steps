const fs = require('fs')

exports.template = (templatePath) => {
  const readTemplate = fs.readFileSync(templatePath, 'utf8')
  return readTemplate
}