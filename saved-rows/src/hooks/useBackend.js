import { useState, useEffect, useRef } from 'react'
import hackister from '../assets/templates/hackister'

export const key = 'mockBackend'

const useBackend = () => {
  const defaultTemplate = JSON.parse(JSON.stringify(hackister))
  const ref = useRef()

  const [rows, setRows] = useState(() => {
    const savedData = localStorage.getItem(key)
    return savedData ? JSON.parse(savedData).rows : []
  })

  const [template, setTemplate] = useState(() => {
    const savedData = localStorage.getItem(key)
    return savedData?.length ? JSON.parse(savedData).template : defaultTemplate
  })

  useEffect(() => {
    const data = localStorage.getItem(key)
    if (data) {
      ref.current = JSON.parse(data)
    }
  }, [])

  useEffect(() => {
    ref.current = { template, rows }
    localStorage.setItem(key, JSON.stringify(ref.current))
  }, [rows, template])

  const handleDeleteRow = async args => {
    setRows(prevRows => prevRows.filter(row => row?.metadata?.name !== args?.metadata?.name))
  }

  const handleEditRow = async (args, newValue) => {
    setRows(prevRows => prevRows.map(row =>
      row.metadata.name === args.metadata.name
        ? { ...row, metadata: { ...row.metadata, name: newValue } }
        : row
    ))
  }

  const saveRow = async rowToSave => {
    setRows(prevRows => {
      const index = prevRows.findIndex(row => row.metadata.name === rowToSave.metadata.name)
      if (index !== -1) {
        prevRows[index] = rowToSave
        return [...prevRows]
      } else {
        return [...prevRows, rowToSave]
      }
    })
  }

  const saveTemplate = async newTemplate => {
    return setTemplate(JSON.parse(JSON.stringify(newTemplate)))
  }

  return {
    ref,
    handleDeleteRow,
    handleEditRow,
    getRows: async () => ref.current?.rows,
    saveRow,
    getTemplate: async () => ref.current?.template,
    saveTemplate,
    template,
  }
}

export default useBackend
