# React Simple I18n

<div>
  <a href="https://www.npmjs.com/package/react-simple-i18n" title="MIT License">
    <img src="https://img.shields.io/npm/l/react-simple-i18n.svg?color=brightgreen" alt="MIT License">
  </a>
  <a href="https://www.npmjs.com/package/react-simple-i18n" title="Monthly download">
    <img src="https://img.shields.io/npm/dm/react-simple-i18n.svg?color=green" alt="Monthly download">
  </a>
  <a href="https://www.npmjs.com/package/react-simple-i18n" title="Latest version">
    <img src="https://img.shields.io/npm/v/react-simple-i18n.svg" alt="Latest version">
  </a>
</div>

- React i18n solution with context API, support React 16.3.0+ (16.8.0+ if use hooks)
- Written in TypeScript
- Lightweight, simple usage, easy to configure
    - Lib size: 13.02KB
    - Minified: 6.48KB (with [compression-webpack-plugin](https://github.com/webpack-contrib/compression-webpack-plugin))
    - Gzipped: 2.13KB
- 100% test coverage, reliable

## Usage

Define languages data first
```jsx
const langData = {
  enUS: {
    projects: 'Projects',
    cars: 'This car is %s%, that car is %s%',
    nav: {
      home: 'Home',
    },
  },
  zhCN: {
    projects: '项目',
    cars: '这辆车是%s%，那辆车是%s%',
    nav: {
      home: '首页',
    },
  },
}
```

Choice A: Use React hook
```jsx
import React, { Component } from 'react'
import { createI18n, I18nProvider, useI18n } from 'react-simple-i18n'

const Demo = () => {
  const { t, i18n } = useI18n()

  return (
    <div>
      <p>{t('projects')}</p>
      <p>{t('cars', 'BMW', 'TOYOTA')}</p>
      <p>{t('nav.home')}</p>
      <button onClick={() => i18n.setLang('enUS')}>English</button>
      <button onClick={() => i18n.setLang('zhCN')}>中文</button>
    </div>
  )
}

const App = () => (
  <I18nProvider i18n={createI18n(langData, { lang: 'enUS' })}>
    <Demo />
  </I18nProvider>
)
```

Choice B: Use traditional HOC
```jsx
import React, { Component } from 'react'
import { createI18n, I18nProvider, withI18n } from 'react-simple-i18n'

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
        <p>{t('cars', 'BMW', 'TOYOTA')}</p>
        <p>{t('nav.home')}</p>
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
```

## Top Level API

### createI18n(data, options)

Creates an `i18n` object for `I18nProvider`

#### Arguments

- `data` Language data object, see usage above
- `options`
  - `lang` Initial language to use
  - `defaultText` Function that returns default text if i18n doesn't exist. It takes a single argument which is the i18n key string.

#### Return

- `i18n`
  - `t(key, ...args)` Get translation by language name
    - @param `key` {string} key of a translation field
    - @param `args` {[string]} strings to replace `%s%` in the field
  - `getLang()` Get current language
    - @return {string} current language name, such as `enUS`
  - `setLang(lang)` Set language by language name
    - @param `lang` {string} language name, such as `enUS`
  - `addLangData(langData)` Async add language data, allow adding multiple languages once
    - @param `langData` {object} Language object `{ enUS: { key: 'value' } }`
  - `listen(handler)` Add listener to language change
    - @param `handler` {func()} function which will be called when language change
  - `unlisten(handler)` Unbind a listener of language change
    - @param `handler` {func()} function which will be called when language change

### \<I18nProvider i18n\>

Makes `i18n` available to `withI18n` HOC and `useI18n` hook

#### Props

- `i18n` I18n object created by `createI18n`


### withI18n(Component)

Connects a React component to `i18n` object.
Adds `t` and `i18n` to props of wrapped component.

### useI18n()

A React hook that returns an object with `t` and `i18n`.

# License

MIT
