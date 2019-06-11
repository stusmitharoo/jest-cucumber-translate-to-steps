const fs = require('fs')

const makeDirectories = (folder) => {
  fs.mkdir(folder, () => {
  })
  return true
}
const appendFile = (data, file) => {
  fs.appendFileSync(file, data, (err) => {
    console.log(err)
  })
  return true
}
exports.writeNewFile = (template, featureCode, folder, file) => {
  makeDirectories(folder)
  appendFile(template, file)
  appendFile(featureCode, file)
}