import { Actions, PlopGeneratorConfig } from 'node-plop'
import slugify from 'slugify'
import * as path from 'path'
import { baseRootPath, baseTemplatesPath, pathExists, pathMake } from '../utils'
const testPath = path.join(baseRootPath, 'test')

export enum ExamplesPrompNames {
  'examplesName' = 'examplesName'
}

type Answers = { [P in ExamplesPrompNames]: string }

const examplesPath = path.join(baseRootPath, 'examples')

export const examplesGenerator: PlopGeneratorConfig = {
  description: 'add an path to examples',
  prompts: [
    {
      type: 'input',
      name: ExamplesPrompNames.examplesName,
      message: 'What should it be examples?',
      default: 'basic'
    }
  ],
  actions: (data) => {
    const answers = data as Answers
    const containerPath = `${examplesPath}/${slugify(answers.examplesName, '-')}`

    if (!pathExists(containerPath)) {
      pathMake(containerPath)
    }

    const actions: Actions = []

    actions.push({
      type: 'add',
      templateFile: `${baseTemplatesPath}/test.add.hbs`,
      path: `${testPath}/pagerduty_${slugify(answers.examplesName, '_')}_test.go`,
      abortOnFail: true
    })

    actions.push({
      type: 'add',
      templateFile: `${baseTemplatesPath}/examples/main.add.hbs`,
      path: `${containerPath}/main.tf`,
      abortOnFail: false
    })

    actions.push({
      type: 'add',
      templateFile: `${baseTemplatesPath}/examples/outputs.add.hbs`,
      path: `${containerPath}/outputs.tf`,
      abortOnFail: true
    })

    actions.push({
      type: 'add',
      templateFile: `${baseTemplatesPath}/examples/provider.add.hbs`,
      path: `${containerPath}/provider.tf`,
      abortOnFail: true
    })

    actions.push({
      type: 'add',
      templateFile: `${baseTemplatesPath}/examples/variables.add.hbs`,
      path: `${containerPath}/variables.tf`,
      abortOnFail: true
    })

    actions.push({
      type: 'add',
      templateFile: `${baseTemplatesPath}/examples/versions.add.hbs`,
      path: `${containerPath}/versions.tf`,
      abortOnFail: true
    })

    return actions
  }
}
