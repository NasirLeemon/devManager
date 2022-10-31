import React from 'react'
import { useParams } from 'react-router-dom'
import ContactForm from '../components/contacts/ContactForm';


function EditContact({updateContact, contacts}) {

const {id} = useParams()
console.log(id);

const foundContact = contacts.find((contact)=>(contact.id === id))  

  return (
    <>
    <ContactForm updateContact={updateContact} foundContact={foundContact} />
    </>
  )
}

export default EditContact