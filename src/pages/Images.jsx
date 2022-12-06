import React from 'react'

function Images({image}) {
    console.log(image);
  return (
    <div>
       <img  src={image.formats.medium.url} alt="" /> 
        </div>
  )
}

export default Images