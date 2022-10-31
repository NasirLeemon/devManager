import React from "react";
import { useState } from "react";
import Contacts from "./pages/Contacts";
import Header from "./layout/Header";
import { Container } from "react-bootstrap";
import ContactForm from "./components/contacts/ContactForm";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import Home from "./pages/Home";
import EditContact from "./pages/EditContact";
import AddContact from "./pages/AddContact";
import ContactDetails from "./pages/ContactDetails";

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

  const updateContact = (contactToUpdate, id) => {
    const contactsWithUpdate = contacts.map((contact) => {
      if (contact.id === id) {
        return {
          id,
          ...contactToUpdate,
        };
      } else {
        return contact;
      }
    });

    setContacts(contactsWithUpdate);
  };

  const addContact = (contact) => {
    // console.log(contact);
    const updatedContacts = {
      id: uuidv4(),
      ...contact,
    };

    setContacts([updatedContacts, ...contacts]);
  };

  return (
    <>
      <BrowserRouter>
        <Header />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Container
          className="text-center mt-3"
          style={{ width: "800px", margin: "0 auto" }}
        >
          <Routes>
            <Route path="/home" index element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<LogIn />} />

            <Route
              path="/add-contact"
              element={<AddContact addContact={addContact} />}
            />
            <Route
              path="/contacts"
              element={
                <Contacts contacts={contacts} deleteContact={deleteContact} />
              }
            />
            <Route
              path="/edit-contact/:id"
              element={
                <EditContact
                  updateContact={updateContact}
                  contacts={contacts}
                />
              }
            />
             <Route
              path="/contacts/:id"
              element={
                <ContactDetails
                  contacts={contacts}
                  deleteContact={deleteContact}
                />
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
