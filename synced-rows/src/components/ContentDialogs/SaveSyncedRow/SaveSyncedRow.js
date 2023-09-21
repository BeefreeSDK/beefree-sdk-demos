import React from 'react'
import { TextInput, RadioOption } from '../..'

const SaveRow = ({ resolve, args }) => {
  const [name, setName] = React.useState(args?.metadata?.name)
  const [syncOption, setSyncOption] = React.useState(() => {
    return (args?.synced === true) ? 'synced' : 'standard'
  })

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
      synced: syncOption === "synced"
    })
  }

  const handleOnChange = event => setName(event?.target?.value)

  const handleOnChangeRadio = (event) => setSyncOption(event.target.value)

  return (
    <div style={cssStyles}>
      <TextInput value={name} onChange={handleOnChange} placeholder="Type row name" />
      <RadioOption
        value="standard"
        name="syncedRow"
        label="Standard"
        description="Content that you can use again and doesn't need to be synced. When you edit it, changes don't affect other designs using the same content."
        checked={syncOption === "standard"}
        onChange={handleOnChangeRadio}
      />
      <RadioOption
        value="synced"
        name="syncedRow"
        label="Synced"
        description="Content that you can use again and needs to be synced. When you edit it, changes propagate to other designs that use the same content."
        checked={syncOption === "synced"}
        onChange={handleOnChangeRadio}
      />
      <button onClick={handleSave}>
        Save
      </button>
    </div>
  )
}

export default SaveRow
