import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ContactContext } from "../../context/ContactContext";
import FormTextInput from "../../layout/FormTextInput";

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

function ContactForm({ foundContact }) {
  const context = useContext(ContactContext);
  const { addContact, updateContact } = context;

  const [birthYear, setBirthYear] = useState(new Date());
  const navigate = useNavigate();
  console.log(foundContact);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    setValue,
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    setValue("dateOfBirth", birthYear);
  }, [birthYear]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstName: "",
        lastName: "",
        email: "",
        gender: "male",
        profession: "",
        image: "",
        bio: "",
        dateOfBirth: "",
      });
    }
  }, [isSubmitSuccessful]);

  const defaultContact = {
    firstName: foundContact?.firstName || "Abu Nasir",
    lastName: foundContact?.lastName || "Leemon",
    email: foundContact?.email || "leemon174@gmail.com",
    gender: foundContact?.gender || "male",
    profession: foundContact?.profession || "developer",
    image:
      foundContact?.image ||
      "https://scontent-ccu1-1.xx.fbcdn.net/v/t39.30808-6/283783578_1618795568496799_5358402685246666311_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=730e14&_nc_eui2=AeFavoevnXaGXr3_swd8tcFYZCvtwUX0RhhkK-3BRfRGGILF2uKUSa_Ivk2-iSteROID_7a6KbpcHoOIVyuxN6FK&_nc_ohc=el5xOuiL_KIAX_JbUaY&_nc_ht=scontent-ccu1-1.xx&oh=00_AfDVfrj2CtQ-qHrynaC_8Bez9um-wuVd9kd1Lej_3QUUcA&oe=6363D906",
    bio: foundContact?.bio || "Bio Bio Bio Bio bio Bio N9p",
    dateOfBirth: foundContact?.dateOfBirth || "23/12/1995",
  };

  const {
    firstName,
    lastName,
    email,
    gender,
    profession,
    image,
    bio,
    dateOfBirth,
  } = defaultContact;

  const onSubmit = (data) => {
    if (foundContact?.id) {
      toast.success("Contact Updated Successfully");
      updateContact(data, foundContact?.id);
    } else {
      toast.success("Contact Added Successfully");
      addContact(data);
    }
    navigate("/contacts");
  };

  return (
    <>
      <h2 className="text-center">
        {" "}
        {foundContact?.id ? "Update Contact" : "Add Contact"}{" "}
      </h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormTextInput
          name="firstName"
          label="First Name"
          placeHolder="Enter Your First Name"
          type="text"
          errors={errors}
          register={register}
          defaultValue={firstName}
        />
         <FormTextInput
          name="lastName"
          label="Last Name"
          placeHolder="Enter Your Last Name"
          errors={errors}
          register={register}
          defaultValue={lastName}
        />
        <FormTextInput
          name="email"
          label="Email"
          placeHolder="Enter Your Email"
          type="text"
          errors={errors}
          register={register}
          defaultValue={email}
        />
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
              defaultChecked={gender === "male"}
              {...register("gender")}
              value="male"
            />
          </Col>
          <Col>
            <Form.Check
              label="Female"
              type="radio"
              name="gender"
              defaultChecked={gender === "female"}
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
              defaultValue={profession}
              {...register("profession")}
              isInvalid={errors?.profession?.message}
              aria-label="Select your profession"
            >
              <option value="" disabled>
                Select your profession
              </option>
              <option value="developer">Web Developer</option>
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
              defaultValue={dateOfBirth}
            />
          </Col>
        </Form.Group>
        <FormTextInput
          name="image"
          label="Image"
          placeHolder="Enter Your Image URL"
          type="text"
          errors={errors}
          register={register}
          defaultValue={image}
        />
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
              defaultValue={bio}
              {...register("bio")}
              isInvalid={errors?.bio?.message}
              placeholder="Enter Your Bio"
            />
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors?.bio?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting ? "disabled" : ""}
        >
          {foundContact?.id ? "Update Contact" : "Add Contact"}
        </Button>
      </Form>
    </>
  );
}

export default ContactForm;
