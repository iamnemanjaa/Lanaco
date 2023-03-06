import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import classes from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={classes.loader_container}>
      <ClipLoader
        color={"#a2a9a9"}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
