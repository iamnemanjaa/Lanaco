import React from 'react';
import ErrorMessage from "../components/UI/ErrorMessage";
import {useRouteError} from "react-router-dom";

const Error = () => {
  const error = useRouteError();

  return (
    <ErrorMessage error={error}/>
  );
};

export default Error;