import React, { useEffect, useState } from "react";
import Head from "next/head";

import { Button, Col, Container, Input, Row } from "reactstrap";
import { store, persistor } from "@/redux/store";
import { Switch, Route, Router } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { createBrowserHistory } from "history";

import App from "@/containers/App/app";

const Home = () => {
  // const history = createBrowserHistory();
  // useEffect(() => {
  //   history.listen((location) => {
  //     // logPageView(location.pathname + location.search);
  //   });
  // }, []);

  return (
    <div className="container">
      <Head>
        <title>Codenames</title>
        <link rel="icon" href={`${process.env.prefix}/favicon.ico`} />
      </Head>

      <main>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
