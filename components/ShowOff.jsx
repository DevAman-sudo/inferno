import React from "react";

const ShowOff = () => {
  return (
    <div>
      <div>
        <div className="relative w-screen h-auto flex flex-col justify-center align-center">
          <img className="brightness-50" src="img/table.jpg" />

          <p className="text-white bolder tracking-widest text-2xl text-center  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            Everything your Home Deserves.{" "}
          </p>
        </div>
        <div className="w-[90%] md:w-[80%] h-auto py-8 mx-auto px-4 text-white text-center bg-themecolor ">
            <h1 className="text-2xl font-bold tracking-wider">Furniture that will last Forever</h1>
            <p className="text-sm brightness-90">Affordable furniture for every home.</p>
            <a href="/products">
            <button className="bg-white text-black px-4 py-2 mt-2 text-sm bolder tracking-widest">Shop Now</button>
            </a>
        </div>
      </div>
    </div>
  );
};

export default ShowOff;
