import React from 'react'
import * as ReactModal from 'react-modal'
import styles from './Modal.module.scss'

const Modal = ({ config }) => {
  const {
    isOpen = false,
    hasTitleBar,
    component,
  } = config

  const overlayStyle = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  }

  return (
    <ReactModal
      isOpen={isOpen}
      appElement={document.querySelector('body')}
      className={`${styles.modalWindow}`}
      style={overlayStyle}
    >
      <div className={styles.wrapper}>
        {hasTitleBar && (
          <div className={styles.titleBar}>
            <button className={styles.close} onClick={config.reject}>
              X
            </button>
          </div>
        )}
        <div className={styles.content}>
          {component && component(config)}
        </div>
      </div>
    </ReactModal>
  )
}

export default Modal
