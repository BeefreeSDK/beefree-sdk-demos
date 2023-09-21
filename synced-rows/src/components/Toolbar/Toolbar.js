import React from 'react'
import { key } from '../../hooks/useBackend'
import styles from './Toolbar.module.scss'

const Toolbar = () => {
  const handleClearStorage = () => {
    localStorage.setItem(key, '')
    window.location.reload()
  }
  return (
    <button className={styles.resetButton} onClick={handleClearStorage}>
      &#9842;
    </button>
  )
}

export default Toolbar
