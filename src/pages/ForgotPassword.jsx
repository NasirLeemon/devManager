import React from 'react'
import {Form, Button} from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import FormTextInput from '../layout/FormTextInput'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { axiosPublicInstance } from '../config/axios'
import { toast } from 'react-toastify'


const schema = yup.object({
    email: yup
      .string()
      .required('Email is Required'),
  })


function ForgotPassword() {

    const {
        register,
        handleSubmit,
        formState: { errors },
        isSubmitting,
      } = useForm({
        resolver: yupResolver(schema),
      })


    const onSubmit = async (data) => {
       try {
        
           const response = await axiosPublicInstance.post('/auth/forgot-password',{
            email: data.email
           })
           toast.success('Email is send with password Reset Link')
       } catch (error) {
        console.log(error.response);
       }
      
      }

    return (
        <>
    <h2 className='text-center mb-3'>Forgot Password ?</h2>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormTextInput
              name='email'
              label='Email'
              placeholder='Enter Your Email'
              errors={errors}
              register={register}

            />
           
            <Button
              variant='primary'
              size='md'
              type='submit'
              disabled={isSubmitting ? 'disabled' : ''}
              className='text-center d-inline-block w-auto'
            >
              Submit
            </Button>
          </Form>
    
        </>
      )
}

export default ForgotPassword