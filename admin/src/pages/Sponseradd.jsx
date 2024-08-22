import React, { useState, useEffect } from "react";
import "./Sponseradd.css";
import axios from "axios";
import { baseUrl } from "../API/api";

const Sponseradd = () => {
  const [sponserName, setSponserName] = useState(null);
  const [sponserWebsite, setSponserWebsite] = useState(null);
  const [sponserPicture, setSponserPicture] = useState(null);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);

  const PostData = async () => {
    const formData = new FormData();
    formData.append("sponserName", sponserName);
    formData.append("sponserWebsite", sponserWebsite);
    formData.append("sponserPicture", sponserPicture);
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    await axios
      .post(`${baseUrl}/sponser/create`, formData)
      .then((result) => {
        const res = result;
        console.log("fnal", res);
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  }

  return (
    <div className="sponserAdd">
      <div className="sponserHeader">Add Sponser</div>
      <div className="sponserItems">
        <label>
          Name : 
          <input
            type="text"
            name="name"
            onChange={(e) => setSponserName(e.target.value)}
          />
        </label>
        <label>
          Website : 
          <input
            type="text"
            name="webiste"
            onChange={(e) => setSponserWebsite(e.target.value)}
          />
        </label>
        <div className="photoUpload">
          Logo:
          <input
            style={{ border: "none" }}
            type="file"
            onChange={(e) => setSponserPicture(e.target.files[0])}
            accept="/Image/*"
          />
        </div>
      </div>

      <div className="container">
        <div>
          <div className="container-head">Contact Person </div>
          <div className="sponserBox">
            <div className="sponserItems">
              <label>
                Name :{" "}
                <input name="name" onChange={(e) => setName(e.target.value)} />
              </label>
            </div>
            <div className="sponserItems">
              <label>
                Phone : <input type="number" name="phone" onChange={(e) => setPhone(e.target.value)}/>
              </label>
            </div>
            <div className="sponserItems">
              <label>
                Email : <input type="email" name="email" onChange={(e) => setEmail(e.target.value)}/>
              </label>
            </div>
          </div>
        </div>
      </div>
      <button type="button" className="submit-btn" onClick={PostData}>
        Submit
      </button>
    </div>
  );
};

export default Sponseradd;
