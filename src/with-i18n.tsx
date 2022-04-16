import React, { Component, ComponentType } from 'react'
import I18nContext, { I18n, translateFunc } from './context'
import { Subtract } from 'utility-types'

export interface InjectedProps {
  i18n: I18n
  t: translateFunc
}

const withI18n = <P extends InjectedProps>(WrappedComp: ComponentType<P>) => {
  return class I18nComponent extends Component<Subtract<P, InjectedProps>> {
    i18n: I18n

    updateHandler = () => {
      this.forceUpdate()
    }

    componentDidMount() {
      this.i18n.listen(this.updateHandler)
    }

    componentWillUnmount() {
      this.i18n.unlisten(this.updateHandler)
    }

    render() {
      return (
        <I18nContext.Consumer>
          {(i18n: I18n) => {
            this.i18n = i18n
            return <WrappedComp {...this.props as P} t={i18n.t} i18n={i18n} />
          }}
        </I18nContext.Consumer>
      )
    }
  }
}

export default withI18n;
