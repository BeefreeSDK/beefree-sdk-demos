import React from 'react'
import { GenericModal } from '../GenericModal'

const DemoModal = ({ modals }) => (
  <>
    {
      modals
        ? modals.map(modal => <GenericModal key={modal.key} {...modal} onClose={() => modal.close()} />)
        : null
    }
  </>
)

export default DemoModal
