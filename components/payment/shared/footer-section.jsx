import React from "react";

const FooterSection = ({text = "Next"}) => {
  return (
    <footer className="font-semibold flex flex-row justify-between items-center py-6 md:py-0 px-4 md:px-0 ">
      <p className="md:ml-2 text-orange-500 cursor-pointer hover:text-orange-500 hover:underline">
        Back
      </p>

      <div className="btn-primary px-8 py-4" >{text}</div>
    </footer>
  );
};

export default FooterSection;
