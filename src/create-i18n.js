let langData
let currentLang
let listenHandlers = []

export default function createI18n(data, options = {}) {
  const { lang } = options
  langData = data
  currentLang = lang || 'enUS'

  function t(key) {
    if (!key) return ''

    return langData[currentLang][key]
  }

  function listen(handler) {
    listenHandlers.push(handler)
  }

  function unlisten(handler) {
    listenHandlers = listenHandlers.filter((func) => handler !== func)
  }

  function setLang(lang) {
    if (lang === currentLang) return
    if (!data[lang]) {
      return console.error(`Language '${lang}' is not found.`) // eslint-disable-line no-console
    }

    currentLang = lang
    listenHandlers.forEach((func) => {
      func()
    })
  }

  return {
    t,
    setLang,
    listen,
    unlisten,
  }
}
