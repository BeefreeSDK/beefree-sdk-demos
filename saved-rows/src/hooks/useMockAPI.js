import React, { useState } from 'react'

const useMockAPI = () => {
  const [rows, setRows] = useState([])

  const ref = React.useRef()
  React.useEffect(() => {
    ref.current = rows
  }, [rows])

  const handleDeleteRow = async (args) => setRows(prevRows => [...prevRows.filter(row => (row?.metadata?.name === args?.row?.metadata?.name) ? false : true)])

  const handleEditRow = async (args, newValue) => setRows(prevRows => {
    const newRows = prevRows.map(
      row => (row.metadata.name === args.row.metadata.name
        ? {
          ...row,
          metadata: {
            ...row.metadata,
            name: `${newValue}`,
          }
        }
        : row)
    )
    return [...newRows]
  })

  const setRow = async (row) => setRows(prevRows => [...prevRows, JSON.parse(row)])

  const getRows = async handle => ref.current

  return {
    handleDeleteRow,
    handleEditRow,
    getRows,
    setRow,
  }
}

export default useMockAPI
