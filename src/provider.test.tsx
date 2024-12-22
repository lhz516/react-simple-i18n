import React from 'react'
import { render } from '@testing-library/react'
import I18nProvider from './provider'
import { I18n } from './context'

const TestChildrenComponent = () => <div>Test Children Component</div>

describe('I18nProvider', () => {
  it('should render I18nProvider', () => {
    const mockI18n = {} as jest.MockedObject<I18n>

    const { getByText } = render(
      <I18nProvider i18n={mockI18n}>
        <TestChildrenComponent />
      </I18nProvider>,
    )

    expect(getByText('Test Children Component')).toBeDefined()
  })
})
