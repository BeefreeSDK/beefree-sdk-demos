import React from 'react'

const TextInput = ({
  onChange,
  value = '',
  placeholder = ''
}) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
  />
)

export default TextInput
