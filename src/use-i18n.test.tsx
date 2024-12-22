import React from 'react'
import { render } from '@testing-library/react'
import useI18n from './use-i18n'

jest.mock('./context', () => {
  const createI18n = require('./create-i18n').default
  const { testLangData } = require('./create-i18n.test')
  const context = require('react').createContext(createI18n(testLangData))
  return context
})

describe('useI18n', () => {
  it('should work with hooks', () => {
    const TestComp = () => {
      const { t } = useI18n()
      return <div>{t('hello')}</div>
    }

    const { getByText, unmount } = render(<TestComp />)
    expect(getByText('Hello')).toBeDefined()

    // TODO: find a way to test the length of listenHandlers before and after unmount
    unmount()
    expect(() => getByText('Hello')).toThrow()
  })
})
