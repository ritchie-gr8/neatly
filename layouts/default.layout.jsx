import Head from "next/head";
import React from "react";
import Navbar from "../components/global/navbar";
import Footer from "../components/global/footer";
import Chatbot from "../components/global/chatbot/chatbot";

const DefaultLayout = ({ title, children, showFooter = false }) => {
  return (
    <>
      <Head>
        <title>{title+' | Neatly'}</title>
      </Head>
      <main className="min-h-screen flex flex-col relative">
        <Navbar />
        <div className="md:pt-16 pt-12 flex-grow bg-util-bg">{children}</div>
        <Chatbot className="fixed bottom-4 right-4" />
        {showFooter && <div className="mt-auto"><Footer /></div>}
      </main>
    </>
  );
};

export default DefaultLayout;
