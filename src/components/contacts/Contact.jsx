import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup"; 
import { FaEye, FaRegTrashAlt } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { ContactContext } from "../../context/ContactContext";
import { AuthContext } from "../../context/Auth.Context";

function Contact({ contact }) {
  //   console.log(contact);
const {user} = useContext(AuthContext)
  const context = useContext(ContactContext);
  const { deleteContact } = context;
 
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
  const isOwner = user.id === contact.author?.data?.id 

  const handleDelete = (id) => {
    deleteContact(id);
  };

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
            <ListGroup.Item>
              Date of Birth:
              {dateOfBirth instanceof Object
                ? format(dateOfBirth, "dd/mm/yyyy")
                : dateOfBirth}
            </ListGroup.Item>
          </ListGroup>
          <div className="card-btn mt-3">
            <Card.Link as={Link} to={`/contacts/${id}`}>
              <Button variant="warning ms-3" size="md" type="view">
                <FaEye />
              </Button>
            </Card.Link>
            {isOwner && 
            <Card.Link>
              
              <Button
              variant="danger ms-3"
              size="md"
              onClick={() => handleDelete(id)}
            >
              <FaRegTrashAlt />
            </Button>
            
          </Card.Link>
          }
            
          </div>
        </Card.Body>
      </div>
    </Card>
  );
}

export default Contact;
