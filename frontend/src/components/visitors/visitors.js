import React, { useState } from "react";
import axios from "axios";
import styles from "./visitors.module.css";

const Visitors = () => {
  const [visitors, setVisitors] = useState(0);

  window.onload = () => {
    const getToken = localStorage.getItem("uniqueVisitor");
    const token = {
      token: getToken,
    };
    axios
      .post("http://localhost:4000/visitors/count", token)
      .then((res) => {
        if (res.status === 200) {
          setVisitors(res.data.count);
          localStorage.setItem("uniqueVisitor", res.data.token);
          return;
        } else if (res.status === 208) {
          setVisitors(res.data.count);
        } else {
          console.log(res);
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.visitors}>
      <div className={styles.content}>
      <h2>
        Number of unique visitors to our site
      </h2>
      </div>
      <div className={styles.content}>
        <h1>{visitors}</h1>
      </div>
    </div>
  );
};

export default Visitors;
