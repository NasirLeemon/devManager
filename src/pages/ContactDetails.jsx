import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, ListGroup, Button } from "react-bootstrap";
import { FaEye, FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { format } from "date-fns";
import { useNavigate, Link } from "react-router-dom";
import { ContactContext } from "../context/ContactContext";
import { AuthContext } from "../context/Auth.Context";

function ContactDetails() {
  const context = useContext(ContactContext);
  const { contacts, deleteContact } = context;
  const { user } = useContext(AuthContext);

  const [contact, setContact] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const foundContact = contacts.find((contact) => contact.id === +id);

  const isOwner = user.id === foundContact.author.data.id;

  useEffect(() => {
    if (id && foundContact) {
      setContact(foundContact);
    }
  }, [id]);

  const {
    firstName,
    lastName,
    email,
    image,
    profession,
    bio,
    gender,
    dateOfBirth,
  } = contact;

  const handleDelete = (id) => {
    deleteContact(+id);
  };

  return (
    <>
      <div>Contact Details</div>
      {Object.keys(contact).length === 0 ? (
        <p>No Contact to Show</p>
      ) : (
        <div>
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
                  {isOwner && (
                    <>
                      <Card.Link as={Link} to={`/edit-contact/${id}`}>
                        <Button variant="warning ms-3" size="md" type="view">
                          <FaPencilAlt />
                        </Button>
                      </Card.Link>

                      <Card.Link>
                        <Button
                          variant="danger ms-3"
                          size="md"
                          onClick={() => handleDelete(id)}
                        >
                          <FaRegTrashAlt />
                        </Button>
                      </Card.Link>
                    </>
                  )}
                </div>
              </Card.Body>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}

export default ContactDetails;
