import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
// import {AiFillEye}  from 'react-icons'
import { FaEye, FaRegTrashAlt } from "react-icons/fa";
import { Button } from "react-bootstrap";
import {format} from 'date-fns'
import { toast } from 'react-toastify'
import {Link} from 'react-router-dom'

function Contact({ contact, deleteContact }) {
//   console.log(contact);

  const {
    id,
    firstName,
    lastName,
    profession,
    dateOfBirth,
    image,
    bio,
    gender,
    email,
  } = contact;

  const handleDelete = (id) =>{
    console.log(id);
    deleteContact(id)
    toast.dark('Contact Deleted Successfully')
    
  }

 

  return (
    <Card className="mb-3">
      <div className="d-flex">
        <Card.Img className="card-image" src={image} />
        <Card.Body>
          <Card.Title>
            <span className="text-dark">
              {firstName} {lastName}
            </span>
          </Card.Title>
          <Card.Subtitle className="mb-3 text-muted">
            {profession}
          </Card.Subtitle>
          <Card.Text>{bio}</Card.Text>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Gender: {gender}</ListGroup.Item>
            <ListGroup.Item> Email: {email}</ListGroup.Item>
            <ListGroup.Item>Date of Birth:{dateOfBirth instanceof Object ? format(dateOfBirth, 'dd/mm/yyyy') : dateOfBirth}</ListGroup.Item>
          </ListGroup>
          <div className="card-btn mt-3">
            <Card.Link as={Link} to={`/contacts/${id}`}>
              <Button variant="warning ms-3" size="md" type="view" >
                <FaEye />
              </Button>
            </Card.Link>
            <Card.Link>
              <Button variant="danger ms-3" size="md" onClick={() => handleDelete(id)}>
                <FaRegTrashAlt />
              </Button>
            </Card.Link>
          </div>
        </Card.Body>
      </div>
    </Card>
  );
}

export default Contact;
