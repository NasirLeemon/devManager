import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import FormTextInput from '../layout/FormTextInput'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {Form, Button} from 'react-bootstrap'
import { axiosPublicInstance } from '../config/axios'
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'



const schema = yup.object({
    password: yup
    .string()
    .required('password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
      'Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    ),
  confirmPassword: yup
    .string()
    .required('confirm Password is Required')
    .oneOf([yup.ref('password')], "confirm password doesn't match"),
 
})

function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    isSubmitting,
  } = useForm({
    resolver: yupResolver(schema),
  })

const [searchParams] = useSearchParams()
const code = searchParams.get('code')

const navigate = useNavigate()


const onSubmit = async (data) => {

try {
    const response = await axiosPublicInstance.post('/auth/reset-password', {
        code: code,
        password: data.password,
        passwordConfirmation: data.confirmPassword,
    })

    console.log(response.data);
    navigate('/logIn')
} catch (error) {
    console.log(error.response);
}

}


  return (
    <>
<h2 className='text-center mb-3'>Reset Password </h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormTextInput
          name='password'
          label='Password'
          placeholder='Enter password'
          errors={errors}
          register={register}
          type='password'
         
        />
        <FormTextInput
          name='confirmPassword'
          label='Confirm Password'
          placeholder='Confirm password'
          errors={errors}
          register={register}
          type='password'
         
        />

        <Button
          variant='primary'
          size='md'
          type='submit'
          disabled={isSubmitting ? 'disabled' : ''}
          className='text-center d-inline-block w-auto'
        >
          Reset
        </Button>
      </Form>

    </>
  )
}

export default ResetPassword 