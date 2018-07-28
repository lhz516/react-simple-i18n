import React from 'react'
import I18nContext from './context'

const I18nProvider = ({ i18n, children }) => (
  <I18nContext.Provider value={i18n}>{children}</I18nContext.Provider>
)

export default I18nProvider
