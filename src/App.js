import React, {useState, useEffect} from 'react'
import NavBar from './components/NavBar'

const App = (props) => {
  const [userLoggedIn, setUserLoggedIn] = useState(false)

  const handleAuth = (props) => {
    setUserLoggedIn(!userLoggedIn)
  } 

  useEffect(() => {
    if(localStorage.getItem('token')) {
      handleAuth()
    }
  }, [])

  return( 
    <NavBar userLoggedIn={userLoggedIn} handleAuth={handleAuth} />
  )
}

export default App;
