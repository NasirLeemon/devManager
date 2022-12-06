import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { axiosPrivateInstance, axiosPublicInstance } from "../config/axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { formatContact } from "../utils/formatContact";
import qs from 'qs'

export const AuthContext = createContext();

const loadedUser = JSON.parse(localStorage.getItem("user"));
const loadedToken = JSON.parse(localStorage.getItem("token"));

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(loadedUser ? loadedUser : null);
  const [token, setToken] = useState(loadedToken ? loadedToken : null);
  const [profileId, setProfileId] = useState(null)
  const [userContacts, setuserContacts] = useState(null);
  const [userContactList, setuserContactList] = useState(null);

  const [loaded, setLoaded] = useState(false);
  const [triggerDelete, setTriggerDelete] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (user) {
      ;(async () => {
        await loadUserContacts();
      })();
    }
  }, [user, triggerDelete]);

  //   useEffect(() => {
  //   if (user) {
  //     (async () => {
  //       await loadUserContactList();
  //     })();
  //   }
  // },[user,triggerDelete]);







  const loadUserContacts = async () => {
    const query = qs.stringify(
      {
        populate: ['profile', 'profile.profilePicture', 'contacts'],
      },
      {
        encodeValuesOnly: true,
      }
    )
    try {
      const response = await axiosPrivateInstance.get(`/users/me?${query}`);
      console.log(response.data);
      const loadedContact = response.data.data.map((contact) =>
        formatContact(contact)
      );
      console.log(loadedContact);
      setLoaded(true);
      setProfileId(response.data.profile.id)
    //   console.log(response.data.);
      setuserContacts(response.data.contacts);
      const loadedUserContactList = response.data.contacts
      setuserContactList(loadedUserContactList)

      
    } catch (error) {
      console.log(error.response);
      setLoaded(true);
    }
  };



  // const loadUserContactList = async () => {
    
  
  //   try {
  //     const response = await axiosPrivateInstance.get(`/users/me?populate=*`);
  //     console.log(response.data);
  //     const loadedUserContactList = response.data.contacts
  //     setuserContactList(loadedUserContactList)

  //     setProfileId(response.data.profile.id)
  //     // console.log(profileId);
  //     // console.log(loadedUserContactList);
  //     console.log(response.data.contacts);
  //   } catch (err) {
  //     console.log(err.response);
  //   }
  // };

  const registerUser = async (data) => {
    console.log(data);
    try {
      const response = await axiosPublicInstance.post(
        "/auth/local/register",
        data
      );
      console.log(response.data);

      const { user, jwt } = response.data;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(jwt));
      setUser(user);
      setToken(jwt);
      toast.success("Register Successfull. Redirecting...");
      navigate("/contacts");
    } catch (error) {
      toast.error(error.response?.data?.error?.message);
    }
  };

  const logIn = async (data) => {
    try {
      const response = await axiosPublicInstance.post("/auth/local/", data);
    //   console.log(response.data);

      const { user, jwt } = response.data;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(jwt));
      setUser(user);
      setToken(jwt);
      toast.success("Login Successfull. Redirecting...");
      navigate(location?.state?.from ? location?.state?.from : "/contacts");
    } catch (error) {
      toast.error(error.response?.data?.error?.message);
    }
  };

  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    toast.success("Logout successful rdirecting...");
    navigate("/logIn");
  };

  const value = {
    userContactList,
    setTriggerDelete,
    userContacts,
    loaded,
    registerUser,
    logIn,
    logOut,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
