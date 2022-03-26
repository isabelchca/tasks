import React, {useState, useEffect} from 'react'
// se importa en la ruta protegida
import { auth } from '../firebase' 
import { withRouter } from 'react-router'
import Firestore from './Firestore'

const Admin = (props) => {

    const [user, setUser] = useState(null)  
    useEffect(() => {

        if(auth.currentUser){
            console.log('Existe un usuario')
            setUser(auth.currentUser)
        }
        else{
            console.log('No existe el usuario')
            props.history.push('/login')
        }

    }, [props.history])

    return (
        <div>
            <h1>Rutas protegidas</h1>
            {
                user && (
                    <Firestore user={user}/>
                )
            }
        </div>
    )
}
export default withRouter(Admin)