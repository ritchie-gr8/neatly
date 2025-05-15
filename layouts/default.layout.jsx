import Head from "next/head";
import React from "react";
import Navbar from "../components/global/navbar";
import Footer from "../components/global/footer";
import Chatbot from "../components/global/chatbot";

const DefaultLayout = ({ title, children, showFooter = false }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main className="min-h-screen flex flex-col relative">
        <Navbar />
        <div className="md:pt-16 pt-12">{children}</div>
        <Chatbot className="fixed bottom-4 right-4" />
        {showFooter && <Footer />}
      </main>
    </>
  );
};

export default DefaultLayout;
