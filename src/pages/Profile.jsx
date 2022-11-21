import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/Auth.Context";
import { Table, Button,} from 'react-bootstrap';


function Profile() {
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{user.id}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default Profile;
