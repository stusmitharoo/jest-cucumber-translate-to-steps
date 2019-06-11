const path = require('path')

const folderPath = (outputFolder, inputPath) => {
  const output = outputFolder
  const dir = path.dirname(inputPath).split('/').pop()
  const folder = output.concat('/', dir)
  return folder
}

exports.createFile = (outputFolder, inputPath) => {
  const folder = folderPath(outputFolder, inputPath)
  const ext = '.step.js'
  const file = folder.concat(ext)
  return file
}

exports.createFolder = (outputFolder, inputPath) => {
  const folder = folderPath(outputFolder, inputPath)
  return folder
}
