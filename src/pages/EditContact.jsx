import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import ContactForm from '../components/contacts/ContactForm';
import { ContactContext } from '../context/ContactContext';


function EditContact() {

  const context = useContext(ContactContext)
  const {contacts} = context

const {id} = useParams()
console.log(id);

const foundContact = contacts.find((contact)=>(contact.id === id))  

  return (
    <>
    <ContactForm foundContact={foundContact} />
    </>
  )
}

export default EditContact