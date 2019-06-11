const fs = require('fs');
const Gherkin = require('gherkin')

const parseStep = (astStep) => {
  return {
      stepText: astStep.text,
      keyword: (astStep.keyword).trim().toLowerCase()
  }
}
const parseSteps = (astScenario) => {
  return astScenario.steps
    .map((astStep) => {
      return parseStep(astStep)
    })
}
const parseScenario = (astScenario) => {
  return {
      title: astScenario.name,
      steps: parseSteps(astScenario)
  }
}
const parseScenarios = function (astFeature) {
  return astFeature.children
      .filter((child) => {
        return child.type === 'Scenario'
      })
      .map((astScenario) => {
        return parseScenario(astScenario)
      })
}
const parseFeature = (ast) => {
  const astFeature = ast.feature;
  return {
      title: astFeature.name,
      scenarios: parseScenarios(astFeature)
  }
}
exports.readFile = (featureFilePath) => {
  if (!fs.existsSync(featureFilePath)) {
      throw new Error("feature_folder path not found")
  }
  const featureText = fs.readFileSync(featureFilePath, 'utf8')
  const ast = new Gherkin.Parser().parse(featureText)
  return parseFeature(ast)
}
