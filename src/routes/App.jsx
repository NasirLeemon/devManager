import React from "react";
import Contacts from "../pages/Contacts";
import Header from "../layout/Header";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "../pages/NotFound";
import LogIn from "../pages/LogIn";
import Register from "../pages/Register";
import Home from "../pages/Home";
import EditContact from "../pages/EditContact";
import AddContact from "../pages/AddContact";
import ContactDetails from "../pages/ContactDetails";
import DashBoard from "../pages/DashBoard";
import PrivateRoute from "./PrivateRoute";
import Profile from "../pages/Profile";
import ManagePassword from "../pages/ManagePassword";
import UserContactList from "../pages/UserContactList";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

function App() {
  return (
    <>
      <Header />
      <ToastContainer
        position="top-right"
        autoClose={1000}
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
          <Route
            index
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/add-contact" element={
          <PrivateRoute>
            <AddContact />
            </PrivateRoute>
            } />
          <Route path="/contacts" element={
          <PrivateRoute>
            <Contacts />
            </PrivateRoute>
            } />
          <Route path="/edit-contact/:id" element={
          <PrivateRoute>
            <EditContact />
            </PrivateRoute>
            } />
          <Route path="/contacts/:id" element={
          <PrivateRoute>
            <ContactDetails />
            </PrivateRoute>
            } />
          <Route path="/dashboard" element={
          <PrivateRoute>
            <DashBoard />
            </PrivateRoute>
            }>
            <Route index element={<Profile />} />              
            <Route path="profile" element={<Profile />} />
            <Route path="manage-password" element={<ManagePassword />} />              
            <Route path="contacts" element={<UserContactList />} />              

            </Route>
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password' element={<ResetPassword />} />


          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
