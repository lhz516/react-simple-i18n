export interface I18nTextData {
  [textKey: string]: string | I18nTextData
}

export interface I18nLanguageData {
  [languageKey: string]: I18nTextData
}

export type GetDefaultTextType = (key: string) => string

export interface I18nOptions {
  lang?: string
  getDefaultText?: GetDefaultTextType
}

const getNestedValue = (
  data: I18nTextData | string,
  keyArr: Array<string>,
  currentIndex = 0,
): string => {
  if (currentIndex === keyArr.length) {
    if (typeof data === 'string') {
      return data
    }

    return null
  }
  if (typeof data !== 'string') {
    return getNestedValue(
      data?.[keyArr?.[currentIndex]],
      keyArr,
      currentIndex + 1,
    )
  }

  return null
}

export const getI18nValue = (
  data: I18nTextData,
  key: string,
  getDefaultText?: GetDefaultTextType,
): string => {
  const keyArr = key.split('.')

  const text = getNestedValue(data, keyArr)

  if (!text && getDefaultText) {
    return getDefaultText(key)
  }

  return text || key
}

export default function createI18n(
  data: I18nLanguageData = {},
  options: I18nOptions = {},
) {
  let currentLang: string
  let listenHandlers: Array<() => void> = []

  if (data === null || typeof data !== 'object') {
    throw new Error('React Simple I18n: Language data should be an object')
  }

  if (options === null || typeof options !== 'object') {
    throw new Error('React Simple I18n: Options should be an object')
  }

  const { lang, getDefaultText } = options
  const langData = data

  currentLang = lang || (data.enUS ? 'enUS' : null)

  function t(key: string, ...args: string[]) {
    if (!currentLang) {
      throw new Error(
        'React Simple I18n: Current language must be set before using t()',
      )
    }

    if (!key || typeof key !== 'string') {
      throw new Error(
        'React Simple I18n: t() must have string type as its first argument',
      )
    }

    const value = getI18nValue(langData[currentLang], key, getDefaultText)
    if (args.length === 0) {
      return value
    } else {
      let i = 0
      return value.replace(/%s%/gi, () => {
        const output = args[i]
        i += 1
        return typeof output !== 'undefined' ? output : '%s%'
      })
    }
  }

  function listen(handler: (arg?: object) => void) {
    listenHandlers.push(handler)
  }

  function unlisten(handler: (arg?: object) => void) {
    listenHandlers = listenHandlers.filter((func) => handler !== func)
  }

  function getLang() {
    return currentLang
  }

  function setLang(lang: string) {
    if (lang === currentLang) return
    if (!data[lang]) {
      return console.error(`Language '${lang}' is not found.`) // eslint-disable-line no-console
    }

    currentLang = lang
    listenHandlers.forEach((func: (arg?: object) => void) => {
      func({})
    })
  }

  function addLangData(data: object) {
    Object.assign(langData, data)
  }

  function _getListenHandlers() {
    return listenHandlers
  }

  return {
    t,
    getLang,
    setLang,
    listen,
    unlisten,
    addLangData,
    _getListenHandlers,
  }
}
