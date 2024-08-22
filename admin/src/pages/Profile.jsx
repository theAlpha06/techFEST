import axios from "axios";
import React from "react";
import "./profile.css";
import { useState } from "react";
import { Upload } from "@progress/kendo-react-upload";
import { HiOutlineMail } from "react-icons/hi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../API/api";
import Loader from "../components/Loader/Loader";
function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const user_id = localStorage.getItem("coordinatorId");
  const [userPhoto, setUserPhoto] = useState(null);
  const [sizeMsg, setSizeMsg] = useState(null);
  const [coordinator, setCoordinator] = useState(null);
  const [sizeErr, setSizeErr] = useState(false);
  const notify = (msg) =>
    toast.success(msg, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  useEffect(() => {
    getCoodinator();
  }, []);
  const getCoodinator = async () => {
    setIsLoading(true);
    await axios
      .get(`${baseUrl}/coordinator/getById/${user_id}`)
      .then((result) => {
        setIsLoading(false);
        const res = result;
        setCoordinator(res.data.coordinator);
      });
  };

  const uploadPhoto = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("coordinatorPhoto", userPhoto);
    await axios
      .post(`${baseUrl}/coordinator/updatephoto/${user_id}`, formData)
      .then((result) => {
        setIsLoading(false);
        if (result.status === 208) {
          setSizeMsg(result.data.message);
          setSizeErr(true);
          setTimeout(() => {
            setSizeMsg(null);
            setSizeErr(false);
          }, 2000);
          return;
        }
        const res = result;
        notify(res.data.message);
        window.location.reload(false);
      });
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="profile-cards">
          <div className="card card-1">
            <div className="card-description">
              <h2 className="card-description-title">
                Name :<b>{coordinator?.coordinatorName}</b>
              </h2>
              <span className="card-description-content">
                Phone: <b>{coordinator?.coordinatorPhone}</b>
              </span>
              <span className="card-description-content">
                Coordinator Type :<b>{coordinator?.coordinatorType} </b>
              </span>
              <span className="card-description-content">
                Branch :<b>{coordinator?.coordinatorBranch}</b>
              </span>
              <span className="card-description-content">
                Email :<b> {coordinator?.coordinatorEmail}</b>
              </span>
            </div>
            {coordinator?.coordinatorPhoto && (
              <img
                alt="profile"
                src={`${baseUrl}/${coordinator?.coordinatorPhoto}`}
                className="card-image"
              />
            )}
          </div>
        </div>
        <div className="file-upload">
          {/* <div className="file-select">
            <div className="file-select-button" id="fileName">
              Choose File
            </div>
            {
              !sizeErr ?

              <div className="file-select-name" id="noFile">
                No file chosen...
              </div>
              :
              <div className="file-select-name" id="noFile" style={{color: 'red'}}>
                {sizeMsg}
              </div>
            }
            <input
              type="file"
              name="chooseFile"
              id="chooseFile"
              style={{ border: "none", width: "250px" }}
              onChange={(e) => setUserPhoto(e.target.files[0])}
              accept="image/*"
            />
          </div> */}
          Profile Picture:
          <input
            id="profile-upload"
            style={{ border: "none", width: "250px" }}
            type="file"
            onChange={(e) => setUserPhoto(e.target.files[0])}
            accept="image/*"
          />
          {sizeErr && (
            <p style={{ color: "red", display: "inline" }}>{sizeMsg}</p>
          )}
          <button
            style={{
              marginTop: "20px",
              border: "2px solid green",
              padding: "5px",
            }}
            onClick={uploadPhoto}
          >
            Update
          </button>
        </div>
      </div>

      {/* {!coordinator?.coordinatorPhoto && (
        <div className="update_photo">
          Profile Picture:
          <input
            id="profile-upload"
            style={{ border: "none", width: "250px" }}
            type="file"
            onChange={(e) => setUserPhoto(e.target.files[0])}
            accept="image/*"
          />
          {sizeErr && (
            <p style={{ color: "red", display: "inline" }}>{sizeMsg}</p>
          )}
          
        </div>
      )} */}
    </>
  );
}

export default Profile;
