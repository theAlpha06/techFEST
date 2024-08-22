import React, { useEffect, useState } from "react";
import "./AddMember.css";
import { members } from "./members.js";
function AddMember(props) {
  // alert(JSON.stringify(props));
  const [name, setName] = useState("");
  const [tfId, setTfId] = useState("");
  const [membersList, setMembersList] = useState([]);
  const [email, setEmail] = useState("");
  useEffect(() => {
    setMembersList(members);
  }, []);
  const handleAdd = (e) => {
    e.preventDefault();
    const member = {
      name: name,
      tfId: tfId,
      email: email,
    };
    membersList.push(member);
  };
  return (

    <div className="Popup-son">
      {/* <p>Domain Name</p> */}
      <form className="Popup-formcss">
        <h2>ADD TEAM MEMBER</h2>
        {/* <br /> */}
        <div className="Popup-borderline">
          {/* <Form /> */}

          <div className="Popup-formdiv">
            <p className="Popup-formheading">Full Name</p>
            <input
              className="Popup-forminput"
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
            {/* <p className="formcontent">shivam kashyap</p> */}
            <div className="Popup-formline"></div>

            <p className="Popup-formheading">techFEST Id ( For ex- tf#1760)</p>
            {/* <p className="formcontent">tf 1760</p> */}
            <input
              className="Popup-forminput"
              value={tfId}
              type="text"
              onChange={(e) => setTfId(e.target.value)}
            />
            <div className="Popup-formline"></div>

            <p className="Popup-formheading">
              E-mail Id ( Enter your SLIET Id if SLIET student)
            </p>
            {/* <p className="formcontent">2130103@sliet.ac.in</p> */}
            <input
              className="Popup-forminput"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="Popup-formline"></div>
          </div>

          {/* <button class="myButton">Add Team Mate</button> */}
        </div>
        {/* <button placeholder="h1"></button> */}

        <button class="Popup-btn" onClick={handleAdd}>
          Add Team Mate
        </button>
        <button class="Popup-btn">Cancel</button>
      </form>
    </div>
  );
}
export default AddMember;
