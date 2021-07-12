import './App.css'
import { useState, useEffect } from 'react'
import * as Realm from 'realm-web'
import googleOneTap from 'google-one-tap'

function App() {
  const [user, setUser] = useState({})

  useEffect(() => {
    const app = new Realm.App('scholarmode-vywip')
    const client_id =
      '708218095522-gff3mq6qgg9qavheh29itura6v5bgjqv.apps.googleusercontent.com'
    // Open the Google One Tap menu
    googleOneTap({ client_id }, (response) => {
      // Upon successful Google authentication, log in to Realm with the user's credential
      const credentials = Realm.Credentials.google(response.credential)
      app.logIn(credentials).then((user) => {
        setUser(user)
        console.log({ user })
      })
    })
  }, [])

  return (
    <div className="App">
      <h1>Hello {user.id}</h1>
    </div>
  )
}

export default App
