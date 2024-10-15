import { useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import BeefreeSDK from '@beefree.io/sdk'

const clientId = import.meta.env.VITE_CLIENT_ID
const clientSecret = import.meta.env.VITE_CLIENT_SECRET

const App = () => {
  const configuration = {
    uid: 'my-user-folder',
    container: 'sdk-container',
  }

  const initializeBeeFreeSDK = async () => {
    const sdk = new BeefreeSDK()
    await sdk.getToken(clientId, clientSecret)
    sdk.start(configuration, {})
  }

  useEffect(() => {
    initializeBeeFreeSDK()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Beefree SDK + React</h1>
      </header>
      <div className="sdk-container" id="sdk-container">
        {/* SDK will be injected here */}
      </div>
    </div>
  )
}

export default App
