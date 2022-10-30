import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    firstName: yup
      .string()
      .required("FirstName is Required")
      .min(3, "FirstName must be 3 or more in length "),
    lastName: yup
      .string()
      .required("LastName is Required")
      .min(3, "LastName must be 3 or more in length "),
    email: yup
      .string()
      .required("email is Required")
      .email("Must be a valid email"),
    profession: yup
      .string()
      .required("Profession is Required")
      .oneOf(["developer", "designer", "marketer"])
      .min(3, "Profession must be 3 or more in length "),
    bio: yup
      .string()
      .required("Bio is Required")
      .min(10, "Bio must be 10 or more in length ")
      .max(300, "Bio must be equal or less thant 300 character"),
    image: yup
      .string()
      .required("profile Image URL is Required")
      .url("Must be a valid URL"),
    gender: yup
      .mixed()
      .required("Gender is required")
      .oneOf(["male", "female"]),
  })
  .required();

function AddContacts({ addContact }) {
  const [birthYear, setBirthYear] = useState(new Date());

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    setValue,
    reset
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    setValue("dateOfBirth", birthYear);
  }, [birthYear]);

  useEffect(()=>{
    if (isSubmitSuccessful) {
      reset({
        firstName : '',
        lastName : '',
        email: '',
        gender: 'male',
        profession: '',
        image: '',
        bio: '',
        dateOfBirth : '',
      })
    }
  },[isSubmitSuccessful])

  const onSubmit = (data) => console.log(data);

  return (
    <>
      <h2 className="text-center"> Add Contacts </h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label htmlFor="firstName" column>
              First Name:{" "}
            </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control
              type="text"
              id="firstName"
              defaultValue=""
              {...register("firstName")}
              isInvalid={errors?.firstName?.message}
              placeholder="Enter Your First Name"
            />
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors?.firstName?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label htmlFor="lastName" column>
              Last Name:{" "}
            </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control
              type="text"
              id="lastName"
              name="lastName"
              defaultValue=""
              {...register("lastName")}
              isInvalid={errors?.lastName?.message}
              placeholder="Enter Your Last Name"
            />
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors?.lastName?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label htmlFor="email" column>
              Email:{" "}
            </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control
              type="email"
              id="email"
              name="email"
              defaultValue=""
              {...register("email")}
              isInvalid={errors?.email?.message}
              placeholder="Enter Your Email"
            />
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors?.email?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label htmlFor="gender" column>
              Gender:
            </Form.Label>
          </Col>
          <Col>
            <Form.Check
              label="Male"
              type="radio"
              name="gender"
              {...register("gender")}
              value="male"
            />
          </Col>
          <Col>
            <Form.Check
              label="Female"
              type="radio"
              name="gender"
              {...register("gender")}
              value="female"
            />
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors?.gender?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label htmlFor="profession" column>
              Profession
            </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Select
              defaultValue=""
              {...register("profession")}
              isInvalid={errors?.profession?.message}
              aria-label="Select your profession"
            >
              <option value="" disabled>
                Select your profession
              </option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="marketer">Markerter</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors?.profession?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label htmlFor="dateOfBirth" column>
              Date Of Birth:{" "}
            </Form.Label>
          </Col>
          <Col sm={9}>
            <DatePicker
              selected={birthYear}
              name="dateOfBirth"
              id="dateOfBirth"
              maxDate={new Date()}
              onChange={(date) => setBirthYear(date)}
              showYearDropdown
              placeholderText="Enter Your Date of Birth"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label htmlFor="image" column>
              Image:{" "}
            </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control
              type="text"
              id="image"
              name="image"
              defaultValue=""
              {...register("image")}
              isInvalid={errors?.image?.message}
              placeholder="Enter Your Image URL"
            />
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors?.image?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label htmlFor="bio" column>
              Bio:{" "}
            </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control
              type="text-area"
              id="bio"
              name="bio"
              defaultValue=""
              {...register("bio")}
              isInvalid={errors?.bio?.message}
              placeholder="Enter Your Bio"
            />
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors?.bio?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary" disabled={isSubmitting ? 'disabled' : ''}>
          Add Contact
        </Button>
      </Form>
    </>
  );
}

export default AddContacts;
