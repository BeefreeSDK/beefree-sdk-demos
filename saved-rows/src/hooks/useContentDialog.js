import { useState, useCallback } from 'react'

const defaultModalConfig = {
  isOpen: false,
  hasTitleBar: true,
  Component: null,
  close: null,
  save: null,
  key: null
}

const useContentDialog = () => {
  const [config, setConfig] = useState(defaultModalConfig)

  const asyncModal = useCallback((Component, args) => {
    return new Promise((resolve, reject) => {
      const handleReject = () => {
        setConfig(defaultModalConfig)
        resolve({})
      }
      const handleResolve = (results) => {
        setConfig(defaultModalConfig)
        resolve({ ...results })
      }
      setConfig({
        isOpen: true,
        hasTitleBar: true,
        component: Component,
        reject: handleReject,
        resolve: handleResolve,
        args,
      })
    }).catch(error => console.error(error))
  }, [])

  return {
    config,
    asyncModal,
  }
}

export default useContentDialog
