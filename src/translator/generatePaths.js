const path = require('path')

const folderPath = (outputFolder, inputPath) => {
  const output = outputFolder
  const dir = path.dirname(inputPath).split('/').pop()
  const folder = output.concat('/', dir)
  return folder
}

exports.createFile = (outputFolder, inputPath) => {
  const folder = folderPath(outputFolder, inputPath)
  const ext = '.steps.js'
  const base = path.basename(inputPath).split('.').slice(0, 1).toString()
  const file = folder.concat('/', base).concat(ext)
  return file
}

exports.createFolder = (outputFolder, inputPath) => {
  const folder = folderPath(outputFolder, inputPath)
  return folder
}
