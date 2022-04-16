import React, { Component, FC } from 'react'
import { mount } from 'enzyme'
import withI18n, { InjectedProps } from './with-i18n'
import { I18n } from './context'

jest.mock('./context', () => {
  const createI18n = require('./create-i18n').default
  const { testLangData } = require('./create-i18n.test')
  const context = require('react').createContext(createI18n(testLangData))
  return context
})

interface TestCompProps extends InjectedProps {}

const TestComp: FC<TestCompProps> = () => (
  <div>Test Component</div>
)

const WrappedTestComp = withI18n<TestCompProps>(TestComp)

describe('I18nProvider', () => {
  it('shuold render the HOC', () => {
    const wrapper = mount<any>(<WrappedTestComp />)
    const instance = wrapper.instance()
    const i18n = instance.i18n as I18n
    instance.updateHandler()
    expect(i18n._getListenHandlers().length).toBe(1)
    expect(i18n.getLang()).toBe('enUS')
    wrapper.unmount()
    expect(i18n._getListenHandlers().length).toBe(0)
  })
})
