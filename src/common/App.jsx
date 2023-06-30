import React from 'react'
import Routing from './Routing';
import AuthProvider from '../auth/AuthProvider'


function App() {

  return (
    <>
      <AuthProvider>
        <Routing />
      </AuthProvider>
    </>
  )
}

export default App