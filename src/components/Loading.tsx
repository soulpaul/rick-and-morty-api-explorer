import React from "react";
import RickSanchez from "../images/rick-sanchez-loader.gif";

const Loading = () => {
  return (
    <div className="text-center mt-4">
      <img src={RickSanchez} alt="Loading" />
      <h1 className="mt-4">Wubba Lubba Dub Dub Loading...</h1>
    </div>
  );
};

export default Loading;
