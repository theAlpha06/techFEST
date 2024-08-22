import React, { useEffect, useState } from 'react';
import './Domainadd.css';
import axios from 'axios';
import { baseUrl } from '../API/api';

const Domainadd = () => {
  const [domainName, setDomainName] = useState(null);
  const [domainInfo, setDomainInfo] = useState(null);
  const [domainPicture, setDomainPicture] = useState('');
  const [coordinators, setCoordinators] = useState(null);
  const [domainCoor1, setDomainCoor1] = useState(null);
  const [domainCoor2, setDomainCoor2] = useState(null);
  const [facultyAdvisor, setFacultyAdvisor] = useState(null);

  useEffect(async () => {
    await axios
      .get(`${baseUrl}/coordinator/get`)
      .then((result) => {
        const res = result;
        setCoordinators(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const PostData = async () => {
    const formData = new FormData();
    formData.append('domainName', domainName);
    formData.append('domainInfo', domainInfo);
    formData.append('domainPicture', domainPicture);
    formData.append('domainCoor1', domainCoor1);
    formData.append('domainCoor2', domainCoor2);
    formData.append('facultyAdvisor', facultyAdvisor);
    await axios.post(`${baseUrl}/domain/create`, formData).then((result) => {
      const res = result;
      console.log(res);
    });
  };

  return (
    <div className="domainAdd">
      <div className="domainHeader">Add Domain</div>
      <form method="post">
        <div className="domainItems">
          <label>
            Name :{' '}
            <input
              name="firstName"
              onChange={(e) => setDomainName(e.target.value)}
            />
          </label>
          <div className="photoUpload">
            Domain Picture:
            <input
              style={{ border: 'none' }}
              type="file"
              onChange={(e) => setDomainPicture(e.target.files[0])}
              accept="/Image/*"
            />
          </div>
        </div>
        <div
          style={{
            width: 'auto',
            justifyContent: 'right',
            textAlign: 'left',
          }}
        >
          Domain Description (max 50 words)
          <br />
          <textarea
            name="description"
            cols="40"
            rows="5"
            onChange={(e) => setDomainInfo(e.target.value)}
          />
        </div>

        <div className="containerDomainAdd">
          <div>
            <div className="container-head-DomainAdd">Domain Co-ordinator - 1</div>
            <div className="domainBox">
              <select
                // className={styles.signup__select}
                sx={{ height: '10px' }}
                onChange={(e) => setDomainCoor1(e.target.value)}
                // id='branch'
                name="role"
                // value={branch}
                required
              >
                {coordinators?.map((item) => (
                  <option value={item._id}>{item.coordinatorEmail}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <div className="container-head">Domain Co-ordinator - 2 </div>
            <div className="domainBox">
              <select
                // className={styles.signup__select}
                sx={{ height: '10px' }}
                onChange={(e) => setDomainCoor2(e.target.value)}
                // id='branch'
                name="role"
                // value={branch}
                required
              >
                {coordinators?.map((item) => (
                  <option value={item._id}>{item.coordinatorEmail}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <div className="container-head">Faculty Advisor</div>
            <div className="domainBox">
              <select
                // className={styles.signup__select}
                sx={{ height: '10px' }}
                onChange={(e) => setFacultyAdvisor(e.target.value)}
                // id='branch'
                name="role"
                // value={branch}
                required
              >
                {coordinators?.map((item) => (
                  <option value={item._id}>{item.coordinatorEmail}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <button type="button" className="submit-btn" onClick={PostData}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Domainadd;
