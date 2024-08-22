import styles from "./Loader.module.css";
import React from "react";

const Loader = () => {
  return (
    <div class={styles.center}>
      <div class={styles.loader}>
        <svg id="triangle" width="60px" height="60px" viewbox="-3 -4 39 39">
          <polygon
            fill="currentcolor"
            stroke="rgb(0, 0, 255)"
            stroke-width="3"
            points="60,0 0,0 30,60"
          ></polygon>
        </svg>
      </div>
    </div>
  );
};

export default Loader;
