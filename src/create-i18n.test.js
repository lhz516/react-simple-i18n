import createI18n, { getNestedValue } from './create-i18n'

export const testLangData = {
  enUS: {
    hello: 'Hello',
    nav: {
      home: 'Home',
    },
  },
  zhCN: {
    hello: '你好',
    nav: {
      home: '首页',
    },
  },
}

describe('createI18n', () => {
  it('should create i18n object with empty data', () => {
    const i18n = createI18n()
    expect(typeof i18n).toBe('object')
    expect(i18n.getLang()).toBe(null)

    global.console.error = jest.fn()
    i18n.setLang('enUS')
    expect(global.console.error).toBeCalled()
    expect(i18n.t('hello')).toBe('')
  })

  it('should create i18n object with valid language data and add/remove listeners', () => {
    const i18n = createI18n(testLangData)
    expect(typeof i18n).toBe('object')
    expect(i18n.getLang()).toBe('enUS')
    i18n.setLang('zhCN')
    expect(i18n.getLang()).toBe('zhCN')
    expect(i18n.t('hello')).toBe('你好')
    expect(i18n.t('nav.home')).toBe('首页')

    const mockOnLanguageChange = jest.fn()
    i18n.listen(mockOnLanguageChange)
    expect(i18n._getListenHandlers().length).toBe(1)
    i18n.setLang('zhCN')
    expect(i18n.getLang()).toBe('zhCN')
    i18n.setLang('enUS')
    expect(i18n.getLang()).toBe('enUS')
    expect(mockOnLanguageChange).toHaveBeenCalledTimes(1)
    

    i18n.unlisten(mockOnLanguageChange)
    expect(i18n._getListenHandlers().length).toBe(0)
    i18n.setLang('zhCN')
    expect(i18n.getLang()).toBe('zhCN')
    expect(mockOnLanguageChange).toHaveBeenCalledTimes(1)
  })

  it('should create i18n object with valid options', () => {
    const i18n = createI18n(testLangData, { lang: 'zhCN' })
    expect(typeof i18n).toBe('object')
    expect(i18n.getLang()).toBe('zhCN')
  })

  it('should throw error if call with invalid language data and options', () => {
    expect(() => createI18n(null)).toThrow()
    expect(() => createI18n({}, 123)).toThrow()
  })

  it('should test different cases of getNestedValue', () => {
    expect(getNestedValue(testLangData.enUS, ['nav', 'home'])).toBe('Home')
    expect(getNestedValue(testLangData.zhCN, ['nav', 'home'])).toBe('首页')
    expect(getNestedValue(testLangData.enUS, ['nav'])).toBe('')
    expect(getNestedValue(testLangData.enUS, ['hello'])).toBe('Hello')
    expect(getNestedValue({}, [])).toBe('')
    expect(getNestedValue({}, [''])).toBe('')
    expect(getNestedValue({}, ['key'])).toBe('')
    expect(getNestedValue({ a: 'hi' }, ['key'])).toBe('')
  })
})
