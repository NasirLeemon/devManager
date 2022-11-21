import React from 'react'
import { useContext } from 'react'
import { Table, Button,} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/Auth.Context'
import { ContactContext } from '../context/ContactContext';




function UserContactList() {

const {userContacts, loaded, setTriggerDelete} = useContext(AuthContext)
// console.log(userContacts);

const {deleteContact} = useContext(ContactContext)


const handleDelete = (id) => {
  deleteContact(id)
  setTriggerDelete(true)
}

// userContacts.map((contact)=>(<p>{contact.firstName}</p>))

  return loaded && (
<Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Profession</th>
          <th>Delete</th>
          <th>Edit</th>

        </tr>
      </thead>
      <tbody>
        {userContacts.map((userContact)=>{
          return (
            <tr key={userContact.id}>
            <td>{userContact.id}</td>
            <td>{`${userContact.firstName} ${userContact.lastName}`}</td>
            <td>{userContact.email}</td>
            <td>{userContact.profession}</td>
          <td>
              <Button variant='danger' onClick={() => handleDelete(userContact.id)}> Delete </Button>
          </td>
            <td>
              <Button variant='primary' as={Link} to={`/edit-contact/${userContact.id}`} > Edit</Button>
            </td>
          </tr>
        )
        })}
      
      </tbody>
    </Table>
)    


}

export default UserContactList