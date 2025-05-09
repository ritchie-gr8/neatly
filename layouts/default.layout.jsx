import Head from "next/head";
import React from "react";
import Navbar from "../components/global/navbar";
import Footer from "../components/global/footer";

const DefaultLayout = ({ title, children, showFooter = false }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <div className="pt-16">{children}</div>
        {showFooter && <Footer />}
      </main>
    </>
  );
};

export default DefaultLayout;
