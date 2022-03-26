
import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './components/Login';
import NavBar from './components/NavBar';
import Admin from './components/Admin';
import Reset from './components/Reset'
import { auth } from './firebase';

function App() {

  const [firebaseUser,setfirebaseUser] = React.useState(false)

  React.useEffect(() => {
    auth.onAuthStateChanged(user => {
      console.log(user)
      if(user){
        setfirebaseUser(user)
      }else{
        setfirebaseUser(null)
      }
    })
  }, [])

  return firebaseUser !== false ? (

    <Router>
    <div className="container">
      <NavBar firebaseUser={firebaseUser}/>
      <Switch>
        <Route path="/" exact>
            Ruta de Inicio
        </Route>
        <Route path="/admin">
            <Admin />
        </Route>
        <Route path="/login">
            <Login />
        </Route>
        <Route path="/Reset">
            <Reset />
        </Route>
      </Switch>     
    </div>
    </Router>
    
  ) : (
    <p>Cargando...</p>
  )
}

export default App;
