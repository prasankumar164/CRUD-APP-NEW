import React, { useEffect } from 'react'

const Alert = ({type,msg,showAlert,list}) => {

  useEffect(() => {
    const getTime = setTimeout(() => {
      showAlert()
    },3000)
    return () => clearTimeout(getTime)
  },[list])
  
  return <p className={`alert alert-${type}`}>{msg}</p>

}

export default Alert
