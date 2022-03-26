import React, { useState } from 'react'
import {auth} from '../firebase'
import { withRouter } from 'react-router'

const Reset = (props) => {

    const [email, setEmail] = useState('')
    const [error, setError] = useState('')

    const procesarDatos = e => {
        e.preventDefault()
        if(!email.trim()){
            console.log('Datos vacios Email')
            setError('Datos vacios Email')
            return
        }
        setError(null)
        recuperar()
    }

    const recuperar = React.useCallback(async () => {
        try {
            await auth.sendPasswordResetEmail()
            console.log('correo enviado')
            props.history.push('/login')

        } catch (error) {
          console.log(error)
          setError(error.message)  
        }
    }, [email,props.history])

    return (
        <div className="mt-5">
           <h3 className="text-center"> Recuperar Contraseña </h3>
            <hr/>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={procesarDatos}>
                        {
                            error && (
                                <div className="alert alert-danger">{error}</div>
                            )
                        }
                        <input 
                            type="email"
                            className="form-control mb-2"
                            placeholder="Ingrese su email"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                        />
                        
                        <div className="d-grid gap-2">
                            <button className="btn btn-dark btn-lg btn-block" type="submit">
                               Recuperar
                            </button>                                        
                        </div>                                            
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Reset)
