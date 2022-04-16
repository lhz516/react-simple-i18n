import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import I18nContext, { handlerFunc, I18n, listenerFunc } from './context'

interface HookedI18n {
  t: (key: string, ...args: string[]) => string
  i18n: I18n
}

export default function useI18n(): HookedI18n {
  const i18n = useContext(I18nContext)
  const [, setForceUpdate] = useState<undefined>()

  useEffect(() => {
    i18n.listen(() => {
      setForceUpdate(undefined);
    })

    return () => {
      i18n.unlisten(() => {
        setForceUpdate(undefined);
      })
    }
  }, [])

  return { t: i18n.t, i18n }
}
