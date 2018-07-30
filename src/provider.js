import React from 'react'
import PropTypes from 'prop-types'
import I18nContext from './context'

const I18nProvider = ({ i18n, children }) => (
  <I18nContext.Provider value={i18n}>{children}</I18nContext.Provider>
)

I18nProvider.propTypes = {
  children: PropTypes.element.isRequired,
  i18n: PropTypes.object.isRequired,
}

export default I18nProvider
