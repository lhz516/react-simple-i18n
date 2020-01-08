import { useContext, useEffect, useState } from 'react'
import I18nContext from './context'

export default function useI18n() {
  const i18n = useContext(I18nContext)
  const [, setForceUpdate] = useState()

  useEffect(() => {
    i18n.listen(setForceUpdate)

    return () => {
      i18n.unlisten(setForceUpdate)
    }
  }, [])

  return { t: i18n.t, i18n }
}
