import React, { Component } from 'react'
import I18nContext from './context'

export default function withI18n(WrappedComp) {
  return class I18nComponent extends Component {
    componentDidMount() {
      this.updateHandler = () => {
        this.forceUpdate()
      }
      this.i18n.listen(this.updateHandler)
    }

    componentWillUnmount() {
      this.i18n.unlisten(this.updateHandler)
    }

    render() {
      return (
        <I18nContext.Consumer>
          {i18n => {
            this.i18n = i18n
            return <WrappedComp {...this.props} t={i18n.t} i18n={i18n} />
          }}
        </I18nContext.Consumer>
      )
    }
  }
}
