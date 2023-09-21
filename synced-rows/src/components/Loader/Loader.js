import React from 'react'
import styles from './Loader.module.scss'

const Loader = ({ isLoading }) => {
  if (!isLoading) return null
  return (
    <div className={styles.loadingOverlay}>
      <div className={styles.loader}></div>
      <p className={styles.loaderText}>Synchronizing rows...</p>
    </div>
  )
}

export default Loader
