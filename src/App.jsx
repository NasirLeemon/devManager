import React from "react";
import { useState } from "react";
import Contacts from "./contacts/Contacts";
import Header from "./contacts/layout/Header";
import { Container } from "react-bootstrap";
import AddContacts from "./contacts/AddContacts";
import { v4 as uuidv4 } from 'uuid';

const initialContacts = [
  {
    id: "1",
    firstName: "Barbette",
    lastName: "Pfertner",
    email: "bpfertner0@drupal.org",
    profession: "Web Developer",
    gender: "female",
    image: "https://randomuser.me/api/portraits/women/75.jpg",
    dateOfBirth: new Date(),
    bio: "All About me",
  },
  {
    id: "2",
    firstName: "Ignatius",
    lastName: "McPhilip",
    email: "imcphilip1@toplist.cz",
    profession: "Software Developer",
    gender: "male",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    dateOfBirth: new Date(),
    bio: "All About me",
  },
  {
    id: "3",
    firstName: "Fletch",
    lastName: "Veel",
    email: "fveel2@yellowbook.com",
    profession: "Graphic Designer",

    gender: "male",
    image: "https://randomuser.me/api/portraits/men/78.jpg",
    dateOfBirth: new Date(),
    bio: "All About me",
  },
  {
    id: "4",
    firstName: "Shawn",
    lastName: "Lawrenz",
    email: "slawrenz3@independent.co.uk",
    profession: "Data entry specialist",
    gender: "female",
    image: "https://randomuser.me/api/portraits/women/80.jpg",
    dateOfBirth: new Date(),
    bio: "All About me",
  },
  {
    id: "5",
    firstName: "Bucky",
    lastName: "Casaccio",
    email: "bcasaccio4@netlog.com",
    gender: "male",
    profession: "Data scientist",
    image: "https://randomuser.me/api/portraits/men/56.jpg",
    dateOfBirth: new Date(),
    bio: "All About me",
  },
  {
    id: "6",
    firstName: "Regan",
    lastName: "Lodford",
    email: "rlodford5@nbcnews.com",
    profession: "python Developer",
    gender: "female",
    image: "https://randomuser.me/api/portraits/women/81.jpg",
    dateOfBirth: new Date(),
    bio: "All About me",
  },
  {
    id: "7",
    firstName: "Hubert",
    lastName: "Langhorne",
    email: "hlanghorne6@thetimes.co.uk",
    gender: "male",
    profession: "CPA Marketer",
    image: "https://randomuser.me/api/portraits/men/80.jpg",
    dateOfBirth: new Date(),
    bio: "All About me",
  },
];

function App() {
  const [contacts, setContacts] = useState(initialContacts);

  const deleteContact = (id) => {
    // console.log(id);
    const updatedContact = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContact);
  };

  const addContact = contact  => {
    // console.log(contact);
const updatedContacts = {
  id: uuidv4(),
  ...contact,
}

    setContacts([updatedContacts, ...contacts])
  };

  return (
    <>
      <Header />
      <Container
        className="text-center mt-3"
        style={{ width: "800px", margin: "0 auto" }}
      >
        <AddContacts addContact={addContact} />
        <Contacts contacts={contacts} deleteContact={deleteContact} />
      </Container>
    </>
  );
}

export default App;
