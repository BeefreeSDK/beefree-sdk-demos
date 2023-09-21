/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { ReactComponent as IconEdit } from '../../../assets/icons/iconEdit.svg'
import { ReactComponent as IconUnsync } from '../../../assets/icons/iconUnsync.svg'
import styles from './EditSyncedRow.module.scss'

const EditSyncedRow = ({ resolve, args }) => {
  const [syncOption, setSyncOption] = useState(null)

  useEffect(() => {
    if (!syncOption) return
    handleSave()
  }, [syncOption])

  const handleSave = () => {
    resolve({
      synced: syncOption === "synced"
    })
  }

  const handleEditClick = () => {
    setSyncOption('synced')
  }

  const handleUnsyncClick = () => {
    setSyncOption('standard')
  }

  return (
    <div className={styles.container}>
      <div>
        <div onClick={handleEditClick} role="button" className={styles.buttonContainer}>
          <div className={styles.icon}>
            <IconEdit />
          </div>
          <div className={styles.textContent}>
            <span className="title">Edit and update everywhere</span>
            <p>Edit this synced row, and changes will be applied here and to all other designs that use it.</p>
          </div>
        </div>
        <div onClick={handleUnsyncClick} role="button" className={styles.buttonContainer}>
          <div className={styles.icon}>
            <IconUnsync />
          </div>
          <div className={styles.textContent}>
            <span className="title">Unsync this row</span>
            <p>Turn this synced row into a standard row. When you edit it, changes will affect only this design.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditSyncedRow
