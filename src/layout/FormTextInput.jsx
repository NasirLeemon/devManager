import React from 'react'
import {Form, Col, Row} from 'react-bootstrap'



function FormTextInput({name, label, placeHolder, type='text', errors, register,defaultValue}) {
  return (
<Form.Group as={Row} className="mb-3">
          <Col sm={3}>
            <Form.Label htmlFor={name} column>
              {label}
            </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control
              type={type}
              id={name}
              defaultValue={defaultValue}
              {...register(name)}
              isInvalid={errors?.name}
              placeholder={placeHolder}
            />
            <Form.Control.Feedback type="invalid" className="d-block">
              {errors?.[name]?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
  )
}

export default FormTextInput