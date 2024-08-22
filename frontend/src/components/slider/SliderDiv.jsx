import React from 'react'
import SliderContent from "./SliderContent.js";
import {ArrowPrev, ArrowNext} from "./ArrowHome.js";
import { useState, useEffect } from "react";
function SliderDiv({arr}) {
const leng = arr?.length - 1;

    const [activeIndex, setActiveIndex] = useState(1);
  const [activeIndexPrev, setActiveIndexPrev] = useState(0);
  const [activeIndexNext, setActiveIndexNext] = useState(2);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(activeIndex === leng ? 0 : activeIndex + 1);
      setActiveIndexPrev(activeIndex);
      setActiveIndexNext(activeIndexNext === leng ? 0 : activeIndexNext + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [activeIndex, activeIndexPrev, activeIndexNext,leng]);

  return (
   <div style={{display:'flex',justifyContent:"center",alignItems:"center",width:"95%"}}>
          <ArrowPrev
        prevSlide={() => {
          setActiveIndex(activeIndex < 1 ? leng : activeIndex - 1);
          setActiveIndexNext(activeIndex);
          setActiveIndexPrev(
            activeIndexPrev < 1 ? leng : activeIndexPrev - 1
          );
        }}
       
      />
     <div className="sponsorImages">
          
          <div className="prevSlide">
            <SliderContent
              activeIndex={activeIndexPrev}
              imageSlider={arr}
            />
          </div>
      
          <div className="mainSlide">
            <SliderContent
              activeIndex={activeIndex}
              imageSlider={arr}
            />
          </div>
      
          <div className="nextSlide">
            <SliderContent
              activeIndex={activeIndexNext}
              imageSlider={arr}
            />
          </div>
          
        </div>
            <ArrowNext
           nextSlide={() => {
            setActiveIndex(activeIndex === leng ? 0 : activeIndex + 1);
            setActiveIndexPrev(activeIndex);
            setActiveIndexNext(
              activeIndexNext === leng ? 0 : activeIndexNext + 1
            );
          }}
          />
   </div>
  )
}

export default SliderDiv;