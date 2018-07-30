import React from 'react'
import { mount } from 'enzyme'
import withI18n from './with-i18n'

// TODO after this issue get fixed: https://github.com/airbnb/enzyme/issues/1620
// jest.mock('./context', () => {
//   const createI18n = require('./create-i18n').default
//   const { testLangData } = require('./create-i18n.test')
//   const context = require('react').createContext(createI18n(testLangData))
//   return context
// })

jest.mock('./context', () => {
  const createI18n = require('./create-i18n').default
  const { testLangData } = require('./create-i18n.test')
  return {
    Consumer: (props) => props.children(createI18n(testLangData)),
  }
})

const TestComp = () => (
  <div>Test Component</div>
)

const WrappedTestComp = withI18n(TestComp)

describe('I18nProvider', () => {
  it('shuold render the HOC', () => {
    const wrapper = mount(<WrappedTestComp />)
    const instance = wrapper.instance()
    const i18n = instance.i18n
    instance.updateHandler()
    expect(i18n._getListenHandlers().length).toBe(1)
    expect(i18n.getLang()).toBe('enUS')
    wrapper.unmount()
    expect(i18n._getListenHandlers().length).toBe(0)
  })
})
