import React from 'react'

const TextInput = ({ onChange, value = '' }) => (
  <>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Row name"
    />
  </>
)

export default TextInput
