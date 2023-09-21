import React from 'react'
import { TextInput } from '../..'

const SaveRow = ({ resolve, args }) => {
  const [name, setName] = React.useState(args?.metadata?.name)

  const cssStyles = {
    width: '100%',
    display: 'inline-block',
    position: 'relative',
    padding: '5px',
    textAlign: 'left',
  }

  const handleSave = () => {
    resolve({
      name,
    })
  }

  const handleOnChange = event => setName(event?.target?.value)

  return (
    <div style={cssStyles}>
      <TextInput value={name} onChange={handleOnChange} placeholder="Type row name" />

      <button onClick={handleSave}>
        Save
      </button>
    </div>
  )
}

export default SaveRow
