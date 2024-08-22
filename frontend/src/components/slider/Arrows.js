import React from 'react'

function Arrows({prevSlide,nextSlide}) {
  return (
    <div className='arrows'>
      <span className='prev' onClick={prevSlide} style={{left:0}}>
        &#10094;
      </span>
      <span className='next' onClick={nextSlide} style={{right:0}}>
        &#10095;
      </span>
    </div>
  )
}

export default Arrows
