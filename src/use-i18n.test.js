import React from 'react'
import { mount } from 'enzyme'
import useI18n from './use-i18n'

jest.mock('./context', () => {
  const createI18n = require('./create-i18n').default
  const { testLangData } = require('./create-i18n.test')
  const context = require('react').createContext(createI18n(testLangData))
  return context
})

describe('useI18n', () => {
  it('shuold work with hooks', () => {
    const TestComp = () => {
      const { t } = useI18n()

      return (
        <div>{t('hello')}</div>
      )
    }
    // need `mount` so that `useEffect` will work
    const wrapper = mount(<TestComp />)
    expect(wrapper.text()).toBe('Hello')

    // TODO: find a way to test the length of listenHandlers before and after unmount
    wrapper.unmount()
    expect(wrapper.exists()).toBe(false)
  })
})
