import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/Auth.Context";
import { axiosPrivateInstance } from "../config/axios";
import { InfinitySpin , RevolvingDot, ThreeCircles, Vortex } from  'react-loader-spinner'






function Profile() {
  const [file, setFile] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [imageUrl, setImageUrl] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const { user } = useContext(AuthContext);
  // console.log(user);
  const {id, username, email} = user


const handlesubmit = async (evt)=>{
  evt.preventDefault()

  const data = {
    firstName: 'Abu Nasir',
    lastName: 'Leemon',
    user: id,
  }

  const formData = new FormData()
  formData.append('files.profilePicture', file, file.name)
  formData.append('data', JSON.stringify(data))

  try {
    setSubmitting(true)
    const response = await axiosPrivateInstance.post('/profiles?populate=*', formData)
    setSubmitting(false)
    setSubmitted(true)
    console.log(response.data);
    setImageUrl(response.data.data.attributes.profilePicture.data.attributes.url)
  } catch (error) {
    console.log(error.response);
    
  }
}

  const handleChange = (evt) => {
    console.log(evt.target.files);
    setFile(evt.target.files[0])
  }


  return (
    <>
    <div>

    <p>Name : {username}</p><br />
    <p>Email: {email}</p>
    </div>
    <div>
      <form onSubmit={handlesubmit}>
      <label htmlFor="profilePicture">Upload Profile Picture: </label>
      <input type="file" name="profilePicture" id="profilePicture" accept="image/*" onChange={handleChange} />
      <input type="submit" value="submit" disabled={submitting} />
      </form>
      {submitting && 
      <>
    <ThreeCircles
    height="100"
    width="100"
    color="#4fa94d"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
    ariaLabel="three-circles-rotating"
    outerCircleColor=""
    innerCircleColor=""
    middleCircleColor=""
    />
  <Vortex
  visible={true}
  height="80"
  width="80"
  ariaLabel="vortex-loading"
  wrapperStyle={{}}
  wrapperClass="vortex-wrapper"
  colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
/>
  </>
  }
  <div>
    {!submitting && submitted && <img src={imageUrl} alt='profile Image' />}
  </div>
    </div>
    </>
  );
}

export default Profile;
