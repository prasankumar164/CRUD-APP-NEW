import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'
import { FaDAndD } from 'react-icons/fa'

const getLocalStorage = () => {
  let list = localStorage.getItem('list')
  if(list) {
    return JSON.parse(localStorage.getItem('list'))
  } else {
    return []
  }
}

function App() {
    const [name,setName] = useState('')
    const [list,setList] = useState(getLocalStorage())
    const [isEditing,setIsEditing] = useState(false)
    const [editId,setIsEditId] = useState(null)
    const [alert,setAlert] = useState({show:false, msg:'', type:''})

    const handleSubmit = (e) => {
      e.preventDefault()
      if(!name) {
        // alert 
        showAlert(true, 'please enter value', 'danger')
      } else 
      if(name && isEditing){
        // dealing with edit 
        setList(
          list.map((item) => {
            if(item.id === editId) {
              return {...item, title:name}
            }
            return item;
          })
        )
        setName('')
        setIsEditing(false)
        setIsEditId(null)
        showAlert(true, 'item edited', 'success')
      } else {
        const newItem = {id: new Date().getTime().toString(), title:name}
        setList([...list, newItem])
        setName([])
      
      }
    }

    // alert 
    const showAlert = (show=false, msg='', type='') => {
      setAlert({show,msg,type})
    }

    // delete 
    const deleteBtn = (id) => {
      showAlert(true, 'you can edit now', 'success')
      const newBtn = list.filter((item) => item.id !== id)
      return setList(newBtn)
    }

    // edit 
    const editBtn = (id) => {
      showAlert(true, 'item edited', 'success')
      const editNewBtn = list.find((item) => item.id === id)
      setIsEditing(true)
      setIsEditId(id)
      setName(editNewBtn.title)
    }

    // clear 
    const clearBtn = () => {
      showAlert(true, 'items cleared', 'success')
      setList([])
    }


// local storage 
    useEffect(() => {
         localStorage.setItem('list', JSON.stringify(list))
    }, [list])



  return (
  <section className="section-center">
    <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} showAlert={showAlert} list={list}/>}
        <h3>Make Notes</h3>
        <div className="form-control">
          <input 
          type="text"
          className="grocery"
          placeholder="ex.timetable"
          value={name}
          onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? 'Edit' : 'Submit'}
          </button>
        </div>
    </form>
  
  {list.length > 0 && (
    <div className="grocery-container">
       <List items={list} deleteBtn={deleteBtn} editBtn={editBtn} />
       <button className="clear-btn" onClick={clearBtn}>clear all</button>
     </div>
  )}
    
  </section>
  )
}

export default App
