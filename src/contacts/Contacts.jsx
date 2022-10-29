import React from 'react'
import Contact from './Contact'

function Contacts({contacts, deleteContact}) {
  return (
    <div>
        <h2 className='mt-2 text-center' >All Contacts</h2>
        {contacts.map((contact, id) => (<Contact  key={id} contact={contact} deleteContact={deleteContact}  />))}
    </div>
  )
}

export default Contacts