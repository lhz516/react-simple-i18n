import React from 'react'
import { shallow } from 'enzyme'
import I18nProvider from './provider'

// TODO mount Provider after this issue get fixed: https://github.com/airbnb/enzyme/issues/1620

const TestChildrenComponent = () => (
  <div>Test Children Component</div>
)

describe('I18nProvider', () => {
  it('shuold render I18nProvider', () => {
    const mockI18n = {}
    const wrapper = shallow(
      <I18nProvider i18n={mockI18n}>
        <TestChildrenComponent />
      </I18nProvider>,
    )
    expect(wrapper.prop('value')).toBe(mockI18n)
  })
})
