import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import FormTextInput from '../layout/FormTextInput'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {Form, Button} from 'react-bootstrap'
import { AuthContext } from '../context/Auth.Context'
import { axiosPublicInstance } from '../config/axios'


const schema = yup.object({
  email: yup
    .string()
    .required('Email is Required'),
  password: yup
    .string()
    .required('password is required')
 
})

function LogIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    isSubmitting,
  } = useForm({
    resolver: yupResolver(schema),
  })

const context = useContext(AuthContext)
const {logIn} = context;



const onSubmit = (data) => {
  console.log(data);
logIn({
  identifier: data.email,
  password: data.password
})

}


  return (
    <>
<h2 className='text-center mb-3'>Log In</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormTextInput
          name='email'
          label='Email'
          placeholder='Enter Your Email'
          errors={errors}
          register={register}
          defaultValue='leemon174@gmail.com'
        />
        <FormTextInput
          name='password'
          label='password'
          placeholder='Enter password'
          errors={errors}
          register={register}
          type='password'
          defaultValue='abcdeFf1@'
        />
        <FormTextInput
          name='confirmPassword'
          label='confirm Password'
          placeholder='Confirm password'
          errors={errors}
          register={register}
          type='password'
          defaultValue='abcdeFf1@'
        />

        <Button
          variant='primary'
          size='md'
          type='submit'
          disabled={isSubmitting ? 'disabled' : ''}
          className='text-center d-inline-block w-auto'
        >
          Log In
        </Button>
      </Form>

    </>
  )
}

export default LogIn