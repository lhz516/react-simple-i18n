import createI18n, { getI18nValue } from './create-i18n'

export const testLangData = {
  enUS: {
    hello: 'Hello',
    greetings: 'Welcome back! %s%',
    cars: 'This car is %s%, that car is %s%',
    nav: {
      home: 'Home',
    },
  },
  zhCN: {
    hello: '你好',
    greetings: '欢迎回来! %s%',
    cars: '这辆车是%s%，那辆车是%s%',
    nav: {
      home: '首页',
    },
  },
}

describe('createI18n', () => {
  it('should create i18n object with empty data and call addLangData correctly', () => {
    const i18n = createI18n()
    expect(typeof i18n).toBe('object')
    expect(i18n.getLang()).toBe(null)
    expect(() => i18n.t('hello')).toThrow()

    global.console.error = jest.fn()
    i18n.setLang('enUS')
    expect(global.console.error).toBeCalled()
    expect(() => i18n.t('hello')).toThrow()

    i18n.addLangData(testLangData)
    i18n.setLang('enUS')
    expect(i18n.t('hello')).toBe('Hello')
    expect(i18n.t('home.about')).toBe('home.about')
    expect(() => i18n.t(undefined)).toThrow()
    expect(() => i18n.t(null)).toThrow()
  })

  it('should work with string template', () => {
    const i18n = createI18n(testLangData)
    expect(i18n.t('greetings')).toBe('Welcome back! %s%')
    expect(i18n.t('greetings', 'Hanz')).toBe('Welcome back! Hanz')
    expect(i18n.t('cars')).toBe('This car is %s%, that car is %s%')
    expect(i18n.t('cars', 'BMW')).toBe('This car is BMW, that car is %s%')
    expect(i18n.t('cars', 'BMW', 'TOYOTA')).toBe('This car is BMW, that car is TOYOTA')
    expect(i18n.t('cars', 'BMW', 'TOYOTA', 'HONDA')).toBe('This car is BMW, that car is TOYOTA')
    i18n.setLang('zhCN')
    expect(i18n.t('greetings', 'Hanz')).toBe('欢迎回来! Hanz')
    expect(i18n.t('cars', 'BMW', 'TOYOTA')).toBe('这辆车是BMW，那辆车是TOYOTA')
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
    // @ts-ignore
    expect(() => createI18n({}, 123)).toThrow()
  })

  it('should test different cases of getI18nValue', () => {
    expect(getI18nValue(testLangData.enUS, 'nav.home')).toBe('Home')
    expect(getI18nValue(testLangData.enUS, 'nav.home', key => `EMPTY_${key}`)).toBe('Home')
    expect(getI18nValue(testLangData.zhCN, 'nav.home')).toBe('首页')
    expect(getI18nValue(testLangData.enUS, 'nav')).toBe('nav')
    expect(getI18nValue(testLangData.enUS, 'nav.about')).toBe('nav.about')
    expect(getI18nValue(testLangData.enUS, 'nav.about', key => `EMPTY_${key}`)).toBe('EMPTY_nav.about')
    expect(getI18nValue(testLangData.enUS, 'hello')).toBe('Hello')
    expect(getI18nValue({}, '', key => 'No translation')).toBe('No translation')
    expect(getI18nValue({}, '')).toBe('')
    expect(getI18nValue({}, 'key')).toBe('key')
    expect(getI18nValue({ a: 'hi' }, 'key')).toBe('key')
  })
})
