import { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { axiosPrivateInstance } from "../config/axios";
import { formatContact } from "../utils/formatContact";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "./Auth.Context";


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
  const [loaded, setLoaded] = useState(false);
  const {user} = useContext(AuthContext)
  const { token } = useContext(AuthContext)
  



  const navigate = useNavigate()
  // useEffect(() => {
  //   (async () => {
  //     if (user) {
  //       await loadContacts();
  //     }
  //   })();
  // }, [user]);

  useEffect(()=>{
    if (user) {
      ;(async ()=>{
        await loadContacts()
      })()
    }
  },[user])

  const loadContacts = async () => {
    try {
      const response = await axiosPrivateInstance.get("/contacts?populate=*"); 
      const loadedContact = response?.data?.data?.map((contact) =>
        formatContact(contact)
      );
      // console.log(loadedContact);
      setLoaded(true);
      setContacts(loadedContact);
    } catch (error) {
      console.log('loadContact-',error.response);
      toast.dark(error.response?.data?.error?.message);

    }
  };

  const deleteContact = async (id) => {
    // console.log(id);
    try {
      const response = await axiosPrivateInstance.delete(`/contacts/${id}`)
      const updatedContact = contacts.filter((contact) => contact.id !== id);
      // console.log(updatedContact);
    setContacts(updatedContact);
    toast.dark('Contact Deleted Successfully')
    navigate('/contacts')
    } catch (error) {
      console.log('deleteContact-' , error.response);
      toast.dark(error.response?.data?.error?.message);

    }
    
  };

  const updateContact = async (contactToUpdate, id) => {
try {
  const response = await axiosPrivateInstance.put(`/contacts/${id}`, {
    data : contactToUpdate,
  })

  const contact = formatContact(response.data.data)

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
  // console.log(contactsWithUpdate);
  setContacts(contactsWithUpdate);
  toast.success("Contact Updated Successfully");
  navigate(`/contacts/${contact.id}`)
} catch (error) {
      toast.dark(error.response?.data?.error?.message);
}

  
  };

  const addContact = async (contact) => {

  
    try {
      const response = await axiosPrivateInstance.post("/contacts?populate=*", {
        data: contact,
      });
      console.log(response.data.data);

      const contactFromServer = formatContact(response.data.data)
      setContacts([contactFromServer, ...contacts]);
      toast.success("Contact Added Successfully");
      navigate("/contacts");
    } catch (error) {
      console.log('addContact-',error.response);
      toast.dark(error.response?.data?.error?.message);

    }

    
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
