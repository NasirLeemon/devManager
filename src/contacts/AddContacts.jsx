import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import DatePicker from 'react-datepicker'

function AddContacts({addContact}) {


const [contact, setContact] = useState({
    firstName : '',
    lastName : '',
    email: '',
    profession : '',
    bio: '',
    dateOfBirth : '',
    gender: '',
    image : ''
})


const {firstName, lastName, email, profession, bio, dateOfBirth, gender, image} = contact



const handleChange = (evt) => {

  setContact({
    ...contact,
    [evt.target.name] : evt.target.value
  })
    
}

const handleSubmit = (evt) => {
  evt.preventDefault()
  // console.log(contact);
  addContact(contact)
}



  return (
    <>
      <h2 className="text-center">AddContacts</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label htmlFor="firstName" column>First Name: </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control 
            type="text"
            id='firstName'
            name='firstName'
            onChange={handleChange}
            value={firstName}
            placeholder='Enter Your First Name' />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label htmlFor="lastName" column>Last Name: </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control 
            type="text"
            id='lastName'
            name='lastName'
            onChange={handleChange}
            value={lastName}
            placeholder='Enter Your Last Name' />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label htmlFor="email" column>Email: </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control 
            type="email"
            id='email'
            name='email'
            onChange={handleChange}
            value={email}
            placeholder='Enter Your Email' />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label htmlFor="gender" column>Gender: </Form.Label>
          </Col>
          <Col>
            <Form.Check 
            label='Male'
            type="radio"
            id='gender'
            name='gender'
            checked={gender === 'male'}
            onChange={handleChange}
            value='male'
            />
          </Col>
          <Col>
            <Form.Check
            label='Female' 
            type="radio"
            id='gender'
            name='gender'
            checked={gender === 'female'}
            onChange={handleChange}
            value='female'
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Col sm={3}>
            <Form.Label htmlFor='profession' column>
              Profession
            </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Select
            name="profession"
              id='profession'
              value={profession}
              onChange={handleChange}
              aria-label='Select your profession'
            >
              <option value='' disabled>
                Select your profession
              </option>
              <option value='developer'>Developer</option>
              <option value='designer'>Designer</option>
              <option value='marketer'>Markerter</option>
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label htmlFor="dateOfBirth" column>Date Of Birth: </Form.Label>
          </Col>
          <Col sm={9}>
              <DatePicker 
              selected={dateOfBirth}
              name='dateOfBirth'
              id="dateOfBirth"
              maxDate={new Date()}
              onChange={(date)=> setContact({
                ...contact,
                dateOfBirth: date,
              })}
              showYearDropdown
              placeholderText='Enter Your Date of Birth'
              />
            {/* <Form.Control 
            type="text"
            id='dateOfBirth'
            name='dateOfBirth'
            onChange={handleChange}
            value={dateOfBirth}
            placeholder='Enter Your Date of Birth' /> */}
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label htmlFor="image" column>Image: </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control 
            type="text"
            id='image'
            name='image'
            onChange={handleChange}
            value={image}
            placeholder='Enter Your Image URL' />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label htmlFor="bio" column>Bio: </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control 
            type="text-area"
            id='bio'
            name='bio'
            onChange={handleChange}
            value={bio}
            placeholder='Enter Your Bio' />
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary" >Add Contact</Button>
      </Form>
    </>
  );
}

export default AddContacts;
