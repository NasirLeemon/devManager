import React, { useContext } from 'react'
import { AuthContext } from '../context/Auth.Context'
import {Navigate} from 'react-router-dom'
import { useLocation } from 'react-router-dom'

function PrivateRoute({children}) {
const location = useLocation()
// console.log(location);
    const context = useContext(AuthContext)
    const {user} = context

    const loadedComp = user? children : <Navigate to='/login' state={{from : location}} />


  return (
    <div>{loadedComp}</div>
  )
}

export default PrivateRoute