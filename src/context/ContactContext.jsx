import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { axiosPrivateInstance} from "../config/axios";
import {formatContact} from '../utils/formatContact'

export const ContactContext = createContext();

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



export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState(initialContacts);
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    (async () => {
      await loadContacts();
    })();
  }, []);

  const loadContacts = async () => {
    try {
      const response = await axiosPrivateInstance.get("/contacts");
      const loadedContact = response.data.data.map(contact => formatContact(contact))
      console.log(loadedContact);
      setLoaded(true)
      setContacts(loadedContact)
    } catch (error) {
      console.log(error.response);
    }
  };

 

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

  const value = {
    loaded,
    contacts,
    deleteContact,
    updateContact,
    addContact,
  };

  return (
    <ContactContext.Provider value={value}>{children}</ContactContext.Provider>
  );
};
