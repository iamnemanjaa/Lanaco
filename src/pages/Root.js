import React from 'react';
import MainNavigation from "../components/UI/MainNavigation";
import {Outlet, useNavigation} from "react-router-dom";
import Loader from "../components/UI/Loader";

const Root = () => {
  const navigation = useNavigation();

  return (
    <>
      {(navigation.state === 'loading' || navigation.state === 'submitting') && <Loader />}
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Root;