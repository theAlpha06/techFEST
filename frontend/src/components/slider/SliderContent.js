import React from "react";
import './slider.css';
function SliderContent({ activeIndex, imageSlider }) {
  return (
    <section style={{height:"100%",width:"100%"}}>
      {imageSlider.map((slide, index) => (
        <div
          key={index}
          className={index === activeIndex ? "slides active" : "inactive"}
        >
            <img className="slide-image" src={slide.pic} alt=""   height={'100%'} width={'100%'}/>
        </div>
      ))}
    </section>
  );
}

export default SliderContent;
