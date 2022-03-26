import React, {useState} from 'react'
import { auth, db } from '../firebase'
import { withRouter } from 'react-router-dom'

const Login = (props) => {

    const [email, setEmail] = useState('prueba@prueba.com')
    const [pass, setPass] = useState ('123123')
    const [error, setError] = useState (null)
    const [esRegistro, setEsRegistro] = useState (false)

    const procesarDatos = e => {
        e.preventDefault()
        if(!email.trim())
        {
            // console.log('Ingrese su email')
            setError('Ingrese su email')
            return
        }
        if(!pass.trim())
        {
            // console.log('Ingrese su password')
            setError('Ingrese su passsword')
            return
        }
        if(pass.length < 6)
        {
            // console.log('contraseña mayor a 6 caracteres')
            setError('Ingrese una contraseña con más de 6 caracteres')
            return
        }
        
        console.log('pasaron todas las validaciones!')
        setError(null)

        if(esRegistro)
        {
            registrar()
        }
        else
        {
            loginUser()
        }
    }

    const loginUser = React.useCallback(async () => {

        try {            
            const res = await auth.signInWithEmailAndPassword(email, pass)
            console.log(res.user)
            props.history.push('/admin')
        } catch (error) {            
            console.log(error)
                      
        }
    }, [email,pass,props.history])

    const registrar = React.useCallback(async () => {
            
        try {
         const res =  await auth.createUserWithEmailAndPassword(email,pass)
         console.log(res.user)
         await db.collection('usuarios').doc(res.user.email).set({
             email: res.user.email,
             uid: res.user.uid
         })
          await db.collection(res.user.uid).add({
              name:'Tarea de Ejemplo',
              fecha:  Date.now()
          })
            setEmail('')
            setPass('')
            setError(null)
            props.history.push('/admin')
        
        } catch (error) {
            console.log(error)
            if(error.code === 'auth/invalid-email')
            {
                setError('Email no Válido')
            }
            if(error.code === 'auth/email-already-in-use')
            {
                setError('El Email ya esta registrado')
            }            
        }
    }, [email,pass,props.history])

    return(
        <div className="mt-5">
            <h3 className="text-center">
                {
                    esRegistro ? 'Registro' : 'Login'
                }
            </h3>
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
                        <input 
                            type="password"
                            className="form-control mb-2"
                            placeholder="Ingrese su contraseña"
                            onChange={e => setPass(e.target.value)}
                            value={pass}
                        />
                        <div className="d-grid gap-2">
                            <button className="btn btn-dark btn-lg btn-block" type="submit">
                                {
                                    esRegistro ? 'Registrarse' : 'Acceder'
                                }
                            </button> 
                            <button className="btn btn-info btn-sm btn-block"
                                    type="button"
                                    onClick={() => setEsRegistro(!esRegistro)}
                            >
                            {
                                esRegistro ? '¿Ya estas registrado?' : '¿No tienes cuenta?'
                            }
                            </button>     
                            {
                                !esRegistro ?
                                (
                                    <button className="btn btn-danger btn-lg btn-sm" 
                                            type="button"
                                            onClick={() => props.history.push('/reset')}>                                    
                                    Recuperar contraseña                               
                                    </button> 
                                ) : null
                            }                                      
                        </div>                                            
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Login)