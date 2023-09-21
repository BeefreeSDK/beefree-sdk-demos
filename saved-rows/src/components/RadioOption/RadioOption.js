import React from 'react'

const RadioOption = ({
  onChange,
  value = '',
  placeholder = '',
  name = '',
  checked = false,
  label = '',
  description = '',
}) => (
  <div style={{ marginBottom: '1rem', textAlign: 'left' }} >
    <input
      type="radio"
      id={value}
      value={value}
      name={name}
      onChange={onChange}
      checked={checked}
      style={{ width: 'auto' }}
    />
    <label htmlFor={value} style={{ marginLeft: '0.5rem' }}>
      {label}
    </label>
    <p style={{ marginLeft: '2rem', fontSize: '0.9rem', color: '#888' }}>
      {description}
    </p>
  </div>
)

export default RadioOption
