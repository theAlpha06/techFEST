import React from "react";
import {useState} from "react";
import "./merchandise.css";
// import Icon from "../images/iconizer-cart.svg";
 import { data } from "./data";
//import smalltshirt from "../images/imgonline-com-ua-ReplaceColor-qTiQtg5rZvbnZEiJ-removebg-preview.png";
 function Merchandise() {
  const  [product]= useState(data);
  
   const [value,setValue]=useState(0);
    const { mainImage } = product[value];

  return (
    <>
      <div className="merch_background">
        <div>
          <img src="/tf23.webp" alt="" className="merch_bg" />
        </div>
        <div className="tf_content">
          <div className="merch_top">
            {/* <div className="merch_text"> */}
              <h1 className="be_a_prt">be a part !</h1>
            {/* </div> */}
            {/* <div className="cart_icon">
              <img src={Icon} alt="" className="merch_icon" />
              <p className="cartvalue">2</p>
            </div> */}
          </div>
          <div className="merch_mid">
   
            <div className="mid_left">
          
              <div className="image_container">
          
                <img src={mainImage} alt="" className="merch_tshirt" />
              </div>
              <div className="four_merch_box">
              {product.map((item,index)=>(
                <div className="small_image_container" key={item.id}    onClick={() => setValue(index)}>
                  <img src={item.thumbnail} className="bigmerchimg" alt="" />
                </div>
  
                   ))}
              </div>
            </div>
            <div className="mid_mid">
              <div className=" merch_mimid_top">
                <p className="name_of_tshirt">techFEST ‘23 official T-shirt</p>
                <p className="merchprice">₹ 349</p>
                {/* <p className="hurry_itemleft">Hurry ! Only 2 left in Stock</p> */}
              </div>
              {/* <div className="merch_sizechart">
                <p class="pick">Select Size :</p>
                <tr class="sizes">
                  <td class="size">
                    <button className="btn_size-mer">s</button>
                  </td>
                  <td class="size">
                    <button className="btn_size-mer">m</button>
                  </td>
                  <td class="size">
                    <button className="btn_size-mer">l</button>
                  </td>
                  <td class="size">
                    <button className="btn_size-mer">xl</button>
                  </td>
                  <td class="size">
                    <button className="btn_size-mer">xxl</button>
                  </td>
                  
                </tr>
                <label className="select_size_mer"> Select Size:</label>
                <select name="size">
                  <option value="s">S</option>
                  <option value="m">M</option>
                  <option value="l">L</option>
                  <option value="xl">XL</option>
                  <option value="xxl">XXL</option>
                </select>
              </div> */}
              <div className="mid_butt">
              <button className="merch_buynow"><a target="_blank" rel="noreferrer" href="https://forms.gle/pfYjxu6zbz61QTqR8">Buy Now</a></button>
                {/* <button className="merch_buynow">Out of Stock</button> */}
              </div>
              {/* <div className="mid_butt">
                <button className="merch_add2crt"> Add to Cart</button>
              </div> */}
            </div>
            {/* <div className="mid_right">
              <div className="merchant_mid_table">
                <form className="merch_box_form">
                  <div className="form-group">
                    <label className="lable_merch" for="name">
                      Name(to be printed on T-shirt):
                    </label>
                    <input
                      className="inpname"
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                    ></input>
                  </div>
                  <div className="form-group">
                    <label className="lable_merch" for="phone">
                      Phone:
                    </label>
                    <input
                      className="inpphone"
                      type="tel"
                      name="phone"
                      placeholder="Enter your Phone no."
                    ></input>
                  </div>
                  <div className="form-group">
                    <label className="lable_merch" for="email">
                      E-mail:
                    </label>
                    <input
                      className="inpmai"
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                    ></input>
                  </div>
                </form>
              </div>
            </div> */}
          </div>
          {/* <div className="merch_bottom">
            <a href="" className="btmlast">
              more items &gt;
            </a>
          </div> */}
        </div>
      </div>
    </>
  );
}
export default Merchandise;