import { useState, useEffect, useRef } from 'react'
import hackister from '../assets/templates/hackister'

export const key = 'mockBackend'
const apiUrl = `${process.env.REACT_APP_API_URL}`
const apiKey = `${process.env.REACT_APP_API_KEY}`

const postData = async (url = '', guid = '', source = {}, value = {}) => {
  try {
    const query = {
      replace: [
        {
          path: `$..rows[?(@.metadata.guid=='${guid}')]`,
          value: {
            ...value,
            uuid: '', // remove uuid to avoid duplicates when multiple matches
          }
        }
      ],
      source,
    }
    const response = await fetch(`${url}/v1/message/merge`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify(query)
    })

    // Check if the response is okay (status code in the range 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error.message)
    throw error  // re-throwing the error to handle it outside if needed
  }
}

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

  const csapiMerge = async (templateToMerge, rowToAppend) => {
    try {
      const guid = rowToAppend?.metadata?.guid
      const data = await postData(apiUrl, guid, templateToMerge, rowToAppend)
      return data?.json ?? templateToMerge
    } catch (error) {
      console.error('Error:', error)
      return templateToMerge
    }
  }

  const getRowTemplate = (row) => {
    const rowTemplate = JSON.parse(JSON.stringify(template))
    rowTemplate.page.rows = [row]
    return rowTemplate
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
    csapiMerge,
    getRowTemplate,
  }
}

export default useBackend
