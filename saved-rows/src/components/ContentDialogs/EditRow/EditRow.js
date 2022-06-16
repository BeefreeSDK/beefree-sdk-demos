import React from 'react'
import { TextInput } from '../../TextInput'

const EditRow = ({ save, close, args }) => {
  const [text, setText] = React.useState(args?.row?.name)

  const onHandleSave = React.useCallback(() => {
    save({
      success: true,
      newValue: text,
    })
  }, [text, save])

  // const onHandleError = () => {
  //   save({
  //     error: true
  //   })
  // }

  // const onHandleWarning = () => {
  //   save({
  //     warn: true
  //   })
  // }

  const handleOnChange = React.useCallback((event) => {
    setText(event?.target?.value)
  }, [])

  return (
    <>
      <div style={{ width: '100%', display: 'inline-block', position: 'relative', padding: '5px' }}>
        <TextInput value={text} onChange={handleOnChange} />
        <button onClick={onHandleSave}>
          Save
        </button>
      </div>
    </>
  )
}

export default EditRow
