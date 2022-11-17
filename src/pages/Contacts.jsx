import React, { useContext } from 'react'
import Contact from '../components/contacts/Contact'
import Loader from '../components/Loader'
import { ContactContext } from '../context/ContactContext'

function Contacts() {

  const context = useContext(ContactContext)
  const {contacts, loaded} = context
  return (
    <div>
        <h2 className='mt-2 text-center' >All Contacts</h2>
        {loaded ? (contacts.map((contact, id) => (<Contact  key={id} contact={contact} />))) : (<Loader />)}
    </div>
  )
}

export default Contacts