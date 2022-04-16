export const getNestedValue = (data: any, keyArr: Array<string>, currentIndex = 0): string => {
  if (currentIndex === keyArr.length) {
    if (typeof data === 'string') {
      return data
    } else {
      return ''
    }
  }

  return getNestedValue(data[keyArr[currentIndex]], keyArr, currentIndex + 1)
}

export default function createI18n(data: any = {}, options: any = {}) {
  let currentLang: string
  let listenHandlers: Array<() => void> = []

  if (data === null || typeof data !== 'object') {
    throw new Error('React Simple I18n: Language data should be an object')
  }

  if (options === null || typeof options !== 'object') {
    throw new Error('React Simple I18n: Options should be an object')
  }

  const { lang } = options
  const langData = data

  currentLang = lang || (data.enUS ? 'enUS' : null)

  function t(key: string, ...args: string[]) {
    if (!key || !currentLang || typeof key !== 'string') return ''

    const keyArr = key.split('.')
    const value = getNestedValue(langData[currentLang], keyArr)
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
