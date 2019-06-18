const featureTemplate = (scenarioBlock) => {
  return "defineFeature(feature, test => {\n  " + scenarioBlock + "\n})\n"
}
const scenarioTemplate = (scenarioTitle, steps) => {
  return "test('" + scenarioTitle + "', ({ given, when, then }) => {\n    " + steps + "\n  })"
}
const stepTemplate = (stepKeyword, stepMatcher, stepArgumentVariables) => {
  return stepKeyword + "(" + stepMatcher + ", (" + stepArgumentVariables.join(', ') + ") => {})"
}
const stepTextArgumentRegex = /([-+]?[0-9]*\.?[0-9]+|\"(.+)\"|\"?\<(.*)\>\"?)/g
const escapeRegexCharacters = (text) => {
  return text
      .replace(/\$/g, '\\$')
      .replace(/\(/g, '\\(')
      .replace(/\)/g, '\\)')
}
const convertStepTextToRegex = (step) => {
  let stepText = escapeRegexCharacters(step.stepText)
  let match
  while (match = stepTextArgumentRegex.exec(stepText)) {
      stepText = stepText.replace(new RegExp(match[1], 'g'), '(.*)')
  }
  return "/^" + stepText + "$/"
}
const getStepArguments = (step) => {
  let stepArgumentVariables = []
  let index = 0
  while (match = stepTextArgumentRegex.exec(step.stepText)) {
      stepArgumentVariables.push("arg" + index)
      index++
  }
  if (step.stepArgument) {
      if (typeof step.stepArgument === 'string') {
          stepArgumentVariables.push('docString')
      }
      else {
          stepArgumentVariables.push('table')
      }
  }
  return stepArgumentVariables
}
const getStepMatcher = (step) => {
  let stepMatcher = ''
  if (step.stepText.match(stepTextArgumentRegex)) {
      stepMatcher = convertStepTextToRegex(step)
  }
  else {
      stepMatcher = "'" + step.stepText + "'"
  }
  return stepMatcher
}
const getStepKeyword = (steps, stepPosition) => {
  let currentStep = steps[stepPosition]
  const containsConjunction = (keyword) => {
    return ['but', 'and'].indexOf(keyword) !== -1
  }
  return steps
      .slice(0, stepPosition)
      .map((step) => {
        return step.keyword
      })
      .reverse()
      .reduce((previousKeyword, nextKeyword) => {
      if (!containsConjunction(previousKeyword)) {
          return previousKeyword
      }
      else {
          return nextKeyword
      }
  }, currentStep.keyword)
}
const generateStepCode = (steps, stepPosition) => {
  let step = steps[stepPosition]
  return stepTemplate(getStepKeyword(steps, stepPosition), 
    getStepMatcher(step), 
    getStepArguments(step))
}
const generateScenarioCode = (scenario) => {
  let stepsCode
  stepsCode = scenario.steps.map((step, index) => {
    return generateStepCode(scenario.steps, index)
  })
  return scenarioTemplate(scenario.title, stepsCode.join('\n\n\t\t'))
}
const scenariosBlock = (scenarios) => {
  let appendedScenario = []
  scenarios.forEach(scenario => {
    appendedScenario.push(generateScenarioCode(scenario))
  })
  return appendedScenario.join('\n\n').toString()
}
exports.generateFeatureCode = (scenarios) => {
  const scenarioBlock = scenariosBlock(scenarios)
  return featureTemplate(scenarioBlock)
}
