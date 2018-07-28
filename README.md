# React Simple I18n

- React i18n solution with context API, support React 16.3.0+
- Simple usage, easy to configure

## Usage

```jsx
import React, { Component } from 'react'
import { render } from 'react-dom'
import { createI18n, I18nProvider, withI18n } from 'react-simple-i18n'

const langData = {
  enUS: {
    projects: 'Projects',
  },
  zhCN: {
    projects: '项目',
  },
}

class Demo extends Component {
  handleSetEnglish = () => {
    this.props.i18n.setLang('enUS')
  }

  handleSetChinese = () => {
    this.props.i18n.setLang('zhCN')
  }

  render() {
    const { t } = this.props
    return (
      <div>
        <p>{t('projects')}</p>
        <button onClick={this.handleSetEnglish}>English</button>
        <button onClick={this.handleSetChinese}>中文</button>
      </div>
    )
  }
}

const DemoWithI18n = withI18n(Demo)

const App = () => (
  <I18nProvider i18n={createI18n(langData, { lang: 'enUS' })}>
    <DemoWithI18n />
  </I18nProvider>
)

render(<App />, document.getElementById('app-root'))
```

## Top Level API

### createI18n(data, options)

Create an `i18n` object for `I18nProvider`

#### Arguments

- `data` Language data object, see usage above
- `options`
  - `lang` Initial language to use

#### Return

- `i18n`
  - `t` Get translation by language name
  - `setLang` Set language by language name
  - `listen` Add listener to language change
  - `unlisten` Unbind a listener of language change

### \<I18nProvider i18n\>

Make `i18n` available to `withI18n` HOC

#### Props

- `i18n`: I18n object created by `createI18n`


### withI18n(Component)

Connects a React component to `i18n` object.

# License

MIT
