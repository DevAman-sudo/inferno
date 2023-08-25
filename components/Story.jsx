import React from "react";

const Story = () => {
  return (
    <div>
      <div className="flex w-full h-auto text-gray-500 mb-8">
        <h1 className="font-bold float-left m-4 text-3xl mt-8 mb-8">
          Our story
        </h1>
      </div>

      <div>
        <div className="flex justify-center items-center px-8">
          <img
            src="img/1.jpg"
            alt="image"
            className=" w-[60%] md:w-[20%] h-auto"
          />
          <div className="shadow-md offset-x-2 offset-y-2 blur-4 flex items-center justify-center ">
            <h1 className="bg-opacity-custom ml-[-50%] px-8 py-2 text-themecolor font-bold text-xl">
              Wall Decor
            </h1>
          </div>
        </div>
        <p className="text-center mx-auto px-8 py-4 md:w-[40%]">
          In the heart of our creative journey lies a passion that started with
          a simple idea – to add a touch of elegance to your spaces. Our story
          began with crafting unique wall clocks and intricate wall decors, each
          piece reflecting our love for art and attention to detail.
        </p>
      </div>

      <div>
        <div className="flex flex-row-reverse justify-center items-center px-8 ">
          <img
            src="img/2.jpg"
            alt="image"
            className=" w-[60%] md:w-[20%] h-auto"
          />
          <div className="shadow-md offset-x-2 offset-y-2 blur-4 flex items-center justify-center z-10">
            <h1 className="bg-opacity-custom mr-[-50%] px-8 py-2 text-themecolor font-bold text-xl">
              Coffee Table
            </h1>
          </div>
        </div>
        <p className="text-center px-8 mx-auto py-4 md:w-[40%]">
          As time flowed, so did our aspirations. We ventured into the realm of
          furniture design, starting with classic rectangular tables that
          blended the strength of steel with the beauty of epoxy art. The
          response was heartening, and with each table, we saw homes transform
          into something extraordinary.
        </p>
      </div>

      <div>
        <div className="flex justify-center items-center px-8">
          <img
            src="img/3.jpg"
            alt="image"
            className=" w-[60%] md:w-[20%] h-auto"
          />
          <div className="shadow-md offset-x-2 offset-y-2 blur-4 flex items-center justify-center ">
            <h1 className="bg-opacity-custom ml-[-50%] px-8 py-2 text-themecolor font-bold text-xl">
              Nesting Coffee Table
            </h1>
          </div>
        </div>
        <p className="text-center px-8 mx-auto  py-4 md:w-[40%]">
          Driven by the desire to explore new forms, we introduced round coffee
          tables, where functionality met artistic flair. The introduction of
          nesting coffee tables brought a sense of versatility, offering
          practicality without compromising on style.
        </p>
      </div>

      <div>
        <div className="flex flex-row-reverse justify-center items-center px-8">
          <img
            src="img/4.jpg"
            alt="image"
            className=" w-[60%] md:w-[20%] h-auto"
          />
          <div className="shadow-md offset-x-2 offset-y-2 blur-4 flex items-center justify-center ">
            <h1 className="bg-opacity-custom mr-[-50%] px-8 py-2 text-themecolor font-bold text-xl z-10">
              Dining Tables
            </h1>
          </div>
        </div>
        <p className="text-center px-8 mx-auto py-4 md:w-[40%]">
          However, our journey didn't stop there. The allure of crafting grand
          dining tables captivated us, and we embraced the challenge with open
          arms. Each dining table we create is a celebration of togetherness, a
          centerpiece for cherished gatherings and meaningful conversations.
          Join us on this artistic voyage, where each creation tells a tale that
          resonates with the heart of your home.
        </p>
      </div>
    </div>
  );
};

export default Story;
