import React from 'react'
import ContactForm from '../components/contacts/ContactForm'

function AddContact({addContact}) {
  return (<>
    <div>Add Contact</div>
    <ContactForm  addContact={addContact} />
  </>
  )
}

export default AddContact