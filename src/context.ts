import { createContext } from 'react'

export type handlerFunc = (arg?: object) => void
export type listenerFunc = (func: handlerFunc) => void
export type translateFunc = (key: string, ...args: string[]) => string

export interface I18n {
  t: translateFunc
  getLang: () => string
  setLang: (lang: string) => void
  listen: listenerFunc
  unlisten: listenerFunc
  addLangData: (data: object) => void
  _getListenHandlers: () => Array<() => void>
}

const context = createContext<I18n>(null)

export default context
