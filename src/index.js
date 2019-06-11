"use strict"
const Config = require('../../test/gherkinTranslator/gherkinTranslator.conf.js')
const getFeatureFile = require('./translator/readFeature')
const generatePaths = require('./translator/generatePaths')
const generateCode = require('./translator/generateCode')
const readTemplate = require('./translator/readTemplate')
const writeSteps = require('./translator/writeSteps')

const featureFiles = getFeatureFile.readFile(Config.feature_folders)
const scenarios = featureFiles.scenarios
const template = readTemplate.template(Config.template_path)
const featureCode = generateCode.generateFeatureCode(scenarios)
const folder = generatePaths.createFolder(Config.output_folder, Config.feature_folders)
const file = generatePaths.createFile(Config.output_folder, Config.feature_folders)

writeSteps.writeNewFile(template, featureCode, folder, file)