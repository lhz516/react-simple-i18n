import React, { FC, ReactElement } from 'react'
import PropTypes from 'prop-types'
import I18nContext, { I18n } from './context'

interface ProviderProps {
  i18n: I18n
  children: ReactElement
}

const I18nProvider: FC<ProviderProps> = ({ i18n, children }) => (
  <I18nContext.Provider value={i18n}>{children}</I18nContext.Provider>
)

export default I18nProvider
