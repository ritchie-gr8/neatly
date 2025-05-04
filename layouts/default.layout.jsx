import Head from "next/head";
import React from "react";
import Navbar from "../components/global/navbar";

const DefaultLayout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <div>{children}</div>
        <footer>footer</footer>
      </main>
    </>
  );
};

export default DefaultLayout;
