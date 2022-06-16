import React from 'react'
import './App.css';

import BeePlugin from '@mailupinc/bee-plugin'
import hackister from './templates/hackister'

// Simulate database API
import useMockAPI from './hooks/useMockAPI'

// User input controls
import { EditRow } from './components/ContentDialogs'

// Generic modal component with event hooks
import useModals from './hooks/useModals'
import { DemoModal } from './components/DemoModal'

function App() {
  const { modals, openModal } = useModals()
  const { setRow, getRows, handleDeleteRow, handleEditRow } = useMockAPI()

  const clientId = `${process.env.REACT_APP_CLIENT_ID}`
  const clientSecret = `${process.env.REACT_APP_SECRET_KEY}`

  const beeConfig = {
    uid: 'bee-saved-rows-demo-uid',
    container: 'bee-plugin-container',
    saveRows: true,
    onSaveRow: async (jsonFile, htmlFile) => {
      await setRow(jsonFile)
    },
    rowsConfiguration: {
      emptyRows: true,
      defaultRows: false,
      externalContentURLs: [{
        name: "Saved Rows",
        value: "saved-rows",
        handle: 'saved-rows',
        isLocal: true,
        behaviors: {
          canEdit: true,
          canDelete: true,
        },
      }]
    },
    hooks: {
      getRows: {
        handler: async (resolve, reject, args) => {
          const rows = await getRows(args.handle)
          resolve(rows)
        }
      }
    },
    contentDialog: {
      saveRow: {
        handler: async (resolve, reject, args) => {
          const results = await openModal(EditRow, args)
          if (results?.newValue) {
            resolve({ name: results?.newValue })
          } else {
            reject('')
          }
        }
      },
      onDeleteRow: {
        handler: async (resolve, reject, args) => {
          await handleDeleteRow(args)
          resolve(true)
        }
      },
      onEditRow: {
        handler: async (resolve, reject, args) => {
          const results = await openModal(EditRow, args)
          if (results?.newValue) {
            await handleEditRow(args, results?.newValue)
            resolve(true)
          } else {
            reject('')
          }
        }
      }
    },
  }

  React.useEffect(() => {
    const bee = new BeePlugin()
    bee.getToken(clientId, clientSecret)
      .then(() => bee.start(beeConfig, hackister))
  }, [clientId, clientSecret]) // eslint-disable-line

  return (
    <div className="App">
      <div id="bee-plugin-container" />
      <DemoModal modals={modals} />
    </div>
  )
}

export default App
