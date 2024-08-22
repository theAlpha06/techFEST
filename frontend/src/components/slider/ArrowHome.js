import React from 'react'

function ArrowPrev({prevSlide}) {
  return (
    <div className='arrows'>
      <span className='prevHome' onClick={prevSlide}>
        &#10094;
      </span>
    </div>
  )
}
function ArrowNext({nextSlide}) {
    return (
      <div className='arrows'>
        <span className='nextHome' onClick={nextSlide} >
          &#10095;
        </span>
      </div>
    )
  }
export  {ArrowPrev, ArrowNext};
