# jest-cucumber-translate-to-steps
Translate a feature file to step.js files using the jest-cucumber package
write your'e feature file update the feature_folder in translator.conf.js and then run
```
npm run translate
```


## Install translator:
```
npm install jest-cucumber-translate-to-steps --save-dev
```


## Add the following config to root of your project translator.conf.js
alter paths to match your file
```javascript
module.exports = {
  feature_folder: 'ADD_PATH_TO_FEATURE_FILE',
  output_folder: 'test',
  template_path: 'test/translator/template.js'
}
```


## Create your testing template in test/translator/template.js
### I like to use this version with vue-test-utils and jest
```javascript
import { loadFeature } from 'jest-cucumber'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vue from 'vue'
import merge from 'lodash.merge'
import Component from '../../src/components/ADD_PATH_TO_COMPONENT_HERE'
 
const feature = loadFeature('test/features/ADD_PATH_TO_FEATURE_FILE_HERE')

const localVue = createLocalVue()
localVue.use(Vuex)
Vue.filter('translate', () => {})

function createStore (overrides) {
  const defaultStoreConfig = {
    state: {
    },
    mutations: {
    },
    getters: {
    },
    actions: {
    }
  }
  return new Vuex.Store(
    merge(defaultStoreConfig, overrides)
  )
}

function createWrapper (overrides) {
  const defaultMountingOptions = {
    mocks: {
      $t: () => {},
    },
    localVue,
    store: createStore()
  }
  return shallowMount(Component, merge(defaultMountingOptions, overrides))
}
```

## add translate script to package.json
```
"script": {
  "translate": "node node_modules/jest-cucumber-translate-to-steps/src"
}
```