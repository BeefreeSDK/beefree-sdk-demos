import React from 'react'
import Modal from 'react-modal'
import styles from './GenericModal.module.scss'


const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(255, 111, 97, .25)',
    fontWeight: '600',
    textTransform: 'none',
    color: 'white',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    height: 'auto',
    background: '#FFF',
    border: '0px',
    color: '#000',
    fontSize: '16px',
    padding: '10px',
    display: 'relative',
    width: '600px',
  }
}

const GenericModal = (props) => {
  const {
    isOpen,
    hasTitleBar,
    onClose,
    content,
    isRounded,
    children,
  } = props

  const onHandleClose = () => {
    onClose()
  }

  const Widget = () => content

  return (
    <Modal
      isOpen={isOpen}
      appElement={document.querySelector('body')}
      className={`${styles.modalWindow
        } ${isRounded ? styles.rounded : styles.square
        }`}
      style={{
        ...modalStyles,
        content: {
          ...modalStyles.content
        }
      }}
    >
      <div
        className={styles.wrapper}
        style={modalStyles.wrapper}
      >
        {hasTitleBar && (
          <div className={styles.titleBar}>
            <button className={styles.close} onClick={onHandleClose}>
              X
            </button>
          </div>
        )}
        <div
          className={styles.content}
          style={modalStyles.content}
        >
          {children}
          <Widget {...props} />
        </div>
      </div>
    </Modal>
  )
}

export default GenericModal
