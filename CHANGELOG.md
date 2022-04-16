## 1.3.0

- Add TypeScript support
- Add React 18 as peerDependency

## 1.2.1

- Add React 17 to `peerDependencies`

## 1.2.0

- Support React hooks support
## 1.1.0

- Support nested language data
  - `{ enUS: { nav: { home: 'Home' } } }` can be accessed by `t('nav.home')`
- Support template in `i18n.t` function
- Support `i18n.addLangData`

## 1.0.0

- Add argument validation to `createI18n`
- Add `_getListenHandlers` to `i18n` object
- Initial language will be set to `enUS` only if language data has `enUS` key

## Before 1.0.0

- Beta version with core features
